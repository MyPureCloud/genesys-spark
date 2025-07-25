#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';

/**
 * Enhance component metadata with comprehensive relationship and usage information
 * This script processes component documentation to:
 * 1. Compute parent-child relationships based on folder structure
 * 2. Analyze example.html files to extract component usage patterns
 * 3. Generate usage documentation and reference structures
 * 4. Enhance JSON docs with relatedComponents, parentComponent, and usage references
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentsSourcePath = path.resolve(__dirname, '../../genesys-spark-components/src/components');

// Global tracking variables
const componentExamples = new Map(); // componentId -> Set of example file paths where it appears
const usageContent = new Map(); // examplePath -> content data
const componentRelationships = new Map(); // componentId -> Set of related component IDs

/**
 * Main function to enhance component metadata with relationships and usage information
 */
async function enhanceComponentMetadata() {
    console.log('📝 Enhancing component metadata with relationships and usage information...');
    console.log('🔍 Discovering and analyzing example files...');

    await discoverExamples();

    // Load JSON docs first to get component file paths
    const jsonDocsPath = path.resolve(__dirname, '../src/data/json-docs.json');
    if (!fs.existsSync(jsonDocsPath)) {
        throw new Error(`json-docs.json not found at ${jsonDocsPath}`);
    }

    const jsonDocs = JSON.parse(fs.readFileSync(jsonDocsPath, 'utf8'));

    // Add parent component information first
    console.log('🔗 Computing parent component relationships...');
    addParentComponentInfo(jsonDocs.components);

    buildComponentRelationships(jsonDocs.components);

    console.log('📚 Creating reference-based usage structure...');

    const enhancedDocs = createEnhancedDocStructure(jsonDocs);

    console.log('🎯 Adding relationship data to components...');
    addRelationshipDataToComponents(enhancedDocs);

    // Write the enhanced documentation back
    fs.writeFileSync(jsonDocsPath, JSON.stringify(enhancedDocs, null, 2));

    const exampleFileCount = await glob(`${componentsSourcePath}/**/example.html`);
    const relationshipCount = Array.from(componentRelationships.values())
        .reduce((sum, relations) => sum + relations.size, 0);

    console.log('✅ Enhanced documentation with relationships:');
    console.log(`   📄 Analyzed: ${exampleFileCount.length} example files`);
    console.log(`   🧩 Components: ${componentExamples.size} components found in examples`);
    console.log(`   🔗 Relationships: ${relationshipCount} component relationships built`);
    console.log(`   📝 Updated: ${jsonDocsPath}`);
}

/**
 * Discover all example.html files and analyze which components are used in each
 */
async function discoverExamples() {
    const examplePattern = `${componentsSourcePath}/**/example.html`;
    const exampleFiles = await glob(examplePattern);

    console.log(`  📄 Found ${exampleFiles.length} example files`);

    for (const examplePath of exampleFiles) {
        try {
            const content = fs.readFileSync(examplePath, 'utf8');
            const componentsInExample = extractComponentsFromExample(content);

            if (componentsInExample.size > 0) {
                // Store processed usage content (only essential data for LLMs)
                usageContent.set(examplePath, {
                    content: content,
                    componentsUsed: Array.from(componentsInExample)
                });

                // Track which examples each component appears in
                for (const componentId of componentsInExample) {
                    if (!componentExamples.has(componentId)) {
                        componentExamples.set(componentId, new Set());
                    }
                    componentExamples.get(componentId).add(examplePath);
                }

                console.log(`    ✅ ${path.relative(componentsSourcePath, examplePath)}: ${componentsInExample.size} components`);
            }
        } catch (error) {
            console.log(`    ⚠️  Error processing ${examplePath}: ${error.message}`);
        }
    }
}

/**
 * Extract all gux-* component tags from example content
 */
function extractComponentsFromExample(content) {
    const components = new Set();

    // Match all gux-* component tags (opening tags)
    const componentRegex = /<(gux-[a-z0-9-]+)(?:\s|>)/gi;
    let match;

    while ((match = componentRegex.exec(content)) !== null) {
        components.add(match[1].toLowerCase());
    }

    return components;
}

/**
 * Build component relationships based on co-usage in examples AND parent-child patterns
 */
