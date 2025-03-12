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

## 🔧 How to Use This Data

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

### For 3D Artists and Avatar Users

Visit [opensourceavatars.com](https://www.opensourceavatars.com) for a user-friendly interface to:

- Browse and search for avatars
- Preview models in 3D before downloading
- Download in various formats (VRM, FBX, etc.)
- Contribute your own creations to the library

## 🤝 Contributing

We welcome contributions from the community! You can:

1. **Add new avatars** to the collection
2. **Improve existing avatars** with additional formats or optimizations
3. **Enhance the metadata** with better descriptions, tags, or attributes
4. **Contribute to the website** development

Visit our [contribution guidelines](https://www.opensourceavatars.com/contribute) on the main website for detailed instructions.

## 📜 License

- **Metadata in this repository**: [Creative Commons CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Individual 3D models**: Each has its own license specified in the metadata, typically CC-BY or CC0

## 🔒 Privacy and Security

This repository contains only public, non-sensitive information. We take privacy seriously:

- User emails are redacted/sanitized
- No password or authentication data is stored
- Personal identifiable information is anonymized
- Private user data is handled separately in secure systems

## 🌐 Connect with Us

- **Website**: [opensourceavatars.com](https://www.opensourceavatars.com)
- **GitHub**: [ToxSam/open-source-avatars](https://github.com/ToxSam/open-source-avatars)
- **Twitter**: [@toxsam](https://twitter.com/toxsam)

---

<div align="center">
  <p>Open Source Avatars — Democratizing virtual identity for the metaverse</p>
</div> 