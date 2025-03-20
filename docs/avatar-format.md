# Avatar Format Guide

## What is VRM?

VRM is an open file format for 3D humanoid avatars, perfect for VR and the metaverse. Think of it as a universal format for 3D characters that works everywhere!

## 📋 Quick Requirements

- File format: `.vrm`
- Max file size: 25MB recommended
- Polygons: 20,000 or less recommended
- Textures: 2048x2048px max per texture
- Bones: Standard humanoid skeleton

## ✅ Checklist Before Sharing

- [ ] Model is rigged with humanoid skeleton
- [ ] Textures are properly packed
- [ ] No copyright material included
- [ ] Tested in VRM viewer
- [ ] File size is optimized

## 🔍 Technical Details

### Standard Bone Structure
```
- hips
  |- spine
  |  |- chest
  |     |- upperChest (optional)
  |        |- neck
  |        |  |- head
  |        |     |- leftEye
  |        |     |- rightEye
  |        |     |- jaw (optional)
  |        |
  |        |- leftShoulder
  |        |  |- leftUpperArm
  |        |     |- leftLowerArm
  |        |        |- leftHand
  |        |           |- leftThumbProximal
  |        |           |  |- leftThumbIntermediate
  |        |           |     |- leftThumbDistal
  |        |           |
  |        |           |- leftIndexProximal
  |        |           |  |- leftIndexIntermediate
  |        |           |     |- leftIndexDistal
  |        |           |
  |        |           |- leftMiddleProximal
  |        |           |  |- leftMiddleIntermediate
  |        |           |     |- leftMiddleDistal
  |        |           |
  |        |           |- leftRingProximal
  |        |           |  |- leftRingIntermediate
  |        |           |     |- leftRingDistal
  |        |           |
  |        |           |- leftLittleProximal
  |        |              |- leftLittleIntermediate
  |        |                 |- leftLittleDistal
  |        |
  |        |- rightShoulder
  |           |- rightUpperArm
  |              |- rightLowerArm
  |                 |- rightHand
  |                    |- rightThumbProximal
  |                    |  |- rightThumbIntermediate
  |                    |     |- rightThumbDistal
  |                    |
  |                    |- rightIndexProximal
  |                    |  |- rightIndexIntermediate
  |                    |     |- rightIndexDistal
  |                    |
  |                    |- rightMiddleProximal
  |                    |  |- rightMiddleIntermediate
  |                    |     |- rightMiddleDistal
  |                    |
  |                    |- rightRingProximal
  |                    |  |- rightRingIntermediate
  |                    |     |- rightRingDistal
  |                    |
  |                    |- rightLittleProximal
  |                       |- rightLittleIntermediate
  |                          |- rightLittleDistal
  |
  |- leftUpperLeg
  |  |- leftLowerLeg
  |     |- leftFoot
  |        |- leftToes
  |
  |- rightUpperLeg
     |- rightLowerLeg
        |- rightFoot
           |- rightToes
```

> Note: Bones marked as (optional) are not required but recommended for better compatibility and animation support.

### Required vs Optional Bones

**Required Bones:**
- Hips and main body structure
- Basic arm and leg chains
- Head and neck
- Basic hand structure

**Optional but Recommended:**
- Finger bones (for hand animations)
- Eye bones (for look-at features)
- Toe bones (for foot animations)
- Upper chest (for better upper body movement)
- Jaw (for facial animations)

### Supported Features
- Facial expressions
- Look-at tracking
- Auto blink
- Lip sync
- Physics (hair, clothes)

## 🎯 Best Practices

1. **Optimization**
   - Use texture atlasing
   - Minimize bone count
   - Optimize mesh topology

2. **Compatibility**
   - Test in multiple platforms
   - Verify animations work
   - Check texture compression

3. **Quality**
   - UV maps are clean
   - No overlapping vertices
   - Proper weight painting

## 📚 Resources

- [Official VRM Documentation](https://vrm.dev/en/)
- [VRM Best Practices Guide](https://vrm.dev/en/univrm/programming/univrm_use_blendshape/)
- [Sample Models](https://github.com/vrm-c/vrm-specification/tree/master/samples)