function buildComponentRelationships(allComponentsData) {
    // Create a set of all component IDs
    const allComponents = new Set();

    // Add components from examples
    for (const [componentId] of componentExamples) {
        allComponents.add(componentId);
    }

    // Add all components from the JSON docs (in case some don't have examples)
    for (const component of allComponentsData) {
        allComponents.add(component.tag);
    }

    // First, build parent-child relationships using folder structure for ALL components
    for (const componentId of allComponents) {
        if (!componentRelationships.has(componentId)) {
            componentRelationships.set(componentId, new Set());
        }

        const relations = componentRelationships.get(componentId);

        // Use the pre-computed parent component
        const component = allComponentsData.find(c => c.tag === componentId);
        const parentId = component?.parentComponent;

        if (parentId) {
            // Add parent as related component for child
            relations.add(parentId);

            // Add child as related component for parent
            if (!componentRelationships.has(parentId)) {
                componentRelationships.set(parentId, new Set());
            }
            componentRelationships.get(parentId).add(componentId);
        }
    }

    // Then, build co-usage relationships from examples
    for (const [componentId, examplePaths] of componentExamples) {
        const relations = componentRelationships.get(componentId);

        // For each example this component appears in
        for (const examplePath of examplePaths) {
            const contentData = usageContent.get(examplePath);
            if (contentData) {
                // Add all other components in the same example as related
                for (const otherComponent of contentData.componentsUsed) {
                    if (otherComponent !== componentId) {
                        relations.add(otherComponent);
                    }
                }
            }
        }
    }

    console.log(`  🔗 Built relationships for ${componentRelationships.size} components`);
}

/**
 * Score and sort examples based on relevance to a component
 */
