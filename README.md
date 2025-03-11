# Open Source Avatars - Data Repository

This repository serves as the database for the [Open Source Avatars](https://www.opensourceavatars.com/) project. It contains JSON files that store metadata about 3D avatars, projects, users, and related information.

## About Open Source Avatars

Open Source Avatars is a gallery of freely available 3D avatars, primarily in VRM format. The project aims to build a community-driven collection of avatars that can be used in virtual reality, metaverse applications, games, and other 3D environments.

## Repository Structure

- `/data` - Contains all the data files
  - `avatars.json` - Information about each avatar, including links to the 3D models stored on Arweave
  - `projects.json` - Project collections containing avatars
  - `tags.json` - Tags for categorizing avatars
  - `users.json` - User information (non-sensitive)
  - `downloads.json` - Download statistics
  - `avatar-tags.json` - Many-to-many relationships between avatars and tags

## Data Format

### Common Fields

All main entities (users, projects, avatars, tags, downloads) include these common fields:
- `id` - Unique identifier (UUID)
- `createdAt` - ISO timestamp of creation
- `updatedAt` - ISO timestamp of last update

### Avatars

Each avatar entry contains:
```json
{
  "id": "string",
  "name": "string",
  "projectId": "string",
  "description": "string (optional)",
  "thumbnailUrl": "string (optional)",
  "modelFileUrl": "string (optional)",
  "polygonCount": "number (optional)",
  "format": "string",
  "materialCount": "number (optional)",
  "isPublic": "boolean",
  "isDraft": "boolean",
  "metadata": "object - additional data",
  "createdAt": "string (ISO timestamp)",
  "updatedAt": "string (ISO timestamp)"
}
```

### Projects

Projects are collections of avatars:
```json
{
  "id": "string",
  "name": "string",
  "creatorId": "string",
  "description": "string (optional)",
  "isPublic": "boolean",
  "createdAt": "string (ISO timestamp)",
  "updatedAt": "string (ISO timestamp)"
}
```

### Tags

Tags provide categorization for avatars:
```json
{
  "id": "string",
  "name": "string",
  "createdAt": "string (ISO timestamp)",
  "updatedAt": "string (ISO timestamp)"
}
```

### Avatar-Tags

This file implements many-to-many relationships between avatars and tags:
```json
{
  "avatarId": "string",
  "tagId": "string"
}
```

### Users

User information (non-sensitive):
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "createdAt": "string (ISO timestamp)",
  "updatedAt": "string (ISO timestamp)"
}
```

### Downloads

Download statistics:
```json
{
  "id": "string",
  "avatarId": "string",
  "userId": "string (optional)",
  "downloadedAt": "string (ISO timestamp)",
  "ipAddress": "string (optional)",
  "userAgent": "string (optional)",
  "createdAt": "string (ISO timestamp)",
  "updatedAt": "string (ISO timestamp)"
}
```

## Storage Details

The avatar 3D models and thumbnail images are stored on Arweave, a permanent storage solution. The URLs in the avatar records point to either:

1. Arweave gateway URLs (for permanent storage)
2. Temporary cloud storage URLs (before being moved to Arweave)

## Using This Data

This repository is designed to be easily forkable and usable in other projects. You can:
1. Clone the repository to get a local copy of all avatar metadata
2. Access the 3D models directly via the Arweave links
3. Integrate with your own applications using the structured JSON data

### API Access

The data can be accessed directly via GitHub's raw content URLs:

```
https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/avatars.json
```

Or you can use the GitHub API to access the content programmatically.

## Contributing

Interested in contributing an avatar? Visit our [main website](https://www.opensourceavatars.com/) or check our main repository for details on how to submit avatars.

## License

All metadata in this repository is available under [Creative Commons CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).

The actual 3D models referenced in this data are subject to their individual licenses, which are specified in each avatar's metadata. 

## Security & Privacy

For security and privacy reasons:

- User emails in this repository are redacted/sanitized
- No password hashes or authentication data is stored
- Personal identifiable information is removed or anonymized
- Private user data should be handled by your application's authentication system, not stored in this repository

Developers using this data should ensure they maintain appropriate security and privacy practices when dealing with user information. 