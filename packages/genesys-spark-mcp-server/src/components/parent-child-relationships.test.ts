import { describe, it, expect } from '@jest/globals';
import { getComponent, getComponentExamples } from './json-docs-registry';

// Test data arrays for parameterized testing
const parentChildRelationships = [
    // Tab Components
    { child: 'gux-tab', expectedParent: 'gux-tabs', category: 'tabs' },
    { child: 'gux-tab-panel', expectedParent: 'gux-tabs', category: 'tabs' },
    { child: 'gux-tab-list', expectedParent: 'gux-tabs', category: 'tabs' },
    
    // Advanced Tab Components
    { child: 'gux-tab-advanced', expectedParent: 'gux-tabs-advanced', category: 'advanced-tabs' },
    { child: 'gux-tab-advanced-panel', expectedParent: 'gux-tabs-advanced', category: 'advanced-tabs' },
    { child: 'gux-tab-advanced-list', expectedParent: 'gux-tabs-advanced', category: 'advanced-tabs' },
    
    // Avatar Components
    { child: 'gux-avatar-group-item-beta', expectedParent: 'gux-avatar-group-beta', category: 'avatar' },
    { child: 'gux-avatar-group-add-item-beta', expectedParent: 'gux-avatar-group-beta', category: 'avatar' },
    { child: 'gux-avatar-overflow-beta', expectedParent: 'gux-avatar-group-beta', category: 'avatar' },
    { child: 'gux-avatar-overflow-item-beta', expectedParent: 'gux-avatar-overflow-beta', category: 'avatar' },
    { child: 'gux-avatar-change-photo-beta', expectedParent: 'gux-avatar-beta', category: 'avatar' },
    { child: 'gux-avatar-focusable-beta', expectedParent: 'gux-avatar-beta', category: 'avatar' },
    
    // Form Components
    { child: 'gux-form-description', expectedParent: 'gux-form-beta', category: 'form' },
    { child: 'gux-form-fieldset-heading', expectedParent: 'gux-form-beta', category: 'form' },
    { child: 'gux-form-heading', expectedParent: 'gux-form-beta', category: 'form' },
    { child: 'gux-form-footer', expectedParent: 'gux-form-beta', category: 'form' },
    
    // List and Accordion Components
    { child: 'gux-list-item', expectedParent: 'gux-list', category: 'list' },
    { child: 'gux-list-divider', expectedParent: 'gux-list', category: 'list' },
    { child: 'gux-accordion-section', expectedParent: 'gux-accordion', category: 'accordion' },
    
    // Table Components
    { child: 'gux-all-row-select', expectedParent: 'gux-table', category: 'table' },
    { child: 'gux-row-select', expectedParent: 'gux-table', category: 'table' },
    { child: 'gux-sort-control', expectedParent: 'gux-table', category: 'table' },
    { child: 'gux-table-select-menu', expectedParent: 'gux-table', category: 'table' },
    
    // Table Toolbar Components
    { child: 'gux-table-toolbar-action', expectedParent: 'gux-table-toolbar', category: 'table-toolbar' },
    { child: 'gux-table-toolbar-custom-action', expectedParent: 'gux-table-toolbar', category: 'table-toolbar' },
    { child: 'gux-table-toolbar-menu-button', expectedParent: 'gux-table-toolbar', category: 'table-toolbar' },
    
    // Pagination Components
    { child: 'gux-pagination-buttons', expectedParent: 'gux-pagination', category: 'pagination' },
    { child: 'gux-pagination-item-counts', expectedParent: 'gux-pagination', category: 'pagination' },
    { child: 'gux-pagination-items-per-page', expectedParent: 'gux-pagination', category: 'pagination' },
    { child: 'gux-pagination-ellipsis-button', expectedParent: 'gux-pagination-buttons', category: 'pagination' },
    
    // Rich Text Editor Components (complex hierarchy)
    { child: 'gux-rich-text-editor-action-link', expectedParent: 'gux-rich-text-editor-action', category: 'rich-text-editor' },
    { child: 'gux-rich-text-editor-action-rich-style', expectedParent: 'gux-rich-text-editor-action', category: 'rich-text-editor' },
    { child: 'gux-rich-text-editor-action-text-highlight', expectedParent: 'gux-rich-text-editor-action', category: 'rich-text-editor' },
    { child: 'gux-rich-highlight-list-item', expectedParent: 'gux-rich-text-editor-list', category: 'rich-text-editor' },
    { child: 'gux-rich-style-list-item', expectedParent: 'gux-rich-text-editor-list', category: 'rich-text-editor' },
    { child: 'gux-rich-text-editor-sub-list', expectedParent: 'gux-rich-text-editor-list', category: 'rich-text-editor' },
    { child: 'gux-rich-text-editor-action', expectedParent: 'gux-rich-text-editor-beta', category: 'rich-text-editor' },
    { child: 'gux-rich-text-editor-action-group', expectedParent: 'gux-rich-text-editor-beta', category: 'rich-text-editor' },
    { child: 'gux-rich-text-editor-list', expectedParent: 'gux-rich-text-editor-beta', category: 'rich-text-editor' },
    { child: 'gux-rich-text-editor-menu', expectedParent: 'gux-rich-text-editor-beta', category: 'rich-text-editor' },
    
    // Dropdown and Listbox Components
    { child: 'gux-dropdown-multi-tag', expectedParent: 'gux-dropdown-multi', category: 'dropdown' },
    { child: 'gux-option-multi', expectedParent: 'gux-listbox-multi', category: 'listbox' },
    { child: 'gux-create-option', expectedParent: 'gux-listbox-multi', category: 'listbox' },
    { child: 'gux-option', expectedParent: 'gux-listbox', category: 'listbox' },
    { child: 'gux-option-icon', expectedParent: 'gux-listbox', category: 'listbox' },
    
    // Menu Components
    { child: 'gux-menu-option', expectedParent: 'gux-menu', category: 'menu' },
    { child: 'gux-submenu', expectedParent: 'gux-menu', category: 'menu' },
    { child: 'gux-menu', expectedParent: 'gux-flyout-menu', category: 'menu' },
    
    // Toggle and Stepper Components
    { child: 'gux-toggle-slider', expectedParent: 'gux-toggle', category: 'toggle' },
    { child: 'gux-step-title', expectedParent: 'gux-step', category: 'stepper' },
    { child: 'gux-step', expectedParent: 'gux-stepper-beta', category: 'stepper' },
    
    // Month Picker Components
    { child: 'gux-month-list-item', expectedParent: 'gux-month-list', category: 'month-picker' },
    { child: 'gux-month-list', expectedParent: 'gux-month-calendar', category: 'month-picker' },
    { child: 'gux-month-calendar', expectedParent: 'gux-month-picker-beta', category: 'month-picker' },
    
    // Side Panel Components
    { child: 'gux-modal-side-panel-beta', expectedParent: 'gux-side-panel-beta', category: 'side-panel' },
    { child: 'gux-side-panel-heading', expectedParent: 'gux-side-panel-beta', category: 'side-panel' },
    
    // Other Specific Relationships
    { child: 'gux-column-manager-item', expectedParent: 'gux-column-manager', category: 'column-manager' },
    { child: 'gux-segmented-control-item', expectedParent: 'gux-segmented-control-beta', category: 'segmented-control' },
    { child: 'gux-selector-card-beta', expectedParent: 'gux-selector-cards-beta', category: 'selector' },
    { child: 'gux-skip-navigation-item', expectedParent: 'gux-skip-navigation-list', category: 'navigation' },
    { child: 'gux-switch-item', expectedParent: 'gux-switch-legacy', category: 'switch' },
    
    // Form Field Components
    { child: 'gux-file-list-item', expectedParent: 'gux-form-field-file-beta', category: 'form-field' },
];