function scoreAndSortExamples(componentId, examplePaths, jsonDocs) {
    // Find the component in jsonDocs to get its file path
    const component = jsonDocs.components.find(c => c.tag === componentId);
    if (!component || !component.filePath) {
        // Fallback if we can't find component info
        const examplePathsArray = Array.from(examplePaths);
        return {
            primaryExample: examplePathsArray[0]
        };
    }

    // Extract the component's directory path (e.g., "src/components/stable/gux-button")
    const componentDir = path.dirname(component.filePath);
    const componentPath = componentDir.replace(/^src\/components\//, ''); // Remove base path

    const examplePathsArray = Array.from(examplePaths);

    // Score each example based on relevance to the component
    const scoredExamples = examplePathsArray.map(examplePath => {
        const exampleKey = generateExampleKey(examplePath);
        let score = 0;

        // High priority: Direct component example
        if (exampleKey.includes(`_${componentId}_`)) {
            score += 1000;
        }

        // Medium priority: Same component family (different variants)
        const componentFamily = componentId.replace(/-beta|-legacy/, '');
        if (exampleKey.includes(`_${componentFamily}_`) || exampleKey.includes(`_${componentFamily}-`)) {
            score += 500;
        }

        // Low priority: Same category (stable/beta/legacy)
        const [category] = componentPath.split('/');
        if (exampleKey.startsWith(category)) {
            score += 100;
        }

        // Proximity bonus: Calculate path similarity
        const examplePath_clean = examplePath.replace(/^.*\/src\/components\//, '').replace('/example.html', '');
        const commonPrefixLength = getCommonPrefixLength(componentPath, examplePath_clean);
        score += commonPrefixLength; // Up to 10 points for proximity

        return {
            examplePath,
            exampleKey,
            score
        };
    });

    // Sort by score (highest first)
    scoredExamples.sort((a, b) => b.score - a.score);

    return {
        primaryExample: scoredExamples[0].examplePath
    };
}

/**
 * Create enhanced documentation structure with references instead of duplicating content
 */
function createEnhancedDocStructure(originalDocs) {
    const enhancedDocs = { ...originalDocs };

    // Replace the usage object with a reference-based structure
    enhancedDocs.usageReferences = {};

    // Create usage references instead of duplicating content
    for (const [componentId, examplePaths] of componentExamples) {
        const { primaryExample } = scoreAndSortExamples(componentId, examplePaths, originalDocs);

        enhancedDocs.usageReferences[`${componentId}-usage`] = {
            type: 'reference',
            generatedUsage: generateUsageFromExample(componentId, primaryExample, originalDocs.components),
            ...(shouldShowCompleteExample(componentId, originalDocs.components) && {
                note: `This component requires context and shows complete usage examples`
            })
        };
    }

    // Handle subcomponents with references to parent examples
    for (const component of originalDocs.components) {
        const componentId = component.tag;

        if (!componentExamples.has(componentId)) {
            // This component doesn't have its own examples, use pre-computed parent
            const parentId = component.parentComponent;

            if (parentId && componentExamples.has(parentId)) {
                const parentExamples = componentExamples.get(parentId);
                const { primaryExample: parentPrimaryExample } = scoreAndSortExamples(parentId, parentExamples, originalDocs);

                // Create appropriate note based on whether component requires complete context
                const noteText = shouldShowCompleteExample(componentId, originalDocs.components)
                    ? `This component must be used within ${parentId} and shows the complete example context`
                    : `This component shares examples with ${parentId}`;

                enhancedDocs.usageReferences[`${componentId}-usage`] = {
                    type: 'parentReference',
                    note: noteText,
                    generatedUsage: generateUsageFromExample(componentId, parentPrimaryExample, originalDocs.components)
                };

                console.log(`  🔗 ${componentId} -> references ${parentId} examples`);
            }
        }
    }

    // Remove the old usage object to save space
    delete enhancedDocs.usage;

    return enhancedDocs;
}

/**
 * Add parent component information to all components based on folder structure
 */
function addParentComponentInfo(components) {
    for (const component of components) {
        const componentId = component.tag;
      component.parentComponent = findParentComponent(componentId, components);
    }
}

function addRelationshipDataToComponents(docs) {
    for (const component of docs.components) {
        const componentId = component.tag;

        // Add related components
        if (componentRelationships.has(componentId)) {
            const relations = Array.from(componentRelationships.get(componentId));
            component.relatedComponents = relations.sort();
        } else {
            component.relatedComponents = [];
        }

        // Add usage reference path
        const usageKey = `${componentId}-usage`;
        if (docs.usageReferences[usageKey]) {
            component.usageReference = usageKey;
        }
    }
}

/**
 * Generate a unique key for an example file
 */
function generateExampleKey(examplePath) {
    const relativePath = path.relative(componentsSourcePath, examplePath);
    return relativePath.replace(/[/\\]/g, '_').replace('.html', '');
}

/**
 * Generate comprehensive usage documentation for a component from its primary example
 */
function generateUsageFromExample(componentId, examplePath, allComponentsData) {
    const content = usageContent.get(examplePath);
    if (!content) return null;

    const htmlContent = content.content;

    // Determine if this component should show complete examples or isolated usage
    let componentUsage;
    if (shouldShowCompleteExample(componentId, allComponentsData)) {
        // For components that cannot be used alone, show the complete example
        componentUsage = extractCompleteExample(htmlContent, componentId);
    } else {
        // For standalone components, extract specific usage
        componentUsage = extractComponentUsage(htmlContent, componentId);
    }

    return {
        overview: `Usage examples for ${componentId}`,
        examples: componentUsage
    };
}

/**
 * Determine if a component should show complete examples based on its relationship structure
 * Components with parent components typically need complete context examples
 */
function shouldShowCompleteExample(componentId, allComponentsData) {
    // Use the pre-computed parent component
    const component = allComponentsData.find(c => c.tag === componentId);
    return component?.parentComponent !== null;
}

/**
 * Extract complete example showing the component in full context
 */
function extractCompleteExample(htmlContent, componentId) {
  // For components requiring context, return the entire example
  // This shows how the component works within its parent structure
  return [{
      title: `Complete ${componentId} Usage Example`,
      code: cleanHtmlForExample(htmlContent)
    }];
}

/**
 * Extract specific usage examples for a component from HTML content
 */
function extractComponentUsage(htmlContent, componentId) {
    const examples = [];
    const regex = new RegExp(`<${componentId}[^>]*>([\\s\\S]*?)<\\/${componentId}>`, 'gi');
    let match;
    let exampleIndex = 1;

    while ((match = regex.exec(htmlContent)) !== null) {
        examples.push({
            title: `${componentId} Example ${exampleIndex}`,
            code: cleanHtmlForExample(match[0])
        });
        exampleIndex++;
    }

    return examples;
}

/**
 * Find the parent component based on folder structure from filePath
 */
function findParentComponent(componentId, allComponents) {
    // Find the current component's file path
    const currentComponent = allComponents.find(c => c.tag === componentId);
    if (!currentComponent || !currentComponent.filePath) {
        return null;
    }

    const currentPath = currentComponent.filePath;
    const currentDir = path.dirname(currentPath);

    // Look for components whose directory contains this component's directory
    let bestParent = null;
    let shortestDistance = Infinity;

    for (const component of allComponents) {
        if (component.tag === componentId || !component.filePath) {
            continue; // Skip self and components without file paths
        }

        const candidateDir = path.dirname(component.filePath);

        // Check if the candidate's directory is a parent of the current directory
        // and the current directory starts with the candidate directory path
        if (currentDir.startsWith(candidateDir + '/') || currentDir.startsWith(candidateDir + '\\')) {
            // Calculate the distance (how many directory levels separate them)
            const relativePath = path.relative(candidateDir, currentDir);
            const levels = relativePath.split(path.sep).length;

            // Keep the closest parent (shortest distance)
            if (levels < shortestDistance) {
                shortestDistance = levels;
                bestParent = component.tag;
            }
        }
    }

    return bestParent;
}

/**
 * Clean HTML content for use in examples
 */
function cleanHtmlForExample(html) {
    return html
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
}

/**
 * Calculate the length of the common prefix between two paths.
 */
function getCommonPrefixLength(path1, path2) {
    const minLength = Math.min(path1.length, path2.length);
    let commonLength = 0;
    for (let i = 0; i < minLength; i++) {
        if (path1[i] === path2[i]) {
            commonLength++;
        } else {
            break;
        }
    }
    return commonLength;
}

// Run the script
enhanceComponentMetadata().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
});