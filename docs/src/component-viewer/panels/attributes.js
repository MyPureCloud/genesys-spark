import { getComponentSpec } from '../../component-spec.js';
import { createAttributeGroup } from '../components/attribute-group';
import { emptyElement } from '../../utils/empty-element.js';

export default class AttributesPanel {
  constructor(panel) {
    this.panel = panel;
    this.renderHook = () => {};
  }

  onChange(renderHook) {
    this.renderHook = renderHook;
  }

  updateFromTree(root) {
    this.panel = emptyElement(this.panel);

    let current;
    let queue = [root];

    while (queue.length > 0) {
      [current, ...queue] = queue;

      if (current.childNodes && current.childNodes.length > 0) {
        queue = [...current.childNodes, ...queue];
      }

      if (getComponentSpec(current.nodeName)) {
        createAttributeGroup(this.panel, current, () => this.renderHook(root));
      }
    }
  }
}
