# Integrations

Resources for integrating the Open Source Avatars registry into apps, viewers, and games. Everything below lives in this repo so agents and developers don’t need to leave it.

| Resource | Description |
|----------|-------------|
| [mixamo-rig-map.json](./mixamo-rig-map.json) | Mixamo → VRM humanoid bone mapping (data only). **VRM 0.x only** — not tested for VRM 1.0. |
| [mixamo-rig-map.js](./mixamo-rig-map.js) | Same mapping as JS export. **VRM 0.x only.** |
| [animationLoader.js](./animationLoader.js) | **Reference implementation**: load Mixamo FBX and retarget to **VRM 0.x** (three + FBXLoader + three-vrm). VRM 1.0 not covered or tested. |
| [vrm-gotchas.md](./vrm-gotchas.md) | VRM loading and Mixamo retargeting gotchas (field names, hips scale, CORS). |

Use the rig map and loader when retargeting Mixamo FBX onto VRM 0.x; for VRM 1.0 you need other resources. See [vrm-gotchas.md](./vrm-gotchas.md) for pitfalls.

Registry schema and URLs: [docs/api-reference.md](../docs/api-reference.md).
