import { JsonDocs, JsonDocsComponent } from '@stencil/core/internal';
import jsonDocsImport from '../data/json-docs.json';

interface ExtendedJsonDocsComponent extends JsonDocsComponent {
  "parentComponent": string | null,
  "relatedComponents": string[],
  "usageReference": string
}

interface ExtendedJsonDocs extends JsonDocs {
  components: ExtendedJsonDocsComponent[];
  sourceMetadata?: SourceMetadata;
  usageReferences?: Record<string, UsageReference>;
}

interface UsageReference {
  type: 'reference' | 'parentReference';
  note?: string;
  generatedUsage?: GeneratedUsage;
}

type UsageReferences = Record<string, UsageReference>

const jsonDocs = jsonDocsImport as unknown as ExtendedJsonDocs;
const { usageReferences, sourceMetadata, components } = jsonDocs;

export const allComponents = (() => {
  const componentVersion = sourceMetadata.version;
  const convertedComponents: Record<string, ComponentMetadata> = {};

  components.forEach(jsonComponent => {
    const componentMetadata = convertJsonDocsComponent(jsonComponent, usageReferences, componentVersion);
    convertedComponents[componentMetadata.id] = componentMetadata;
  });

  return convertedComponents;
})();

interface GeneratedUsage {
    overview: string;
    import?: string;
    examples: UsageExample[];
}

interface UsageExample {
    title: string;
    description?: string;
    code: string;
}

interface SourceMetadata {
    package: string;
    version: string;
    description: string;
}

interface ComponentMetadata extends ExtendedJsonDocsComponent {
    category: string;
    version: string;
    isExperimental: boolean;
    componentCategory: 'stable' | 'beta' | 'legacy';
    tags: string[];
    dtsPath: string;
    examples: string[];

    id: string;
    name: string;
    description: string;
}

interface ExampleMetadata {
    id: string;
    name: string;
    description: string;
    component: string;
    code: string;
    type: string;
    tags: string[];
}

function calculateDtsPath(filePath: string): string {
    return filePath
        .replace(/^src\//, 'dist/types/')
        .replace(/\.tsx$/, '.d.ts');
}

function convertJsonDocsComponent(jsonComponent: ExtendedJsonDocsComponent, usageReferences: UsageReferences, version?: string): ComponentMetadata {
    const componentId = jsonComponent.tag;
    const usageKey = `${componentId}-usage`;
    const usageReference = usageReferences?.[usageKey];
    const hasUsageContent = usageReference?.generatedUsage && usageReference.generatedUsage.examples.length > 0;

  return {
      ...jsonComponent,
      id: componentId,
      name: jsonComponent.tag,
      category: determineCategory(componentId),
      description: extractDescription(jsonComponent.readme),
      version: version || '0.0.1',
      isExperimental: componentId.includes('-beta'),
      componentCategory: determineComponentCategory(componentId),
      relatedComponents: (jsonComponent as any).relatedComponents || jsonComponent.dependencies,
      tags: determineTags(componentId, jsonComponent),
      dtsPath: calculateDtsPath(jsonComponent.filePath),
      examples: hasUsageContent ? [`${componentId}-usage-guide`] : []
    };
}

function extractDescription(readme: string): string {
    const lines = readme.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('<!--')) {
            return trimmed;
        }
    }
    return '';
}

function determineCategory(componentId: string): string {
    if (componentId.includes('button')) return 'Actions';
    if (componentId.includes('dropdown') || componentId.includes('select')) return 'Form Controls';
    if (componentId.includes('tooltip') || componentId.includes('popover')) return 'Overlays';
    if (componentId.includes('tab') || componentId.includes('accordion')) return 'Navigation';
    if (componentId.includes('table') || componentId.includes('list')) return 'Data Display';
    if (componentId.includes('form') || componentId.includes('input')) return 'Form Controls';
    if (componentId.includes('modal') || componentId.includes('dialog')) return 'Overlays';
    if (componentId.includes('badge') || componentId.includes('tag') || componentId.includes('icon')) return 'Indicators';
    if (componentId.includes('beta')) return 'Beta';
    if (componentId.includes('legacy')) return 'Legacy';
    return 'General';
}

function determineTags(componentId: string, jsonComponent: ExtendedJsonDocsComponent): string[] {
    const tags = [];

    if (componentId.includes('-beta')) tags.push('beta');
    if (componentId.includes('-legacy')) tags.push('legacy');
    if (jsonComponent.props.some(p => p.name === 'disabled')) tags.push('interactive');
    if (jsonComponent.events.length > 0) tags.push('event-emitter');
    if (jsonComponent.slots.length > 0) tags.push('slottable');

    return tags;
}

