/**
 * Example Provider
 *
 * This module provides examples for Spark components.
 */

import componentRegistry from '../components/json-docs-registry';

// Types
interface Example {
  id: string;
  name: string;
  description: string;
  component: string;
  code: string;
  type: string;
  tags?: string[];
}

interface ExampleResponse {
  totalExamples: number;
  examples: Example[];
}

interface GetExamplesOptions {
  componentId: string;
  type?: string;
  limit?: number;
  tags?: string[];
}

/**
 * Get examples for a component
 * @param options - Options for getting examples
 * @returns Example response
 */
function getExamples({ componentId, type, limit = 10, tags = [] }: GetExamplesOptions): ExampleResponse {
  if (!componentId) {
    throw new Error('Component ID is required');
  }

  const component = componentRegistry.getComponent(componentId);

  if (!component) {
    throw new Error(`Component ${componentId} not found`);
  }

  let examples = componentRegistry.getComponentExamples({ componentId });

  if (type) {
    examples = examples.filter(example => example.type === type);
  }

  if (tags.length > 0) {
    examples = examples.filter(example =>
      example.tags && tags.some(tag => example.tags!.includes(tag))
    );
  }

  examples = examples.slice(0, limit);

  return {
    totalExamples: examples.length,
    examples: examples as Example[]
  };
}

export default {
  getExamples
};