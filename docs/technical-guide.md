# Technical Guide

This guide contains detailed technical information for developers integrating Open Source Avatars into their projects.

## Quick Access

Data is multi-file: start with `projects.json`, then fetch each collection’s avatar file via `avatar_data_file`. See [API Reference](./api-reference.md) for full schema.

```bash
# List collections
curl https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/projects.json

# Get avatars for a collection (use avatar_data_file from a project)
curl https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars/100avatars-r1.json
```

## Platform Integration Guides

### Web Applications

1. Install dependencies:
```bash
npm install @pixiv/three-vrm three
```

2. Basic implementation (correct field names: `model_file_url`, not `modelFileUrl`):
```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

const loader = new GLTFLoader();
loader.registerPlugin(new VRMLoaderPlugin());

const BASE = 'https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data';
const projects = await fetch(`${BASE}/projects.json`).then(r => r.json());
const avatars = await fetch(`${BASE}/${projects[0].avatar_data_file}`).then(r => r.json());
const avatar = avatars[0];

loader.load(avatar.model_file_url, (gltf) => {
  const vrm = gltf.userData.vrm;
  scene.add(vrm.scene);
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

Avatars live in per-collection files under `data/avatars/*.json`. Key fields use **snake_case**: `model_file_url`, `thumbnail_url`, `project_id`. License is on the **project** (in `projects.json`), not on each avatar. Full schema: [API Reference](./api-reference.md).

```json
{
  "id": "avatar-id",
  "name": "Avatar Name",
  "project_id": "100avatars-r1",
  "description": "Avatar description",
  "thumbnail_url": "https://...",
  "model_file_url": "https://arweave.net/...",
  "format": "VRM",
  "metadata": {
    "alternateModels": { "fbx": "https://..." }
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