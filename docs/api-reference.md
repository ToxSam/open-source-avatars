# API Reference

## 🔍 Quick Start

```bash
# Get all avatars
curl https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars.json

# Get specific avatar by ID
curl https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars.json | jq '.[] | select(.id=="your-avatar-id")'
```

## 📚 Data Files

### avatars.json
Main file containing all avatar information.

```typescript
interface Avatar {
  id: string;              // Unique identifier
  name: string;            // Display name
  description: string;     // Description
  thumbnailUrl: string;    // Preview image URL
  modelFileUrl: string;    // VRM file URL on Arweave
  format: "vrm";          // File format (currently only VRM)
  license: string;         // License type (e.g., "CC-BY-4.0")
  metadata: {
    polygonCount?: number; // Mesh complexity
    materialCount?: number;// Number of materials
    height?: number;       // Avatar height in meters
    style?: string;       // Visual style
    tags?: string[];      // Categorization tags
  }
}
```

### projects.json
Collections of related avatars.

```typescript
interface Project {
  id: string;             // Unique identifier
  name: string;           // Project name
  description: string;    // Project description
  avatarIds: string[];   // List of avatar IDs in project
  creator: string;       // Project creator
}
```

### users.json
Creator and contributor information.

```typescript
interface User {
  id: string;            // Unique identifier
  name: string;          // Display name
  avatarIds: string[];   // Created avatar IDs
  projectIds: string[]; // Created project IDs
}
```

## 🔄 Rate Limits

- No authentication required
- Rate limit: 60 requests per minute
- Max response size: 10MB

## 🎯 Common Use Cases

### 1. Get All Avatars
```javascript
async function getAllAvatars() {
  const response = await fetch('https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars.json');
  return await response.json();
}
```

### 2. Filter by Style
```javascript
async function getAnimeAvatars() {
  const avatars = await getAllAvatars();
  return avatars.filter(avatar => avatar.metadata?.style === 'anime');
}
```

### 3. Get Project Avatars
```javascript
async function getProjectAvatars(projectId) {
  const [avatars, projects] = await Promise.all([
    getAllAvatars(),
    fetch('https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/projects.json').then(r => r.json())
  ]);
  
  const project = projects.find(p => p.id === projectId);
  return avatars.filter(avatar => project.avatarIds.includes(avatar.id));
}
```

## 🛠️ Error Handling

Common HTTP status codes:
- `200`: Success
- `404`: File not found
- `429`: Rate limit exceeded

Example error handling:
```javascript
async function safeGetAvatars() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch avatars:', error);
    return [];
  }
}
```

## 📝 Best Practices

1. **Cache Responses**
   - Data updates infrequently
   - Recommended cache time: 1 hour

2. **Batch Processing**
   - Download all data at once
   - Process locally instead of multiple requests

3. **Error Recovery**
   - Implement retry logic
   - Cache last successful response 