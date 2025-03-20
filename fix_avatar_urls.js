const fs = require('fs');
const path = require('path');

// Load the avatars data
const avatarsPath = path.join(__dirname, 'data', 'avatars.json');
const avatars = JSON.parse(fs.readFileSync(avatarsPath, 'utf8'));

// Define the avatars that need to be fixed
const avatarsToFix = [
  {
    name: 'Cool',
    id: '1abd3d23-04d1-4ed4-832d-3a94602887ba',
    correctRegularVrm: 'igaT6irIERD3pOhNF2vwFJ8he3ZAa5py9iYT_066M7M', // 196_Cool_Fridge.vrm
    correctVoxelVrm: '8o1xVWYRd0vwiCQ2a966pq5SO4U_q2Bh03aRBiPvi78'   // 196_Cool_Fridge_Voxel.vrm
  },
  {
    name: 'Carrot',
    id: 'bf659356-ff0f-409a-a2cd-a6def10572aa',
    correctRegularVrm: 'S3t6KT5lUoO1LUZe0iP8VtO_SVW7IVOHM9QMHEHEl64', // 023_Carrot_Kid.vrm
    correctVoxelVrm: 'ZPNXuX_xp4dn48zrF2TvSYpOfqyewBgAnJ6buGACA6o'   // 023_Carrot_Kid_Voxel.vrm
  },
  {
    name: 'Mister',
    id: 'dbf403c4-0386-4a4e-9b6d-c6a4d7aa215e',
    correctRegularVrm: 'elvlpN6jefoDXqqCWMxCBVZnl6Z2lLD7-wC8N5z1bVk', // 167_Mister_Contract.vrm
    correctVoxelVrm: 'ns8uG3_5ixSCh5iL3bM8o0cz3Xi52WUMYhO9ypuxf1Q'   // 167_Mister_Contract_Voxel.vrm
  }
];

// Fix each avatar
let fixedCount = 0;

for (const avatar of avatarsToFix) {
  // Find the avatar in the database
  const avatarEntry = avatars.find(a => a.id === avatar.id);
  
  if (!avatarEntry) {
    console.log(`Avatar ${avatar.name} (${avatar.id}) not found in the database!`);
    continue;
  }
  
  console.log(`Fixing avatar: ${avatar.name}`);
  console.log(`  Before:`);
  console.log(`    model_file_url: ${avatarEntry.model_file_url}`);
  console.log(`    voxel_vrm: ${avatarEntry.metadata.alternateModels.voxel_vrm}`);
  
  // Fix the URLs
  avatarEntry.model_file_url = 'https://arweave.net/' + avatar.correctRegularVrm;
  avatarEntry.metadata.alternateModels.voxel_vrm = 'https://arweave.net/' + avatar.correctVoxelVrm;
  
  console.log(`  After:`);
  console.log(`    model_file_url: ${avatarEntry.model_file_url}`);
  console.log(`    voxel_vrm: ${avatarEntry.metadata.alternateModels.voxel_vrm}`);
  console.log();
  
  fixedCount++;
}

if (fixedCount > 0) {
  // Save the updated avatars data
  fs.writeFileSync(avatarsPath, JSON.stringify(avatars, null, 2));
  console.log(`Fixed ${fixedCount} avatars. Updated avatars.json`);
} else {
  console.log('No avatars were fixed.');
} 