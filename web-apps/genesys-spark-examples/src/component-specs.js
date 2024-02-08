import COMPONENT_SPECS from 'genesys-spark-components/build/component-specs/component-specs.json';
import CHART_COMPONENT_SPECS from 'genesys-spark-chart-components/build/component-specs/component-specs.json';

export const componentSpecs = Object.assign(
  COMPONENT_SPECS,
  CHART_COMPONENT_SPECS
);

export function getComponentSpec(tag) {
  return COMPONENT_SPECS[tag] || COMPONENT_SPECS[tag.replace(/-beta$/, '')];
}
