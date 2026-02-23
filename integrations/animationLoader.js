/**
 * Reference implementation: load a Mixamo FBX animation and retarget it onto a VRM 0.x model.
 * VRM 1.0 is not mentioned or tested here — this code is for VRM 0.x only.
 *
 * Use this file as reference or copy into your project. Requires:
 *   - three
 *   - three/addons/loaders/FBXLoader.js (or equivalent)
 *   - @pixiv/three-vrm (loaded VRM with humanoid)
 *
 * Usage:
 *   import { loadMixamoAnimation } from './animationLoader.js';
 *   const clip = await loadMixamoAnimation(animationUrl, vrm);
 *   const action = mixer.clipAction(clip);
 *   action.play();
 *
 * CORS: This reference uses direct fetch(url). If you add a CORS proxy (e.g. for
 * localhost), treat it as a dev convenience — strip it for production or adapt to
 * your environment. Do not assume a route like /api/proxy-asset exists outside the
 * project that provides it. For cross-origin animation URLs, you can fetch via your
 * own proxy and pass a blob URL: loadMixamoAnimation(URL.createObjectURL(blob), vrm).
 */
import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { mixamoVRMRigMap } from './mixamo-rig-map.js';

async function fetchAnimationBlob(url) {
  const response = await fetch(url, {
    mode: 'cors',
    credentials: 'omit',
    headers: { Accept: 'application/octet-stream,*/*' },
  });
  if (!response.ok) {
    throw new Error(`Failed to load animation: ${response.status} ${response.statusText}`);
  }
  return response.blob();
}

/**
 * Load a Mixamo FBX from URL, retarget to the given VRM, return a THREE.AnimationClip.
 * @param {string} url - URL to the Mixamo FBX file (or use a blob URL if you fetched via proxy)
 * @param {object} vrm - Loaded VRM from three-vrm (gltf.userData.vrm)
 * @returns {Promise<THREE.AnimationClip>}
 */
export async function loadMixamoAnimation(url, vrm) {
  const animBlob = await fetchAnimationBlob(url);
  const animUrl = URL.createObjectURL(animBlob);
  const loader = new FBXLoader();

  try {
    const asset = await new Promise((resolve, reject) => {
      loader.load(animUrl, resolve, undefined, reject);
    });

    const clip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com');
    if (!clip) {
      throw new Error('No Mixamo animation found in FBX file');
    }

    const tracks = [];
    const restRotationInverse = new THREE.Quaternion();
    const parentRestWorldRotation = new THREE.Quaternion();
    const _quatA = new THREE.Quaternion();
    const _vec3 = new THREE.Vector3();

    const hipsNode = asset.getObjectByName('mixamorigHips');
    if (!hipsNode) {
      throw new Error('No hips bone found in animation');
    }

    const motionHipsHeight = hipsNode.position.y;
    const vrmHipsY = vrm.humanoid?.getNormalizedBoneNode('hips')?.getWorldPosition(_vec3).y;
    const vrmRootY = vrm.scene.getWorldPosition(_vec3).y;
    if (typeof vrmHipsY !== 'number' || typeof vrmRootY !== 'number') {
      throw new Error('Could not determine VRM hips position');
    }
    const vrmHipsHeight = Math.abs(vrmHipsY - vrmRootY);
    const hipsPositionScale = vrmHipsHeight / motionHipsHeight;

    clip.tracks.forEach((track) => {
      const trackSplitted = track.name.split('.');
      const mixamoRigName = trackSplitted[0];
      const vrmBoneName = mixamoVRMRigMap[mixamoRigName];
      const vrmNode = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName);
      const vrmNodeName = vrmNode?.name;
      const mixamoRigNode = asset.getObjectByName(mixamoRigName);

      if (vrmNodeName != null && mixamoRigNode != null) {
        const propertyName = trackSplitted[1];
        mixamoRigNode.getWorldQuaternion(restRotationInverse).invert();
        mixamoRigNode.parent.getWorldQuaternion(parentRestWorldRotation);

        if (track instanceof THREE.QuaternionKeyframeTrack) {
          for (let i = 0; i < track.values.length; i += 4) {
            const flatQuaternion = track.values.slice(i, i + 4);
            _quatA.fromArray(flatQuaternion);
            _quatA.premultiply(parentRestWorldRotation).multiply(restRotationInverse);
            _quatA.toArray(flatQuaternion);
            flatQuaternion.forEach((v, index) => {
              track.values[index + i] = v;
            });
          }
          tracks.push(
            new THREE.QuaternionKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v)),
            ),
          );
        } else if (track instanceof THREE.VectorKeyframeTrack) {
          const value = track.values.map(
            (v, i) =>
              (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) * hipsPositionScale,
          );
          tracks.push(
            new THREE.VectorKeyframeTrack(`${vrmNodeName}.${propertyName}`, track.times, value),
          );
        }
      }
    });

    return new THREE.AnimationClip('vrmAnimation', clip.duration, tracks);
  } finally {
    URL.revokeObjectURL(animUrl);
  }
}
