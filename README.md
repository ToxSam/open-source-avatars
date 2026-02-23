# Open Source Avatars
A curated registry of free 3D avatars for games, VR, and the metaverse

🌐 [opensourceavatars.com](https://opensourceavatars.com)

## What is this?

A simple directory that helps you find VRM avatars you can actually use. Whether you're building a game, creating VR experiences, or just need a 3D avatar - we've collected links to avatars with clear licensing so you know exactly what you can do with them.

## Quick Start

Just want an avatar? Visit [opensourceavatars.com](https://opensourceavatars.com) to browse and download.

Building something? Grab our JSON files:

- https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/projects.json
- https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars/100avatars-r1.json

Each avatar includes:

- Direct download link to the VRM file
- Preview images
- Clear license (CC0, CC-BY, etc.)
- Metadata and traits

## What's VRM?

VRM is a 3D avatar file format that works across different apps and games. Think of it like a universal avatar format - load it once, use it everywhere (Unity, web browsers, VR apps, etc.).

## Collections

We curate two types of collections:

**Original Collections (CC0)**

- **100Avatars Series** - Our own free avatars, no attribution needed
- Stored permanently on Arweave

**Community Collections (various licenses)**

- **VIPE Heroes** - NFT avatars (CC-BY, attribution required)
- **Grifters Squaddies** - NFT avatars (CC0, no attribution needed)
- **ToxSam** - NFT avatars across Ethereum and Base (CC0, no attribution needed)
- **Halloween Rising** - Spooky Halloween avatars on Optimism (CC0, no attribution needed)
- **Xmas Chibis** - Christmas avatar collection on Polygon (CC0, no attribution needed)
- **NeonGlitch86 Collection** - Open source avatars by NeonGlitch86 (CC0, no attribution needed) _More avatars from this artist coming soon!_
- More coming soon!

Each collection clearly states its license - check `projects.json` for details.

## For Developers

- **Start here:** **[AGENTS.md](AGENTS.md)** — schema, data URLs, field names (`model_file_url`, `thumbnail_url`, etc.), and where to find everything. Use it so your integration uses the right endpoints and doesn’t assume a single “all avatars” file.
- **API & schema:** [docs/api-reference.md](docs/api-reference.md) — full types and examples.  
- **Integrations:** [integrations/](integrations/) — Mixamo→VRM rig map and animation loader reference (VRM 0.x only), plus [vrm-gotchas.md](integrations/vrm-gotchas.md) so retargeting and loading work across avatars.  
- **License:** This registry (metadata, docs, integration code in this repo) is [CC0](LICENSE). Per-avatar license is per collection in `projects.json`.

### Simple Integration

```javascript
// Fetch available collections
const collections = await fetch('https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/projects.json')
  .then(r => r.json());

// Get avatars from a collection
const avatars = await fetch(`https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/${collections[0].avatar_data_file}`)
  .then(r => r.json());

// Load the VRM
const vrmUrl = avatars[0].model_file_url;
```

### Need help loading VRM files?

- **Web**: Use [three-vrm](https://github.com/pixiv/three-vrm)
- **Unity**: Install [UniVRM](https://github.com/vrm-c/UniVRM)
- **Unreal**: Get [VRM4U plugin](https://github.com/ruyo/VRM4U)

## Data Structure

```
/data/
  projects.json          → List of all collections
  /avatars/
    100avatars-r1.json   → Avatars from each collection
    vipe-heroes-genesis.json
    grifters-squaddies.json
    toxsam.json
    halloween-rising.json
    xmas-chibis.json
    NeonGlitch86.json
```

- `projects.json` tells you what collections exist and their licenses.
- `avatars/*.json` contains the actual avatar data (download links, metadata, etc.)

## Contributing

Want to add your collection?

Open a GitHub Discussion with:

- Collection name & description
- License type (must be open source: CC0, CC-BY, etc.)
- Links to VRM files (IPFS, Arweave, or permanent hosting)
- Preview images

We'll review and add it to the registry!

### Requirements

- ✅ VRM format
- ✅ Open source license
- ✅ Permanently hosted files (no temporary links)
- ✅ Preview images

## License

- **This registry** (metadata, docs, integration code in this repo): [CC0 1.0 Universal](LICENSE) — public domain.
- **Individual avatars**: Check each collection’s license in `projects.json`.

## Support

- Questions? [Open a Discussion](https://github.com/ToxSam/open-source-avatars/discussions)
- Found a broken link? [Submit an Issue](https://github.com/ToxSam/open-source-avatars/issues)

Made by [@ToxSam](https://github.com/ToxSam)
