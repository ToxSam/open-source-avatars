#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const collectionsArg = args.find((arg) => arg.startsWith('--collections='));
const positionalArgs = args.filter((arg) => !arg.startsWith('--'));
const sourceRoot =
  positionalArgs[0] ||
  process.env.FORGOTTEN_RUNES_SOURCE_ROOT ||
  '/Users/dotta/projects/forgottenrunes-clips/repos/forgotten-runes-website';
const selectedSlugs = (collectionsArg?.split('=')[1] || process.env.FORGOTTEN_RUNES_COLLECTIONS || '')
  .split(',')
  .map((slug) => slug.trim())
  .filter(Boolean);

const now = new Date().toISOString();
const customLicense = 'Custom - commercial rights for holders';

const collections = [
  {
    slug: 'wizards',
    projectId: 'forgotten-runes-wizards',
    name: 'Forgotten Runes Wizards Cult',
    description: '10,000 wizard avatars with public VRM, GLB, and FBX character models.',
    contract: '0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42',
    openseaUrl: 'https://opensea.io/collection/forgottenruneswizardscult',
    avatarDataFile: 'avatars/forgotten-runes-wizards.json',
    assetPrefix: 'wizard',
    primaryFormat: 'VRM',
    thumbnailStrategy: 'overlay',
    alternateFormats: ['glb', 'fbx'],
  },
  {
    slug: 'souls',
    projectId: 'forgotten-runes-souls',
    name: 'Forgotten Souls',
    description: 'Forgotten Runes soul avatars with public GLB and FBX character models.',
    contract: '0x251b5f14a825c537ff788604ea1b58e49b70726f',
    openseaUrl: 'https://opensea.io/collection/forgottensouls',
    avatarDataFile: 'avatars/forgotten-runes-souls.json',
    assetPrefix: 'soul',
    primaryFormat: 'GLB',
    thumbnailStrategy: 'api-art',
    alternateFormats: ['fbx'],
  },
  {
    slug: 'warriors',
    projectId: 'forgotten-runes-warriors',
    name: 'Forgotten Runes Warriors Guild',
    description: '16,000 warrior avatars with public GLB and FBX character models.',
    contract: '0x9690a37bd43f7fc65a7b7a65bf4edec6f04cc1d1',
    openseaUrl: 'https://opensea.io/collection/forgottenruneswarriorsguild',
    avatarDataFile: 'avatars/forgotten-runes-warriors.json',
    assetPrefix: 'character',
    primaryFormat: 'GLB',
    thumbnailStrategy: 'api-art',
    alternateFormats: ['fbx'],
  },
];

const activeCollections =
  selectedSlugs.length > 0
    ? collections.filter((collection) => selectedSlugs.includes(collection.slug))
    : collections;

