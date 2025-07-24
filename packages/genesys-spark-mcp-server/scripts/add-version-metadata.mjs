#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Add version metadata to the generated JSON docs
 */
function addVersionMetadata() {
    console.log('📝 Adding version metadata to json-docs.json...');
    
    try {
        const jsonDocsPath = path.resolve(__dirname, '../src/data/json-docs.json');
        const componentsPackagePath = path.resolve(__dirname, '../../genesys-spark-components/package.json');
        
        // Read the JSON docs
        if (!fs.existsSync(jsonDocsPath)) {
            throw new Error(`json-docs.json not found at ${jsonDocsPath}`);
        }
        
        const docs = JSON.parse(fs.readFileSync(jsonDocsPath, 'utf8'));
        
        // Read the source package.json
        if (!fs.existsSync(componentsPackagePath)) {
            throw new Error(`package.json not found at ${componentsPackagePath}`);
        }
        
        const sourcePackage = JSON.parse(fs.readFileSync(componentsPackagePath, 'utf8'));
        
        // Add source metadata (only essential info for LLMs)
        docs.sourceMetadata = {
            package: sourcePackage.name,
            version: sourcePackage.version,
            description: sourcePackage.description
        };
        
        // Clean up redundant data not useful for LLMs
        delete docs.timestamp;
        if (docs.compiler && docs.compiler.typescriptVersion) {
            delete docs.compiler.typescriptVersion;
        }
        
        // Write back the updated docs
        fs.writeFileSync(jsonDocsPath, JSON.stringify(docs, null, 2));
        
        console.log('✅ Added version metadata to json-docs.json');
        console.log(`   Source Package: ${sourcePackage.name}@${sourcePackage.version}`);
        console.log(`   Components: ${docs.components.length} components`);
        
    } catch (error) {
        console.error('❌ Failed to add version metadata:', error.message);
        process.exit(1);
    }
}

// Run the script
addVersionMetadata(); 