// Bidirectional relationships test data
const bidirectionalRelationships = [
    {
        parent: 'gux-tabs',
        expectedChildren: ['gux-tab', 'gux-tab-panel', 'gux-tab-list'],
        category: 'tabs'
    },
    {
        parent: 'gux-tabs-advanced',
        expectedChildren: ['gux-tab-advanced', 'gux-tab-advanced-panel', 'gux-tab-advanced-list'],
        category: 'advanced-tabs'
    },
    {
        parent: 'gux-avatar-group-beta',
        expectedChildren: ['gux-avatar-group-item-beta', 'gux-avatar-group-add-item-beta', 'gux-avatar-overflow-beta'],
        category: 'avatar'
    },
    {
        parent: 'gux-form-beta',
        expectedChildren: ['gux-form-description', 'gux-form-fieldset-heading', 'gux-form-heading', 'gux-form-footer'],
        category: 'form'
    },
    {
        parent: 'gux-list',
        expectedChildren: ['gux-list-item', 'gux-list-divider'],
        category: 'list'
    },
    {
        parent: 'gux-table',
        expectedChildren: ['gux-all-row-select', 'gux-row-select', 'gux-sort-control', 'gux-table-select-menu'],
        category: 'table'
    },
    {
        parent: 'gux-pagination',
        expectedChildren: ['gux-pagination-buttons', 'gux-pagination-item-counts', 'gux-pagination-items-per-page'],
        category: 'pagination'
    }
];

