# Open Source Avatars — Agent / integration guide

This repo is a **registry of free VRM avatars**: metadata and URLs only. No runtime code. Use it to discover collections and direct `.vrm` (and optionally FBX) URLs for use in other projects. **There is no animation data in the registry** — animations come from Mixamo or your own sources; the `integrations/` folder is reference implementation (rig map + loader), not a registry of animation files.

## Where to look

| Need | Location |
|------|----------|
| **Schema, field names, URLs** | [docs/api-reference.md](docs/api-reference.md) |
| **Web/Unity/Unreal load example** | [docs/technical-guide.md](docs/technical-guide.md) |
| **VRM bone hierarchy / format** | [docs/avatar-format.md](docs/avatar-format.md) |
| **Mixamo → VRM rig map (VRM 0.x only)** | [integrations/mixamo-rig-map.json](integrations/mixamo-rig-map.json) · [mixamo-rig-map.js](integrations/mixamo-rig-map.js) |
| **Mixamo animation loader (VRM 0.x only, reference)** | [integrations/animationLoader.js](integrations/animationLoader.js) |
| **VRM + animation gotchas** | [integrations/vrm-gotchas.md](integrations/vrm-gotchas.md) |
| **Integrations overview** | [integrations/README.md](integrations/README.md) |

## Facts to use in code

- **Base URL for data:** `https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/`
- **Entry point:** Fetch `projects.json`; each project has `avatar_data_file` (e.g. `avatars/100avatars-r1.json`). There is **no** single combined `avatars.json`.
- **Avatar fields (snake_case):** `model_file_url` (VRM), `thumbnail_url`, `project_id`, `name`, `description`, `metadata`. License is on the **project** in `projects.json`, not on each avatar.
- **Optional:** `metadata.alternateModels.fbx` exists for some avatars (e.g. 100Avatars) for Mixamo/FBX pipelines.
- **VRM version:** Avatars in the registry can be VRM 0.x or VRM 1.0 (version detectable via `vrm.meta?.metaVersion`). The **rig map and animation loader in `integrations/` are for VRM 0.x only** — VRM 1.0 is not mentioned or tested there. See [integrations/vrm-gotchas.md](integrations/vrm-gotchas.md).
- **Model URLs:** Model files are hosted on Arweave, IPFS, GitHub, or other permanent storage. URLs should not require proxying or caching; do not rewrite them or route through your own CDN.
- **Animations (VRM 0.x only):** Reference implementation in this repo: `integrations/animationLoader.js` (load Mixamo FBX, retarget to VRM 0.x). Uses `integrations/mixamo-rig-map.js`. VRM 1.0 is not covered or tested. Gotchas in `integrations/vrm-gotchas.md`.
