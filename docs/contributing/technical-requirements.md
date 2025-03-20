# Technical Requirements for Avatars

This guide details the technical requirements for avatars submitted to Open Source Avatars. Following these guidelines ensures compatibility and quality across different platforms.

## VRM File Requirements

### Format Specifications
- **VRM Version**: 0.x or 1.0 (both accepted)
- **File Size**: Maximum 50MB recommended
- **Polygon Count**: 
  - Recommended: Under 70,000 triangles
  - Maximum: 100,000 triangles
- **Texture Resolution**:
  - Recommended: 2048x2048 or lower
  - Format: PNG or JPEG
  - Maximum file size: 10MB per texture

### Required Components
1. **Skeleton/Armature**:
   - Standard VRM bone hierarchy
   - Humanoid rigging
   - No missing required bones
   - Proper bone orientations

2. **Materials**:
   - PBR materials recommended
   - Maximum 8 material slots
   - Properly configured UV maps
   - No missing textures

3. **BlendShapes/Expressions**:
   - Basic expressions configured:
     - Neutral
     - Happy
     - Sad
     - Angry
     - Surprised (optional)
   - Proper weight painting
   - No broken vertex deformations

## Metadata Requirements

### Required Fields
```json
{
  "name": "string",
  "version": "string",
  "author": "string",
  "contactInformation": "string",
  "reference": "string",
  "title": "string",
  "license": "string (must be open source)",
  "otherPermissionUrl": "string",
  "otherLicenseUrl": "string"
}
```

### Optional but Recommended
```json
{
  "thumbnail": "string (URL)",
  "allowedUserName": "string",
  "violentUssageName": "string",
  "sexualUssageName": "string",
  "commercialUssageName": "string",
  "otherPermissionUrl": "string"
}
```

## Hosting Requirements

### Permanent Storage
- Must be hosted on decentralized storage:
  - Arweave (recommended)
  - IPFS with pinning service
  - Other permanent storage solutions

### Required Files
1. **Main VRM File**
2. **Preview Images**:
   - Front view
   - Side view
   - 3/4 view
   - All images in 16:9 ratio
   - Minimum resolution: 1280x720

## Testing Requirements

### Required Testing Platforms
1. **VRM Viewer**:
   - Test all expressions
   - Verify materials
   - Check scaling

2. **Three.js Viewer**:
   - Test loading
   - Verify animations
   - Check performance

3. **Unity/VRChat**:
   - Test in runtime
   - Verify performance
   - Check compatibility

### Performance Metrics
- Load time under 3 seconds on average connection
- No frame rate drops below 60fps
- Memory usage under 100MB

## Quality Guidelines

### Visual Quality
- Clean topology
- No visible artifacts
- Proper UV unwrapping
- No texture stretching
- Consistent art style

### Technical Quality
- No non-manifold geometry
- No reversed normals
- No overlapping UVs
- Proper vertex weighting
- Clean mesh topology

### Content Guidelines
- Family-friendly content
- No copyrighted material
- Original work or properly licensed
- Appropriate for all ages
- No offensive content

## Documentation Requirements

### Required Documentation
1. **Basic Information**:
   - Avatar name and version
   - Creator information
   - License details
   - Usage restrictions

2. **Technical Details**:
   - Polygon count
   - Texture resolutions
   - Material count
   - Bone structure notes

3. **Usage Instructions**:
   - Setup guide
   - Known issues
   - Platform compatibility
   - Performance notes

## Support

Need help meeting these requirements? We're here to help:
- Join our [Discord](https://discord.gg/opensourceavatars)
- Post in [Discussions](https://github.com/ToxSam/open-source-avatars/discussions)
- Check our [FAQ](../general/faq.md) 