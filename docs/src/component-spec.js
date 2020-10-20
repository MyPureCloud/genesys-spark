import COMPONENT_SPEC from './components-spec.json';

export function getComponentSpec(name) {
  return COMPONENT_SPEC[name] || COMPONENT_SPEC[name.replace(/-beta$/, '')];
}
