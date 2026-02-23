# VRM integration gotchas

Practical pitfalls when loading and animating VRM avatars from this registry (e.g. with three-vrm, Mixamo retargeting).

## Data / registry

- **Field names are snake_case:** `model_file_url`, `thumbnail_url`, `project_id`. Not camelCase.
- **License is on the project:** Resolve `avatar.project_id` in `projects.json` and use `project.license` (e.g. CC0, CC-BY).
- **No single “all avatars” file:** Fetch `projects.json`, then each collection via `project.avatar_data_file`.
- **Optional FBX:** Some avatars (e.g. 100Avatars) have `metadata.alternateModels.fbx` for Mixamo-compatible pipelines.
- **Storage / broken URLs:** Model files are on Arweave, IPFS, GitHub, or other permanent hosting. Do not proxy or rewrite `model_file_url`; if a URL fails, treat it as a transient or upstream issue, not something to “fix” with your own CDN.

## Loading VRM (three-vrm)

- Use **GLTFLoader + VRMLoaderPlugin**. The VRM ends up at `gltf.userData.vrm`.
- **CORS:** If you load from another origin (Arweave, IPFS gateways, GitHub raw, etc.), ensure the host allows your origin or use a proxy for dev.
- **VRM 0.x vs 1.0:** The registry contains both; check `vrm.meta?.metaVersion`. The **animation/rig assets in this repo (rig map, animation loader) are for VRM 0.x only** — VRM 1.0 is not mentioned or tested here.

## Animations (Mixamo → VRM 0.x retargeting)

**Scope:** The rig map and animation loader in this repo target **VRM 0.x only**. VRM 1.0 is not covered or tested.

- **Reference implementation:** [integrations/animationLoader.js](./animationLoader.js) fetches Mixamo FBX and retargets to VRM 0.x. Uses [integrations/mixamo-rig-map.js](./mixamo-rig-map.js). Copy into your project or follow its logic.
- **Rig map:** Mixamo `mixamorig*` → VRM humanoid names. [mixamo-rig-map.json](./mixamo-rig-map.json) or [mixamo-rig-map.js](./mixamo-rig-map.js). Documented and tested for VRM 0.x only.
- **FBX clip name:** Mixamo FBX often embeds a single clip named `"mixamo.com"`. The reference loader uses `THREE.AnimationClip.findByName(asset.animations, 'mixamo.com')`.
- **Hips scale:** The reference implementation computes scale from hips height and applies it to position tracks.
- **VRM 0.x coordinate flip:** For meta version `"0"`, the loader applies index-based flips to quaternion and position tracks so the motion looks correct. See [animationLoader.js](./animationLoader.js) — do not reimplement this logic independently.
- **Quaternion vs position tracks:** Retargeting rewrites both rotation and position for the hips; other bones are typically rotation-only. See [animationLoader.js](./animationLoader.js).

## Performance and compatibility

- **Polycount:** Registry avatars vary; for mobile or many instances, prefer lower-poly or LOD.
- **BlendShapes / expressions:** Not all avatars expose the same set; check `vrm.expressionManager` and fall back gracefully if a blend shape is missing.
- **Humanoid required:** All registry avatars are expected to use a standard humanoid skeleton (see [docs/avatar-format.md](../docs/avatar-format.md)). Non-humanoid rigs are out of scope for the Mixamo rig map.

## References (in this repo)

- [Mixamo rig map (JSON)](./mixamo-rig-map.json) · [rig map (JS)](./mixamo-rig-map.js)
- [Animation loader reference implementation](./animationLoader.js)
- [API Reference](../docs/api-reference.md) for registry schema and URLs

External: [VRM spec](https://vrm.dev/en/), [three-vrm](https://github.com/pixiv/three-vrm).