function determineComponentCategory(componentId: string): 'stable' | 'beta' | 'legacy' {
    if (componentId.includes('-beta')) {
        return 'beta';
    }
    if (componentId.includes('-legacy')) {
        return 'legacy';
    }
    return 'stable';
}

/**
 * Resolve a usage reference to get actual usage content
 */
function resolveUsageReference(usageReference: UsageReference): string | null {
    if (!usageReference.generatedUsage) {
        return null;
    }

    const usage = usageReference.generatedUsage;
    let content = `# ${usage.overview}\n\n`;

    // Add an import section (programmatically added to avoid JSON duplication)
    const sparkImport = `import { registerSparkComponents } from 'genesys-spark';\nregisterSparkComponents();`;
    content += `## Import\n\n\`\`\`javascript\n${sparkImport}\n\`\`\`\n\n`;

    // Add examples
    if (usage.examples && usage.examples.length > 0) {
        content += `## Examples\n\n`;
        usage.examples.forEach((example) => {
            content += `### ${example.title}\n\n`;
            content += `\`\`\`html\n${example.code}\n\`\`\`\n\n`;
        });
    }

    // Add reference note if this is a parent reference
    if (usageReference.type === 'parentReference' && usageReference.note) {
        content += `## Note\n\n${usageReference.note}\n\n`;
    }

    return content;
}

/**
 * Generate markdown content from generated usage data
 */
function generateMarkdownFromUsage(generatedUsage: GeneratedUsage, componentMetadata: ComponentMetadata): string {
    let content = `# ${componentMetadata.name}\n\n`;

    // Add component description if available
    if (componentMetadata.description) {
        content += `${componentMetadata.description}\n\n`;
    }

    // Add import section (programmatically added to avoid JSON duplication)
    const sparkImport = `import { registerSparkComponents } from 'genesys-spark';\nregisterSparkComponents();`;
    content += `## Import\n\n\`\`\`javascript\n${sparkImport}\n\`\`\`\n\n`;

    // Add examples
    if (generatedUsage.examples && generatedUsage.examples.length > 0) {
        content += `## Examples\n\n`;
        generatedUsage.examples.forEach((example) => {
            content += `### ${example.title}\n\n`;
            content += `\`\`\`html\n${example.code}\n\`\`\`\n\n`;
        });
    }

    return content;
}

export function getComponent(componentId: string): ComponentMetadata | undefined {
    return allComponents[componentId];
}

export function getComponentExamples(options: {
    componentId?: string;
    category?: string;
    tags?: string[];
    language?: string;
    limit?: number;
    offset?: number;
}): ExampleMetadata[] {
    const componentVersion = jsonDocs.sourceMetadata?.version;
    let examples: ExampleMetadata[] = [];

    if (jsonDocs.usageReferences) {
        for (const [usageKey, usageReference] of Object.entries(jsonDocs.usageReferences)) {
            if (usageReference.generatedUsage) {
                const componentId = usageKey.replace('-usage', '');
                const component = jsonDocs.components.find(comp => comp.tag === componentId);

                if (component) {
                    const componentMetadata = convertJsonDocsComponent(component, jsonDocs.usageReferences, componentVersion);
                    const exampleId = `${componentId}-usage-guide`;

                    examples.push({
                        id: exampleId,
                        name: `${componentMetadata.name} Usage Guide`,
                        description: `Complete usage guide and examples for ${componentMetadata.name}`,
                        component: componentId,
                        code: generateMarkdownFromUsage(usageReference.generatedUsage, componentMetadata),
                        type: 'markdown',
                        tags: ['usage', 'guide', 'complete']
                    });
                }
            }
        }
    }

    if (options.componentId) {
        examples = examples.filter(example => example.component === options.componentId);
    }

    if (options.tags && options.tags.length > 0) {
        examples = examples.filter(example =>
            example.tags && options.tags!.some(tag => example.tags!.includes(tag))
        );
    }

    if (options.offset) {
        examples = examples.slice(options.offset);
    }

    if (options.limit) {
        examples = examples.slice(0, options.limit);
    }

    return examples;
}

export function getExampleById(exampleId: string): ExampleMetadata | undefined {
    const componentId = exampleId.replace('-usage-guide', '');
    const examples = getComponentExamples({ componentId });
    return examples.find(example => example.id === exampleId);
}

export function getComponentUsage(componentId: string): string | undefined {
    const usageKey = `${componentId}-usage`;
    const usageReference = usageReferences[usageKey];

    if (usageReference) {
        return resolveUsageReference(usageReference);
    }

    return undefined;
}

export default {
    getComponent,
    getComponentExamples,
    getExampleById,
    getComponentUsage
};