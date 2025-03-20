# Technical Guide

This guide contains detailed technical information for developers integrating Open Source Avatars into their projects.

## Quick Access

```bash
# Get all avatars via API
curl https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars.json
```

## Platform Integration Guides

### Web Applications

1. Install dependencies:
```bash
npm install @pixiv/three-vrm three
```

2. Basic implementation:
```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

// Load avatar
const loader = new GLTFLoader();
loader.registerPlugin(new VRMLoaderPlugin());

// Get avatar data
fetch('https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars.json')
  .then(response => response.json())
  .then(avatars => {
    const avatar = avatars[0];
    loader.load(avatar.modelFileUrl, (gltf) => {
      const vrm = gltf.userData.vrm;
      scene.add(vrm.scene);
    });
  });
```

### Unity Integration

1. Install UniVRM:
   ```
   https://github.com/vrm-c/UniVRM.git?path=/Assets/VRMShaders
   https://github.com/vrm-c/UniVRM.git?path=/Assets/VRM
   ```

2. Basic usage:
```csharp
using UnityEngine;
using VRM;

public class VRMLoader : MonoBehaviour
{
    async void LoadAvatar(string url)
    {
        using (var webRequest = UnityWebRequest.Get(url))
        {
            await webRequest.SendWebRequest();
            var context = new VRMImporterContext();
            await context.LoadAsync(webRequest.downloadHandler.data);
            context.Root.transform.SetParent(transform, false);
        }
    }
}
```

### Unreal Engine

1. Install VRM4U plugin from Epic Games Marketplace
2. Enable in Edit > Plugins
3. Use VRM4U_VrmAssetList component to load avatars

## Data Structure

Each avatar in `data/avatars.json` follows this structure:
```json
{
  "id": "avatar-id",
  "name": "Avatar Name",
  "description": "Avatar description",
  "thumbnailUrl": "https://...",
  "modelFileUrl": "https://arweave.net/...",
  "format": "vrm",
  "license": "CC-BY-4.0",
  "metadata": {
    "polygonCount": 12500,
    "materialCount": 8,
    "height": 1.7,
    "style": "anime"
  }
}
```

## Compatibility

| Platform | Required Version | Package |
|----------|-----------------|---------|
| Three.js | ≥ 0.132.0 | @pixiv/three-vrm ≥ 1.0.0 |
| Unity | ≥ 2020.3 | UniVRM ≥ 0.108.0 |
| Unreal | ≥ 4.27 | VRM4U ≥ 1.0.0 |

## Common Issues

1. **Model not loading**: Check CORS settings on your server
2. **Missing textures**: Ensure all texture URLs are accessible
3. **Animation issues**: Verify VRM version compatibility 