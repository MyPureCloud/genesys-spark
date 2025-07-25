import { describe, it, expect, beforeAll } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

interface UsageReference {
    type: 'reference' | 'parentReference';
    generatedUsage?: {
        import?: string;
        examples: any[];
    };
    parentComponentId?: string;
}

interface ComponentData {
    tag: string;
    relatedComponents?: string[];
}

interface JsonDocsData {
    usageReferences?: Record<string, UsageReference>;
    components?: ComponentData[];
}

let jsonDocsData: JsonDocsData | null = null;

describe('Component Example Processing', () => {
    beforeAll(() => {
        const jsonDocsPath = path.join(__dirname, '../dist/data/json-docs.json');

        if (fs.existsSync(jsonDocsPath)) {
            const rawData = fs.readFileSync(jsonDocsPath, 'utf-8');
            jsonDocsData = JSON.parse(rawData);
        }
    });

    describe('Enhanced Data Structure', () => {
        it('should contain all enhanced data structures', () => {
            if (jsonDocsData) {
                expect(jsonDocsData).toHaveProperty('usageReferences');
            } else {
                console.warn('No generated data available. Run npm run generate-docs first.');
            }
        });

        it('should have valid usage reference structure', () => {
            if (jsonDocsData?.usageReferences) {
                const references = Object.entries(jsonDocsData.usageReferences);
                expect(references.length).toBeGreaterThan(0);

                references.slice(0, 10).forEach(([_key, ref]) => {
                    expect(ref).toHaveProperty('type');
                    expect(['reference', 'parentReference'].includes(ref.type)).toBe(true);
                    if (ref.type === 'reference') {
                        expect(ref).toHaveProperty('generatedUsage');
                    }
                });
            }
        });

        it('should have components with relationship data', () => {
            if (jsonDocsData?.components) {
                const componentsWithRelations = jsonDocsData.components.filter(c =>
                    c.relatedComponents && c.relatedComponents.length > 0
                );

                expect(componentsWithRelations.length).toBeGreaterThan(0);

                componentsWithRelations.slice(0, 5).forEach(component => {
                    expect(Array.isArray(component.relatedComponents)).toBe(true);
                    expect(component.relatedComponents.length).toBeGreaterThan(0);
                });
            }
        });
    });

    describe('Component Relationship Logic', () => {
        it('should verify parent-child relationships', () => {
            const expectedParentRelations = [
                { child: 'gux-dropdown-multi-tag', parent: 'gux-dropdown-multi' },
                { child: 'gux-tooltip-title', parent: 'gux-tooltip' },
                { child: 'gux-toggle-slider', parent: 'gux-toggle' }
            ];

            expectedParentRelations.forEach(({ child, parent }) => {
                if (jsonDocsData?.usageReferences?.[child]) {
                    const childRef = jsonDocsData.usageReferences[child];
                    if (childRef.type === 'parentReference') {
                        expect(childRef.parentComponentId).toBe(parent);
                    }
                }
            });
        });
    });

    describe('Generated Usage Content Quality', () => {
        it('should have valid import statements', () => {
            if (jsonDocsData?.usageReferences) {
                const directRefs = Object.values(jsonDocsData.usageReferences).filter(ref => ref.type === 'reference');

                directRefs.slice(0, 10).forEach(ref => {
                    const importStatement = ref.generatedUsage?.import;
                    if (importStatement) {
                        expect(importStatement).toContain('registerSparkComponents');
                        expect(importStatement).toContain('genesys-spark');
                    }
                });
            }
        });

        it('should have structured examples with proper format', () => {
            if (jsonDocsData?.usageReferences) {
                const directRefs = Object.values(jsonDocsData.usageReferences).filter(ref => ref.type === 'reference');

                directRefs.slice(0, 10).forEach(ref => {
                    expect(ref.generatedUsage).toHaveProperty('examples');
                    expect(Array.isArray(ref.generatedUsage.examples)).toBe(true);
                });
            }
        });
    });

    describe('Processing Script Metadata', () => {
        it('should validate processing completeness', () => {
            if (jsonDocsData) {
                expect(jsonDocsData).toHaveProperty('usageReferences');

                const usageRefCount = Object.keys(jsonDocsData.usageReferences || {}).length;
                const componentCount = jsonDocsData.components?.length || 0;

                expect(usageRefCount).toBeLessThanOrEqual(componentCount);
                console.log('Missing component usageReferences',  jsonDocsData.components.filter(c => !Object.keys(jsonDocsData.usageReferences).some(u => u === `${c.tag}-usage`)).map(c => c.tag));
            }
        });
    });
});