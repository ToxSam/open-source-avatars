# API Reference

Canonical schema and URLs for the Open Source Avatars registry. All data is served as static JSON from GitHub raw.

## Base URL

```
https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/
```

## Data layout (multi-file)

- **projects.json** — List of collections; each has `avatar_data_file` pointing to an avatars file.
- **avatars/<collection>.json** — One file per collection; array of avatar objects. No single combined avatars.json.

License is per **project**, not per avatar; use `project_id` on each avatar to look up the project in `projects.json`.

---

## projects.json

**URL:** `https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/projects.json`

Array of collection/project objects.

```typescript
interface Project {
  id: string;                    // Unique identifier (e.g. "100avatars-r1")
  name: string;                  // Display name
  creator_id: string;            // Creator identifier
  description: string;            // Short description
  is_public: boolean;
  license: string;               // e.g. "CC0", "CC-BY"
  source_type: "original" | "nft";
  storage_type: string | string[];  // e.g. "arweave", "ipfs", "github"
  created_at: string;            // ISO 8601
  updated_at: string;            // ISO 8601
  avatar_data_file: string;      // Path under data/, e.g. "avatars/100avatars-r1.json"

  // Optional, for NFT collections
  source_network?: string | string[];
  source_contract?: string | string[];
  opensea_url?: string;
}
```

---

## Avatar files (avatars/*.json)

**URL pattern:** `https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/{avatar_data_file}`

Example: `https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars/100avatars-r1.json`

Each file is a **JSON array** of avatar objects.

```typescript
interface Avatar {
  id: string;                    // Unique identifier (UUID or slug)
  name: string;                  // Display name
  project_id: string;            // Links to Project.id in projects.json (license lives on project)
  description: string;           // Short description
  model_file_url: string;        // Direct URL to .vrm file (Arweave, IPFS, GitHub, etc.)
  format: string;                // e.g. "VRM"
  is_public: boolean;
  is_draft?: boolean;
  created_at: string;            // ISO 8601
  updated_at: string;            // ISO 8601
  thumbnail_url: string;         // Preview image URL

  metadata?: {
    // Collection-specific (e.g. number, series, traits)
    [key: string]: unknown;

    // Optional: alternate model formats (e.g. for Mixamo/FBX pipelines)
    alternateModels?: {
      fbx?: string;              // FBX file URL (Mixamo-compatible rig)
      voxel_fbx?: string;
      voxel_vrm?: string;
    };

    // Optional: source file names (e.g. Ardrive)
    ardriveFiles?: {
      models?: string[];
      thumbnails?: string[];
      textures?: string[];
    };
  };
}
```

**Important:** Use `model_file_url` (not `modelFileUrl`) and `thumbnail_url` (not `thumbnailUrl`). License is on the **project**: resolve `avatar.project_id` in `projects.json` and use `project.license`.

---

## users.json

**URL:** `https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/users.json`

Creator/contributor info (optional for integrations).

```typescript
interface User {
  id: string;
  name?: string;
  avatarIds?: string[];
  projectIds?: string[];
}
```

---

## Common use cases

### 1. List collections and get one collection’s avatars

```javascript
const BASE = 'https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data';

const projects = await fetch(`${BASE}/projects.json`).then(r => r.json());
const firstProject = projects[0];
const avatars = await fetch(`${BASE}/${firstProject.avatar_data_file}`).then(r => r.json());

// Load a VRM
const vrmUrl = avatars[0].model_file_url;
const license = firstProject.license; // CC0, CC-BY, etc.
```

### 2. Get avatar by ID across all collections

```javascript
const BASE = 'https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data';
const projects = await fetch(`${BASE}/projects.json`).then(r => r.json());

for (const project of projects) {
  const avatars = await fetch(`${BASE}/${project.avatar_data_file}`).then(r => r.json());
  const avatar = avatars.find(a => a.id === 'your-avatar-id');
  if (avatar) {
    console.log(avatar.model_file_url, project.license);
    break;
  }
}
```

### 3. Use FBX / alternate models (when present)

Some avatars (e.g. 100Avatars) expose `metadata.alternateModels.fbx` for Mixamo-compatible pipelines:

```javascript
const avatar = avatars[0];
const vrmUrl = avatar.model_file_url;
const fbxUrl = avatar.metadata?.alternateModels?.fbx; // optional
```

---

## Caching and errors

- No authentication. Static files; cache for at least 1 hour.
- On 404, the file or path may have changed; fall back to fresh `projects.json`.
- Prefer fetching `projects.json` once, then only the `avatar_data_file`(s) you need.
