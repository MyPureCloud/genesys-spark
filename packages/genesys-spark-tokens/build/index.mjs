import {
  cleanOldOutputFolder,
  formatOutputFolder,
  getAllTokenStudioFiles,
  processTokenFile
} from '../utils/index.mjs';

const outputFolder = process.argv[2] || 'dist';

cleanOldOutputFolder(outputFolder);

const tokenStudioFiles = getAllTokenStudioFiles();

for (const tokenStudioFile of tokenStudioFiles) {
  await processTokenFile(outputFolder, tokenStudioFile);
}

formatOutputFolder(outputFolder);
