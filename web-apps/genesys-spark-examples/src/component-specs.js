import COMPONENT_SPECS from 'genesys-spark-components/dist/component-specs.json';

export const componentSpecs = COMPONENT_SPECS;

export function getComponentSpec(tag) {
  return COMPONENT_SPECS[tag] || COMPONENT_SPECS[tag.replace(/-beta$/, '')];
}
