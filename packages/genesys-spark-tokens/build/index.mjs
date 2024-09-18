import {
  cleanOldOutputFolder,
  createThemes,
  formatOutputFolder,
  getAllTokenStudioFiles,
  processTokenFile
} from '../utils/index.mjs';

const outputFolder = process.argv[2] || 'dist';

cleanOldOutputFolder(outputFolder);
cleanOldOutputFolder(`${outputFolder}-new`);

// Token Generation
const tokenStudioFiles = getAllTokenStudioFiles('data-old');

for (const tokenStudioFile of tokenStudioFiles) {
  await processTokenFile(outputFolder, tokenStudioFile);
}

// Theme Generation
await createThemes('data', `${outputFolder}-new`);

// Formatting
formatOutputFolder(outputFolder);
formatOutputFolder(`${outputFolder}-new`);
