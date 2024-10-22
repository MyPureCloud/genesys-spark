import { cleanOldOutputFolder } from '../utils/clean-old-output-folder.mjs';
import { createThemes } from '../utils/create-themes.mjs';
import { formatOutputFolder } from '../utils/format-output-folder.mjs';

const outputFolder = process.argv[2] || 'dist';

cleanOldOutputFolder(outputFolder);

await createThemes('data', outputFolder);

// Formatting
formatOutputFolder(outputFolder);
