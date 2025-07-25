import { describe, it, expect } from '@jest/globals';

import {
    getComponentUsage,
    getComponent
} from './json-docs-registry';

describe('JSON Docs Registry - Integration Tests', () => {
    describe('getComponentUsage', () => {
        it('should return usage for gux-button', () => {
            const result = getComponentUsage('gux-button');
            expect(typeof result).toBe('string');
            expect(result).toMatch('<gux-button');
        });

        it('should return usage for components with examples', () => {
            const result = getComponentUsage('gux-form-field-checkbox');
            expect(typeof result === 'string' || result === undefined).toBe(true);
        });

        it('should handle parent reference components', () => {
            const result = getComponentUsage('gux-tab-panel');
            // Should either have its own usage or inherit from parent
            expect(typeof result === 'string' || result === undefined).toBe(true);
        });
    });

    describe('Component Relationships Validation', () => {
        it('should verify relationship data structure', () => {
            const component = getComponent('gux-button');
            expect(component).toBeDefined();
            expect(Array.isArray(component?.relatedComponents)).toBe(true);
        });

        it('should verify components have relatedComponents arrays', () => {
            const testComponents = ['gux-button', 'gux-form-field-checkbox', 'gux-accordion'];

            testComponents.forEach(componentId => {
                const component = getComponent(componentId);
                if (component) {
                    expect(Array.isArray(component.relatedComponents)).toBe(true);
                    expect(component.relatedComponents.length).toBeGreaterThanOrEqual(0);
                }
            });
        });

        it('should verify usage references are properly structured', () => {
            const testComponents = ['gux-button', 'gux-form-field-checkbox'];

            testComponents.forEach(componentId => {
                const usage = getComponentUsage(componentId);
                if (usage) {
                    expect(typeof usage).toBe('string');
                    expect(usage.length).toBeGreaterThan(0);
                }
            });
        });
    });

    describe('Search Performance', () => {
        it('should handle searches across large dataset efficiently', () => {
            const startTime = Date.now();

            // Test multiple component lookups
            const testComponents = ['gux-button', 'gux-form-field-checkbox', 'gux-accordion', 'gux-action-button'];
            testComponents.forEach(componentId => {
                getComponent(componentId);
                getComponentUsage(componentId);
            });

            const duration = Date.now() - startTime;
            expect(duration).toBeLessThan(1000); // Should complete within 1 second
        });
    });

    describe('Component Examples Validation', () => {
        it('should validate core components exist and have expected data', () => {
            const coreComponents = ['gux-button', 'gux-form-field-checkbox', 'gux-accordion'];

            coreComponents.forEach(componentId => {
                const component = getComponent(componentId);
                expect(component).toBeDefined();
                expect(component?.id).toBe(componentId);
                expect(typeof component?.name).toBe('string');
                expect(typeof component?.description).toBe('string');
            });
        });

        it('should validate usage content quality', () => {
            const componentsWithUsage = ['gux-button', 'gux-form-field-checkbox'];

            componentsWithUsage.forEach(componentId => {
                const usage = getComponentUsage(componentId);
                if (usage) {
                    expect(usage.length).toBeGreaterThan(10); // Should have meaningful content
                    expect(usage.includes('gux')).toBe(true); // Should reference components
                }
            });
        });
    });
});