if (selectedSlugs.length > 0 && activeCollections.length !== selectedSlugs.length) {
  const known = new Set(collections.map((collection) => collection.slug));
  const unknown = selectedSlugs.filter((slug) => !known.has(slug));
  throw new Error(`Unknown collections requested: ${unknown.join(', ')}`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function formatTraitName(name) {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildTraitMap(traits) {
  const traitMap = new Map();

  for (const trait of traits) {
    traitMap.set(`${trait.trait}:${trait.idx}`, trait.label || trait.filename || trait.idx);
  }

  return traitMap;
}

function buildAttributes(layerEntry, traitMap) {
  return Object.entries(layerEntry)
    .filter(([key]) => key !== 'idx' && key !== 'name')
    .flatMap(([traitName, traitId]) => {
      if (!traitId || traitId === '7777') {
        return [];
      }

      return [
        {
          trait_type: formatTraitName(traitName),
          value: traitMap.get(`${traitName}:${traitId}`) || String(traitId),
        },
      ];
    });
}

function buildAvatarEntry(collection, layerEntry, traitMap) {
  const tokenId = String(layerEntry.idx);
  const modelBaseUrl = `https://nftz.forgottenrunes.com/dev/3d/${collection.slug}/${tokenId}`;
  const primaryExtension = collection.primaryFormat.toLowerCase();
  const primaryFilename = `${collection.assetPrefix}_${tokenId}.${primaryExtension}`;
  const thumbnailUrl =
    collection.thumbnailStrategy === 'overlay'
      ? `${modelBaseUrl}/${collection.assetPrefix}_${tokenId}_overlay.png`
      : `https://www.forgottenrunes.com/api/art/${collection.slug}/${tokenId}.png`;
  const alternateModels = {};

  for (const extension of collection.alternateFormats) {
    alternateModels[extension] = `${modelBaseUrl}/${collection.assetPrefix}_${tokenId}.${extension}`;
  }

  return {
    id: `${collection.contract}/${tokenId}`,
    name: layerEntry.name,
    project_id: collection.projectId,
    description: `${collection.name} character with direct ${collection.primaryFormat}, GLB, and FBX downloads.`,
    model_file_url: `${modelBaseUrl}/${primaryFilename}`,
    format: collection.primaryFormat,
    is_public: true,
    is_draft: false,
    created_at: now,
    updated_at: now,
    thumbnail_url: thumbnailUrl,
    metadata: {
      token_id: tokenId,
      licenseName: customLicense,
      attributes: buildAttributes(layerEntry, traitMap),
      alternateModels,
      external_url: `https://opensea.io/item/ethereum/${collection.contract}/${tokenId}`,
    },
  };
}

function ensureProjectEntries(projects) {
  const activeProjectIds = new Set(activeCollections.map((collection) => collection.projectId));
  const forgottenRunesProjectIds = new Set(collections.map((collection) => collection.projectId));
  const nextProjects = projects.filter((project) => {
    if (!forgottenRunesProjectIds.has(project.id)) {
      return true;
    }

    return activeProjectIds.has(project.id);
  });

  for (const collection of activeCollections) {
    const projectEntry = {
      id: collection.projectId,
      name: collection.name,
      creator_id: 'forgotten-runes',
      description: collection.description,
      is_public: true,
      license: customLicense,
      source_type: 'nft',
      source_network: 'ethereum',
      source_contract: collection.contract,
      storage_type: ['website', 's3'],
      opensea_url: collection.openseaUrl,
      created_at: now,
      updated_at: now,
      avatar_data_file: collection.avatarDataFile,
    };

    const existingIndex = nextProjects.findIndex((project) => project.id === collection.projectId);
    if (existingIndex >= 0) {
      nextProjects[existingIndex] = {
        ...nextProjects[existingIndex],
        ...projectEntry,
      };
    } else {
      nextProjects.push(projectEntry);
    }
  }

  return nextProjects;
}

function generateCollectionData(collection) {
  const layersPath = path.join(
    sourceRoot,
    'public',
    'static',
    'nfts',
    collection.slug,
    `${collection.slug}-layers.json`
  );
  const traitsPath = path.join(
    sourceRoot,
    'public',
    'static',
    'nfts',
    collection.slug,
    `${collection.slug}-traits.json`
  );

  if (!fs.existsSync(layersPath) || !fs.existsSync(traitsPath)) {
    throw new Error(`Missing source files for ${collection.slug}`);
  }

  const layers = readJson(layersPath);
  const traits = readJson(traitsPath);
  const traitMap = buildTraitMap(traits);

  return layers.map((layerEntry) => buildAvatarEntry(collection, layerEntry, traitMap));
}

function main() {
  const projectsPath = path.join(repoRoot, 'data', 'projects.json');
  const existingProjects = readJson(projectsPath);
  const nextProjects = ensureProjectEntries(existingProjects);

  writeJson(projectsPath, nextProjects);

  for (const collection of activeCollections) {
    const avatarData = generateCollectionData(collection);
    const outputPath = path.join(repoRoot, 'data', collection.avatarDataFile);
    writeJson(outputPath, avatarData);
    console.log(`${collection.slug}: wrote ${avatarData.length} avatars -> ${collection.avatarDataFile}`);
  }

  for (const collection of collections) {
    if (activeCollections.includes(collection)) {
      continue;
    }

    const outputPath = path.join(repoRoot, 'data', collection.avatarDataFile);
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
      console.log(`${collection.slug}: removed ${collection.avatarDataFile}`);
    }
  }

  console.log(`updated projects.json with ${activeCollections.length} Forgotten Runes collections`);
}

main();
