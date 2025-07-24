import { FastMCP } from 'fastmcp';
import { z } from 'zod';

import componentRegistry from '../components/json-docs-registry';
import searchEngine from '../search/engine';
import exampleProvider from '../example-provider/index';

function extractAcceptedValues(type: string): string[] {
    const unionMatch = type.match(/"([^"]+)"/g);
    if (unionMatch) {
        return unionMatch.map(match => match.slice(1, -1));
    }
    return [];
}

function checkIfDeprecated(docsTags: any[]): boolean {
    return docsTags.some(tag => tag.name === 'deprecated');
}

/**
 * Create a FastMCP server instance
 * @param options - Server options
 * @returns FastMCP server instance
 */
export function createFastMCPServer(options: {
    name: string;
    description: string;
    version: string;
    port?: number;
    bind?: string;
}) {
    const server = new FastMCP({
        name: options.name,
        version: options.version as `${number}.${number}.${number}`,
    });

    registerTools(server);
    registerResources(server);

    return server;
}

/**
* Register tools with the FastMCP server
* @param server - FastMCP server instance
*/
function registerTools(server: FastMCP) {
    server.addTool({
        name: 'get_installation_instructions',
        description: 'Get installation instructions for genesys-spark components.',
        parameters: z.object({}),
        execute: async () => {
            return {
                type: 'text',
                text: setupInstructions
            };
        },
    });

    server.addTool({
        name: 'search_components',
        description: 'Search for Genesys Spark components with advanced options. Fuzzy search is enabled by default for better matching.',
        parameters: z.object({
            query: z.string().describe('Search query'),
            category: z.string().optional().describe('Component category'),
            tags: z.array(z.string()).optional().describe('Tags to filter by'),
            limit: z.number().optional().describe('Maximum number of results to return'),
            offset: z.number().optional().describe('Offset for pagination'),
            fuzzyMatch: z.boolean().optional().describe('Whether to use fuzzy matching (default: true)'),
            fuzzyThreshold: z.number().optional().describe('Threshold for fuzzy matching 0-1 (default: 0.5)'),
            filters: z.record(z.any()).optional().describe('Additional filters'),
            sortBy: z.string().optional().describe('Field to sort by'),
            sortOrder: z.string().optional().describe('Sort order (asc or desc)'),
        }),
        execute: async (args) => {
            const {
                query,
                category,
                tags,
                limit,
                offset,
                fuzzyMatch,
                fuzzyThreshold,
                filters,
                sortBy,
                sortOrder
            } = args;

            const searchResult = searchEngine.searchComponents({
                query,
                category,
                tags,
                limit,
                offset,
                fuzzyMatch: fuzzyMatch ?? true, // Enable fuzzy search by default
                fuzzyThreshold: fuzzyThreshold ?? 0.5, // Default fuzzy threshold (lowered for better matching)
                filters,
                sortBy,
                sortOrder: sortOrder as "asc" | "desc" | undefined
            });

            return {
                type: 'text',
                text: JSON.stringify({
                    results: searchResult.results.map(result => ({
                        componentId: result.id,
                        name: result.name,
                        category: result.category,
                        description: result.description,
                        relevance: result.relevance,
                        matchedFields: result.matchedFields,
                        tags: result.tags,
                        version: result.version,
                        isExperimental: result.isExperimental,
                    })),
                    totalResults: searchResult.totalResults,
                    query: searchResult.query,
                    category: searchResult.category,
                    tags: searchResult.tags,
                    limit: searchResult.limit,
                    offset: searchResult.offset
                })
            };
        },
    });

    server.addTool({
        name: 'get_component_details',
        description: 'Get detailed information about a component',
        parameters: z.object({
            componentId: z.string().describe('Component ID'),
            includeExamples: z.boolean().optional().describe('Whether to include examples'),
            includeRelatedComponents: z.boolean().optional().describe('Whether to include related components'),
            includeProperties: z.boolean().optional().describe('Whether to include properties'),
            includeEvents: z.boolean().optional().describe('Whether to include events'),
            includeMethods: z.boolean().optional().describe('Whether to include methods'),
            includeSlots: z.boolean().optional().describe('Whether to include slots'),
        }),
        execute: async (args) => {
            const {
                componentId,
                includeExamples = true,
                includeRelatedComponents = true,
                includeProperties = true,
                includeEvents = true,
                includeMethods = true,
                includeSlots = true
            } = args;

            const component = componentRegistry.getComponent(componentId);

            if (!component) {
                throw new Error(`Component ${componentId} not found`);
            }

            const componentDetails: any = {
                id: component.id,
                name: component.name,
                category: component.category,
                description: component.description,
                version: component.version,
                isExperimental: component.isExperimental,
                tags: component.tags,
            };

            componentDetails.typeScript = {
                mainDefinitions: "node_modules/genesys-spark-components/dist/types/components.d.ts",
                componentSpecific: `node_modules/genesys-spark-components/${component.dtsPath}`,
                reactWrapper: "node_modules/genesys-spark-components-react/dist/index.d.ts",
                guidance: {
                    eventTypes: "Look for event interfaces in the component-specific .d.ts file",
                    reactProps: "React event handlers follow the pattern: on{EventName} where EventName is PascalCase"
                }
            };

            if (includeRelatedComponents) {
                componentDetails.relatedComponents = (component.relatedComponents || []).map(id => {
                    const relatedComponent = componentRegistry.getComponent(id);
                    return {
                        id,
                        name: relatedComponent ? relatedComponent.name : id,
                        category: relatedComponent ? relatedComponent.category : null,
                        description: relatedComponent ? relatedComponent.description : null,
                    };
                });
            }

            if (includeProperties) {
                componentDetails.properties = component.props.map(prop => ({
                    name: prop.name,
                    type: prop.type,
                    description: prop.docs,
                    defaultValue: prop.default,
                    required: prop.required,
                    acceptedValues: extractAcceptedValues(prop.type),
                    isDeprecated: checkIfDeprecated(prop.docsTags),
                }));
            }

            if (includeEvents) {
                componentDetails.events = component.events.map(event => ({
                    name: event.event,
                    description: event.docs,
                    cancelable: event.cancelable,
                    detailType: event.detail,
                }));
            }

            if (includeMethods) {
                componentDetails.methods = component.methods.map(method => ({
                    name: method.name,
                    description: method.docs,
                    returnType: method.returns?.type || 'void',
                }));
            }

            if (includeSlots) {
                componentDetails.slots = component.slots.map(slot => ({
                    name: slot.name,
                    description: slot.docs,
                }));
            }

            if (includeExamples) {
                componentDetails.examples = componentRegistry.getComponentExamples({
                    componentId,
                    limit: 5,
                }).map(example => ({
                    id: example.id,
                    name: example.name,
                    description: example.description,
                    type: example.type,
                }));
            }

            // Format the response as a TextContent object
            return {
                type: 'text',
                text: JSON.stringify(componentDetails, null, 2)
            };
        },
    });

    server.addTool({
        name: 'get_component_examples',
        description: 'Get usage examples for a specific component, or a specific example by ID',
        parameters: z.object({
            componentId: z.string().describe('Component ID'),
            exampleId: z.string().optional().describe('Specific example ID to retrieve (format: componentId-exampleName)'),
            type: z.string().optional().describe('Example type (ignored if exampleId is provided)'),
            limit: z.number().optional().describe('Maximum number of examples to return (ignored if exampleId is provided)'),
            tags: z.array(z.string()).optional().describe('Tags to filter by (ignored if exampleId is provided)'),
        }),
        execute: async (args) => {
            const {
                componentId,
                exampleId,
                type,
                limit = 5,
                tags = []
            } = args;

            if (exampleId) {
                const example = componentRegistry.getExampleById(exampleId);

                if (!example) {
                    throw new Error(`Example ${exampleId} not found`);
                }

                if (example.component !== componentId) {
                    throw new Error(`Example ${exampleId} does not belong to component ${componentId}`);
                }

                return {
                    type: 'text',
                    text: JSON.stringify({
                        requestType: 'single_example',
                        componentId,
                        exampleId,
                        example: {
                            id: example.id,
                            name: example.name,
                            description: example.description,
                            component: example.component,
                            type: example.type,
                            tags: example.tags,
                            code: example.code
                        }
                    }, null, 2)
                };
            }

            const examplesResponse = exampleProvider.getExamples({
                componentId,
                type,
                limit,
                tags
            });

            return {
                type: 'text',
                text: JSON.stringify({
                    requestType: 'multiple_examples',
                    componentId,
                    filters: { type, limit, tags },
                    totalResults: examplesResponse.totalExamples,
                    examples: examplesResponse.examples.map((example: any) => ({
                        id: example.id,
                        name: example.name,
                        description: example.description,
                        type: example.type,
                        tags: example.tags,
                        code: example.code && example.code.length > 10000 ? example.code.substring(0, 10000) + '...' : example.code
                    }))
                }, null, 2)
            };
        },
    });

    server.addTool({
        name: 'get_example_code',
        description: 'Get the full code for a specific example',
        parameters: z.object({
            exampleId: z.string().describe('Example ID (format: componentId-exampleName)'),
        }),
        execute: async (args) => {
            const { exampleId } = args;

            const example = componentRegistry.getExampleById(exampleId);

            if (!example) {
                throw new Error(`Example ${exampleId} not found`);
            }

            return {
                type: 'text',
                text: JSON.stringify({
                    id: example.id,
                    name: example.name,
                    description: example.description,
                    component: example.component,
                    type: example.type,
                    tags: example.tags,
                    code: example.code
                }, null, 2)
            };
        },
    });

    server.addTool({
        name: 'get_component_usage',
        description: 'Get usage guidelines for a component with optional section filtering',
        parameters: z.object({
            componentId: z.string().describe('Component ID'),
            section: z.string().optional().describe('Specific section to extract (e.g., "General guidelines", "Features")'),
            format: z.enum(['markdown', 'text', 'json']).optional().describe('Output format (default: markdown)'),
        }),
        execute: async (args) => {
            const { componentId, section, format = 'markdown' } = args;

            const usageContent = componentRegistry.getComponentUsage(componentId);

            if (!usageContent) {
                throw new Error(`Usage guidelines for component ${componentId} not found`);
            }

            let content = usageContent;

            if (section) {
                const lines = usageContent.split('\n');
                const sectionStart = lines.findIndex(line =>
                    line.toLowerCase().includes(section.toLowerCase()) &&
                    (line.startsWith('##') || line.startsWith('###'))
                );

                if (sectionStart === -1) {
                    throw new Error(`Section "${section}" not found in usage guidelines for ${componentId}`);
                }

                let sectionEnd = lines.length;
                for (let i = sectionStart + 1; i < lines.length; i++) {
                    if (lines[i].startsWith('## ')) {
                        sectionEnd = i;
                        break;
                    }
                }

                content = lines.slice(sectionStart, sectionEnd).join('\n').trim();
            }

            let formattedContent = content;
            if (format === 'text') {
                formattedContent = content
                    .replace(/#{1,6}\s+/g, '') // Remove headers
                    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
                    .replace(/(?<!\s)\*([^*\n]+)\*(?!\s)/g, '$1') // Remove italic (single asterisks not preceded/followed by whitespace)
                    .replace(/`(.*?)`/g, '$1') // Remove inline code
                    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
                    .replace(/^\s*\*\s+/gm, '• ') // Convert markdown bullets to unicode bullets
                    .trim();
            } else if (format === 'json') {
                // Parse into structured format
                const parsedSections = parseMarkdownSections(content);
                formattedContent = JSON.stringify({
                    componentId,
                    requestedSection: section,
                    sections: parsedSections
                }, null, 2);
            }

            return {
                type: 'text',
                text: format === 'json' ? formattedContent : formattedContent
            };
        },
    });

    server.addTool({
        name: 'get_link_resource',
        description: 'Resolve links from usage.md files to appropriate backend resources',
        parameters: z.object({
            link: z.string().describe('The link to resolve (e.g., "/components/button/?example=primary-button")'),
        }),
        execute: async (args) => {
            const { link } = args;

            if (link.toLowerCase() === "genesys-spark://frontend-code-setup") {
                return {
                    type: 'text',
                    text: setupInstructions
                }
            }

            const linkResult = parseLinkToResource(link);

            if (!linkResult.success) {
                throw new Error(`Unable to resolve link: ${link}. ${linkResult.error}`);
            }

            switch (linkResult.type) {
                case 'component_example':
                    if (!linkResult.exampleId) {
                        throw new Error('Example ID is required for component_example type');
                    }
                    const example = componentRegistry.getExampleById(linkResult.exampleId);
                    if (!example) {
                        throw new Error(`Example ${linkResult.exampleId} not found`);
                    }
                    return {
                        type: 'text',
                        text: JSON.stringify({
                            linkType: 'component_example',
                            originalLink: link,
                            resolvedTo: {
                                componentId: linkResult.componentId,
                                exampleId: linkResult.exampleId,
                                tabId: linkResult.tabId,
                                example: {
                                    id: example.id,
                                    name: example.name,
                                    description: example.description,
                                    component: example.component,
                                    type: example.type,
                                    tags: example.tags,
                                    code: example.code
                                }
                            }
                        }, null, 2)
                    };

                case 'component_details':
                    if (!linkResult.componentId) {
                        throw new Error('Component ID is required for component_details type');
                    }
                    const component = componentRegistry.getComponent(linkResult.componentId);
                    if (!component) {
                        throw new Error(`Component ${linkResult.componentId} not found`);
                    }

                    let componentData: any = {
                        id: component.id,
                        name: component.name,
                        category: component.category,
                        description: component.description,
                        version: component.version,
                        isExperimental: component.isExperimental,
                        tags: component.tags,
                    };

                    if (linkResult.tabId === 'api' || !linkResult.tabId) {
                        componentData.properties = component.props.map(prop => ({
                            name: prop.name,
                            type: prop.type,
                            description: prop.docs,
                            defaultValue: prop.default,
                            required: prop.required,
                            acceptedValues: extractAcceptedValues(prop.type),
                            isDeprecated: checkIfDeprecated(prop.docsTags),
                        }));
                    }

                    if (linkResult.tabId === 'usage' || !linkResult.tabId) {
                        const usageContent = componentRegistry.getComponentUsage(linkResult.componentId);
                        if (usageContent) {
                            componentData.usage = usageContent;
                        }
                    }

                    return {
                        type: 'text',
                        text: JSON.stringify({
                            linkType: 'component_details',
                            originalLink: link,
                            resolvedTo: {
                                componentId: linkResult.componentId,
                                tabId: linkResult.tabId,
                                component: componentData
                            }
                        }, null, 2)
                    };

                case 'foundation':
                    return {
                        type: 'text',
                        text: JSON.stringify({
                            linkType: 'foundation',
                            originalLink: link,
                            resolvedTo: {
                                topic: linkResult.topic,
                                category: linkResult.category,
                                message: `Foundation resource for ${linkResult.category}/${linkResult.topic}`,
                                note: 'Foundation resources are informational references to design principles and guidelines'
                            }
                        }, null, 2)
                    };

                case 'external':
                    return {
                        type: 'text',
                        text: JSON.stringify({
                            linkType: 'external',
                            originalLink: link,
                            resolvedTo: {
                                url: linkResult.url,
                                message: 'External link - no backend resource available',
                                note: 'This is an external reference that should be accessed directly'
                            }
                        }, null, 2)
                    };

                default:
                    throw new Error(`Unsupported link type: ${linkResult.type}`);
            }
        },
    });
}

const setupInstructions = `
    Getting Started
    Installation
    Use your package manager of choice to install the package in your project.

    npm install genesys-spark genesys-spark-components

    Localization
    To ensure components are localized correctly, use the lang attribute to set the language of your page. Components will respect the language of their closest ancestor with a recognized lang attribute.

    Loading the components
    When initializing your app/page, call registerSparkComponents, which will inject the script and style tags into your page that define the main Spark custom elements:

    import { registerSparkComponents } from 'genesys-spark';

    // It's not _required_ to await component loading, but it can help prevent a flash
    // of unstyled content.
    await registerSparkComponents();
    Loading the chart components
    When initializing your app/page, call registerSparkChartComponents, which will inject the script and style tags into your page that define the chart related Spark custom elements:

    import { registerSparkChartComponents } from 'genesys-spark';

    // It's not _required_ to await component loading, but it can help prevent a flash
    // of unstyled content.
    await registerSparkChartComponents();
    Font Loading
    While registerSparkComponents() and registerSparkChartComponents() will add the required web fonts to your page if they are not already present, it is recommended that you link stylesheets to load the Urbanist and Noto Sans fonts in your document prior to starting your app. This will improve loading performance and prevent a jarring font transition when the required fonts load.


    Typescript support:
    To make Typescript recognize spark components and let you add spark components to tsx files with type support you need to add few lines of code during the project setup phase.
    Augment the JSX.IntrinsicElements interface with the spark IntrinsicElements interface.

    \`\`\`
        import { JSX as GuxJSX } from 'genesys-spark-components';
        import { DetailedHTMLProps, HTMLAttributes } from 'react';

        type StencilProps<T> = {
            [P in keyof T]?: Omit<T[P], 'ref'>;
        };

        type ReactProps<T> = {
            [P in keyof T]?: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>;
        };

        type StencilToReact<T = GuxJSX.IntrinsicElements, U = HTMLElementTagNameMap> = StencilProps<T> & ReactProps<U>;

        // augments the JSX namespace of react with add spark web components
        declare module 'react' {
            namespace JSX {
                // merge all of Stencil's IntrinsicElements into React's
                interface IntrinsicElements extends StencilToReact {}
            }
        }
    \`\`\`
    Once adding the type declaration above, make sure you set typescript to include the added type declarations. In the project's tsconfig file make sure the new declaration is included in the "include" array.
    e.g. if the file name that added the new declaration is gux-types.d.ts in the src/types folder then make sure this file is added to the "include" array.


    React 19 and onward web component support:
    React 19 added full support for web components. For spark components it means that it's not required to use the react wrapper of spark components to use spark components in a React project.
    In the jsx/tsx files use the web components as-is without the wrapper package. Add the module augmentation code above to typescript projects.
`

/**
 * Register resources with the FastMCP server
 * @param server - FastMCP server instance
 */
function registerResources(server: FastMCP) {
    server.addResource({
        uri: 'genesys-spark://frontend-code-setup',
        name: 'Frontend Code Setup Instructions',
        mimeType: "text/plain",
        async load() {
            return {
                text: setupInstructions
            };
        },
    })
}

function parseLinkToResource(link: string): {
    success: boolean;
    type?: string;
    componentId?: string;
    exampleId?: string;
    tabId?: string;
    topic?: string;
    category?: string;
    url?: string;
    error?: string;
} {
    try {
        // Handle external links
        if (link.startsWith('http://') || link.startsWith('https://')) {
            return {
                success: true,
                type: 'external',
                url: link
            };
        }

        // Remove leading slash if present
        const cleanLink = link.startsWith('/') ? link.substring(1) : link;

        // Parse component links: components/{component-name}/?param=value
        const componentMatch = cleanLink.match(/^components\/([^/?]+)(?:\/)?(?:\?(.+))?$/);
        if (componentMatch) {
            const componentId = componentMatch[1];
            const queryString = componentMatch[2];

            let tabId: string | undefined;
            let exampleName: string | undefined;

            // Parse query parameters
            if (queryString) {
                const params = new URLSearchParams(queryString);
                tabId = params.get('tabId') || undefined;
                exampleName = params.get('example') || undefined;
            }

            // If example is specified, return component_example type
            if (exampleName) {
                const exampleId = `${componentId}-${exampleName.replace(/_/g, '-')}`;
                return {
                    success: true,
                    type: 'component_example',
                    componentId,
                    exampleId,
                    tabId
                };
            }

            // Otherwise return component_details type
            return {
                success: true,
                type: 'component_details',
                componentId,
                tabId
            };
        }



        // Parse foundation links: foundation/{category}/{topic}/
        const foundationMatch = cleanLink.match(/^foundation\/([^/]+)\/([^/#]+)(?:\/)?(?:#(.+))?$/);
        if (foundationMatch) {
            const [, category, topic, anchor] = foundationMatch;

            return {
                success: true,
                type: 'foundation',
                category,
                topic: anchor ? `${topic}#${anchor}` : topic
            };
        }

        const exampleMatch = cleanLink.match(/^examples\/([^/]+)\/([^.]+)\.html$/);
        if (exampleMatch) {
            return {
                success: true,
                type: 'external',
                url: link
            };
        }

        return {
            success: false,
            error: `Unrecognized link pattern: ${link}`
        };

    } catch (error) {
        return {
            success: false,
            error: `Error parsing link: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}

/**
 * Parse markdown content into structured sections
 * @param content - Markdown content
 * @returns Parsed sections
 */
function parseMarkdownSections(content: string): Array<{ title: string; level: number; content: string }> {
    const lines = content.split('\n');
    const sections: Array<{ title: string; level: number; content: string }> = [];
    let currentSection: { title: string; level: number; content: string } | null = null;

    lines.forEach(line => {
        const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);

        if (headerMatch) {
            if (currentSection) {
                sections.push(currentSection);
            }

            currentSection = {
                title: headerMatch[2],
                level: headerMatch[1].length,
                content: ''
            };
        } else if (currentSection) {
            currentSection.content += (currentSection.content ? '\n' : '') + line;
        }
    });

    if (currentSection) {
        sections.push(currentSection);
    }

    return sections.map(section => ({
        ...section,
        content: section.content.trim()
    }));
}
