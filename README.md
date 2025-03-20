# Open Source Avatars

<div align="center">
  <h3><a href="https://www.opensourceavatars.com">🌐 opensourceavatars.com</a></h3>
  <p>A community-driven gallery of free 3D avatars for the metaverse</p>
</div>

## 🌟 What is Open Source Avatars?

Open Source Avatars (OSA) is a growing collection of freely available 3D avatars primarily in VRM format for use in virtual reality, gaming, metaverse applications, and any other 3D environments. Our mission is to create an inclusive library of high-quality avatars that anyone can use without worrying about licensing restrictions.

This repository serves as the **data backbone** for the [Open Source Avatars website](https://www.opensourceavatars.com), containing all the metadata and information about the avatars, projects, and related resources.

### What is VRM?

VRM is an open file format for 3D humanoid avatars primarily used in VR applications. Key features include:

- **Cross-platform compatibility** across different applications and engines
- **Standardized rigging** making animations work consistently
- **Customizable expressions** for facial animations
- **Material definitions** that work across different rendering systems

VRM files can be viewed and used with libraries like [Three.js](https://threejs.org/) and applications like [VRoid Studio](https://vroid.com/en/studio) or [Pixiv's VRoid Mobile](https://vroid.com/en/mobile).

## 🚀 Why Open Source Avatars?

- **Free and accessible 3D avatars** for everyone
- **Permissive licensing** that allows for personal and commercial use
- **Community-driven** development and contributions
- **Diverse selection** of avatar styles, characters, and designs
- **Compatible formats** for popular platforms and engines

## 📂 What's in this Repository?

This repository is structured as a database with JSON files containing all the metadata:

- `/data` - The core data directory
  - `avatars.json` - Detailed information about each avatar (3D models stored on Arweave)
  - `projects.json` - Collections of related avatars
  - `tags.json` - Categories and tags for organizing avatars
  - `users.json` - Creator and contributor information
  - `downloads.json` - Usage statistics
  - `avatar-tags.json` - Tagging relationships

### 🔍 Exploring the Avatars

Rather than browsing the JSON files directly, we recommend visiting our gallery at [opensourceavatars.com](https://www.opensourceavatars.com) for an interactive experience with:

- Visual previews and thumbnails
- 3D model viewers
- Filtering by tags, style, and format
- Download options for different platforms
- Creator information and attribution



## 🔧 How to Use This Avatars

### For 3D Artists and Avatar Users

Visit [opensourceavatars.com](https://www.opensourceavatars.com) for a user-friendly interface to:

- Browse and search for avatars
- Preview models in 3D before downloading
- Download in various formats (VRM, FBX, etc.)

### For Developers

1. **Direct API Access**: Access the data via GitHub's raw content:
   ```
   https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars.json
   ```

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/ToxSam/open-source-avatars.git
   ```

3. **Integrate with Your Project**:
   - Use the well-structured JSON data in your applications
   - Access the 3D models directly via the Arweave links
   - Build your own avatar selection interface



### Technical Requirements

To work with VRM files in your own projects, you'll typically need:

- **For web applications**: Three.js with [three-vrm](https://github.com/pixiv/three-vrm) plugin
- **For Unity**: [UniVRM](https://github.com/vrm-c/UniVRM) package
- **For Unreal Engine**: [VRM4U](https://github.com/ruyo/VRM4U) plugin
- **For viewing/editing**: VRoid Studio, Blender (with VRM add-on), or other 3D tools

## 📊 Data Structure

Each avatar in our collection includes rich metadata such as:

```json
{
  "id": "unique-identifier",
  "name": "Avatar Name",
  "description": "A detailed description of the avatar",
  "thumbnailUrl": "https://assets.opensourceavatars.com/...",
  "modelFileUrl": "https://arweave.net/...",
  "format": "vrm",
  "polygonCount": 12500,
  "materialCount": 8,
  "metadata": {
    "alternateModels": {
      "voxel_vrm": "https://arweave.net/...",
      "fbx": "https://arweave.net/..."
    },
    "license": "CC-BY-4.0",
    "creator": "Creator Name",
    "attributes": {
      "height": 1.7,
      "style": "anime"
    }
  }
}
```


## 💻 Quick Start Guide

### Web Applications

1. **Install Dependencies**
```bash
# Using npm
npm install @pixiv/three-vrm three

# Using yarn
yarn add @pixiv/three-vrm three
```

2. **Basic Implementation**
```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

// Create a basic Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up lighting
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Load an avatar
const loader = new GLTFLoader();
loader.registerPlugin(new VRMLoaderPlugin());

// Fetch avatar data
fetch('https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars.json')
  .then(response => response.json())
  .then(avatars => {
    const avatar = avatars[0]; // Get first avatar for example
    loader.load(
      avatar.modelFileUrl,
      (gltf) => {
        const vrm = gltf.userData.vrm;
        scene.add(vrm.scene);
        
        // Position camera
        camera.position.z = 2;
        
        // Animation loop
        function animate() {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }
        animate();
      },
      (progress) => console.log('Loading:', (progress.loaded / progress.total * 100) + '%'),
      (error) => console.error('Error loading VRM:', error)
    );
  });
```

### Unity Integration

1. **Install UniVRM**
   - Open Package Manager (Window > Package Manager)
   - Click '+' > Add package from git URL
   - Enter: `https://github.com/vrm-c/UniVRM.git?path=/Assets/VRMShaders`
   - Repeat for: `https://github.com/vrm-c/UniVRM.git?path=/Assets/VRM`

2. **Basic Usage**
```csharp
using UnityEngine;
using VRM;

public class VRMLoader : MonoBehaviour
{
    async void Start()
    {
        // Load avatar from URL
        var avatarUrl = "https://arweave.net/your-avatar-url";
        using (var webRequest = UnityWebRequest.Get(avatarUrl))
        {
            await webRequest.SendWebRequest();
            
            if (webRequest.result == UnityWebRequest.Result.Success)
            {
                var bytes = webRequest.downloadHandler.data;
                var context = new VRMImporterContext();
                
                // Load VRM model
                await context.LoadAsync(bytes);
                var gameObject = context.Root;
                
                // Add to scene
                gameObject.transform.SetParent(transform, false);
            }
        }
    }
}
```

### Unreal Engine Setup

1. **Install VRM4U Plugin**
   - Open Epic Games Launcher
   - Go to Marketplace and search for "VRM4U"
   - Add to your project
   - Enable the plugin in Edit > Plugins

2. **Blueprint Usage**
   - Drag a VRM4U_VrmAssetList component into your scene
   - Set the VRM URL in the component details
   - Use the "Load VRM" function to load the avatar

## 🔧 Compatibility Matrix

| Platform      | Required Version | Compatible Packages                    |
|--------------|------------------|---------------------------------------|
| Three.js     | ≥ 0.132.0       | @pixiv/three-vrm ≥ 1.0.0             |
| Unity        | ≥ 2020.3        | UniVRM ≥ 0.108.0                     |
| Unreal Engine| ≥ 4.27          | VRM4U ≥ 1.0.0                        |

## 🔍 Troubleshooting

### Common VRM Issues

1. **Model Loading Issues**
   - Verify the VRM file version compatibility (VRM 0.x vs 1.0)
   - Check if the model size is within platform limits
   - Ensure all textures are properly packaged with the VRM
   - Confirm the model follows VRM specifications

2. **Avatar Display Issues**
   - Check if the model's meta information is correctly set
   - Verify material settings in the VRM metadata
   - Ensure the avatar's scale is appropriate (typical height: 1.6m ~ 1.8m)
   - Check if all required bone structures are present

3. **Expression/BlendShape Issues**
   - Verify BlendShape proxy settings in VRM metadata
   - Check if expression keys are properly defined
   - Ensure BlendShape groups are correctly configured
   - Test expressions in VRM Viewer before integration


## 🤝 Contributing

Have a cool VRM avatar you'd like to share with the community? We're excited to see what you've created! This collection aims to make amazing avatars accessible to everyone, and your contribution could help creators and developers worldwide.

### How to Submit

The easiest way to submit your avatar is through GitHub Discussions:

1. **Open a Discussion**:
   - Go to the "Discussions" tab in this repository
   - Choose the "Avatar Submission" category
   - Use the title format: `[Avatar Submission] Your Avatar Name`
   - Include the following information:
     ```
     Avatar Name:
     Description:
     Preview Links: (screenshots/renders, at least 3 views)
     VRM File: (hosted on Arweave or similar permanent storage)
     License: (must be open source)
     Tested On: (list platforms where you've tested the avatar)
     ```

### Requirements

To ensure the best experience for everyone using the avatars:

- **Format**: VRM file (mandatory)
- **Thumbnail**: PNG recomended
- **License**: Must be open source (CC-BY, CC0, etc.)
- **Storage**: Must be hosted on permanent decentralized storage (Arweave or similar)
- **Bonus Points**:
  - Family-friendly content
  - Optimized model (recommended: under 15k triangles)
  - Professional quality textures
  - Proper VRM metadata and bone structure
  - Working expressions/BlendShapes


We review all submissions to ensure they work well across different platforms and maintain high quality standards.

## 📜 License

- **Metadata in this repository**: [Creative Commons CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Individual 3D models**: Each has its own license specified in the metadata, typically CC-BY or CC0


## 🌐 Connect with Us

- **Website**: [opensourceavatars.com](https://www.opensourceavatars.com)
- **GitHub**: [ToxSam/open-source-avatars](https://github.com/ToxSam/open-source-avatars)
- **Twitter**: [@toxsam](https://twitter.com/toxsam)

---

<div align="center">
  <p>Open Source Avatars — Democratizing virtual identity for the metaverse</p>
</div> 