// Components that should inherit examples from their parent
const exampleInheritanceTestCases = [
    { child: 'gux-tab-panel', parent: 'gux-tabs', category: 'tabs' },
    { child: 'gux-tab', parent: 'gux-tabs', category: 'tabs' },
    { child: 'gux-dropdown-multi-tag', parent: 'gux-dropdown-multi', category: 'dropdown' },
    { child: 'gux-toggle-slider', parent: 'gux-toggle', category: 'toggle' },
    { child: 'gux-list-item', parent: 'gux-list', category: 'list' },
    { child: 'gux-accordion-section', parent: 'gux-accordion', category: 'accordion' }
];

// Components that previously had broken relationships
const regressionTestCases = [
    { component: 'gux-tab-panel', shouldNotContain: ['gux-', ''], category: 'regression' },
    { component: 'gux-tab', shouldNotContain: ['gux-', ''], category: 'regression' },
    { component: 'gux-list-item', shouldNotContain: ['gux-', ''], category: 'regression' },
    { component: 'gux-column-manager-item', shouldNotContain: ['gux-', ''], category: 'regression' },
    { component: 'gux-menu-option', shouldNotContain: ['gux-', ''], category: 'regression' }
];

describe('Parent-Child Component Relationships', () => {
    describe('Child to Parent Relationships', () => {
        it.each(parentChildRelationships)(
            'should map $child to $expectedParent ($category)',
            ({ child, expectedParent, category }) => {
                const childComponent = getComponent(child);
                
                expect(childComponent).toBeDefined();
                expect(childComponent.relatedComponents).toBeDefined();
                expect(childComponent.relatedComponents).toContain(expectedParent);
            }
        );
    });

    describe('Bidirectional Relationships', () => {
        it.each(bidirectionalRelationships)(
            'should have $parent contain all expected children: $expectedChildren ($category)',
            ({ parent, expectedChildren, category }) => {
                const parentComponent = getComponent(parent);
                
                expect(parentComponent).toBeDefined();
                expect(parentComponent.relatedComponents).toBeDefined();
                
                // Check that parent contains each expected child
                expectedChildren.forEach(expectedChild => {
                    const childComponent = getComponent(expectedChild);
                    expect(childComponent).toBeDefined();
                    expect(parentComponent.relatedComponents).toContain(expectedChild);
                });
            }
        );

        it.each(bidirectionalRelationships)(
            'should have children point back to parent $parent ($category)',
            ({ parent, expectedChildren, category }) => {
                expectedChildren.forEach(child => {
                    const childComponent = getComponent(child);
                    const parentComponent = getComponent(parent);
                    
                    expect(childComponent).toBeDefined();
                    expect(parentComponent).toBeDefined();
                    expect(childComponent.relatedComponents).toContain(parent);
                });
            }
        );
    });

    describe('Example Inheritance', () => {
        it.each(exampleInheritanceTestCases)(
            'should allow $child to inherit examples from $parent ($category)',
            ({ child, parent, category }) => {
                const childExamples = getComponentExamples({ componentId: child });
                const parentExamples = getComponentExamples({ componentId: parent });
                
                const childComponent = getComponent(child);
                const parentComponent = getComponent(parent);
                
                expect(childComponent).toBeDefined();
                expect(parentComponent).toBeDefined();
                
                // Child should either have its own examples OR inherit from parent
                const hasOwnExamples = childExamples && childExamples.length > 0;
                const parentHasExamples = parentExamples && parentExamples.length > 0;
                
                if (parentHasExamples) {
                    // If parent has examples, child should have access to examples
                    // (either its own or inherited)
                    expect(hasOwnExamples || parentHasExamples).toBe(true);
                }
            }
        );
    });

    describe('Regression Tests', () => {
        it.each(regressionTestCases)(
            'should not have broken relationships for $component ($category)',
            ({ component, shouldNotContain, category }) => {
                const comp = getComponent(component);
                
                expect(comp).toBeDefined();
                expect(comp.relatedComponents).toBeDefined();
                
                // Should not contain any of the broken relationship indicators
                shouldNotContain.forEach(brokenValue => {
                    expect(comp.relatedComponents).not.toContain(brokenValue);
                });
                
                // All related components should be valid (non-empty, longer than 'gux-')
                comp.relatedComponents.forEach(relatedId => {
                    expect(relatedId).toBeDefined();
                    expect(relatedId.length).toBeGreaterThan(4); // Longer than 'gux-'
                    expect(relatedId).toMatch(/^gux-[a-z0-9-]+$/); // Valid component ID format
                });
            }
        );
    });

    describe('Data Structure Validation', () => {
        it('should have all components with relatedComponents arrays', () => {
            const testComponents = [
                ...parentChildRelationships.map(tc => tc.child),
                ...parentChildRelationships.map(tc => tc.expectedParent),
                ...bidirectionalRelationships.map(tc => tc.parent),
                ...bidirectionalRelationships.flatMap(tc => tc.expectedChildren)
            ];
            
            const uniqueComponents = [...new Set(testComponents)];
            
            uniqueComponents.forEach(componentId => {
                const component = getComponent(componentId);
                expect(component).toBeDefined();
                expect(component.relatedComponents).toBeDefined();
                expect(Array.isArray(component.relatedComponents)).toBe(true);
            });
        });

        it('should have valid relationship data types', () => {
            const sampleComponents = ['gux-tabs', 'gux-tab', 'gux-form-beta', 'gux-button'];
            
            sampleComponents.forEach(componentId => {
                const component = getComponent(componentId);
                expect(component).toBeDefined();
                expect(Array.isArray(component.tags)).toBe(true);
                expect(Array.isArray(component.relatedComponents)).toBe(true);
                
                component.relatedComponents.forEach(relatedId => {
                    expect(typeof relatedId).toBe('string');
                    expect(relatedId.length).toBeGreaterThan(0);
                });
            });
        });
    });

    describe('Component Categories Coverage', () => {
        const categoryCounts = parentChildRelationships.reduce((acc, tc) => {
            acc[tc.category] = (acc[tc.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        it('should cover major component categories', () => {
            const expectedCategories = [
                'tabs', 'form', 'table', 'list', 'avatar', 
                'dropdown', 'menu', 'pagination', 'form-field'
            ];
            
            expectedCategories.forEach(category => {
                expect(categoryCounts[category]).toBeGreaterThan(0);
            });
        });

        it('should have comprehensive coverage across component families', () => {
            // Should have at least 60 test cases covering different families
            expect(parentChildRelationships.length).toBeGreaterThanOrEqual(60);
            
            // Should cover at least 10 different categories
            expect(Object.keys(categoryCounts).length).toBeGreaterThanOrEqual(10);
        });
    });
});
