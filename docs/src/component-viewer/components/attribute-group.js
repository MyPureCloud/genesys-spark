import { toHTML } from '../../utils/to-html';
import COMPONENT_SPEC from '../../gux-components-spec.json';
import { checkboxAttribute } from './checkbox-attribute';
import { selectAttribute } from './select-attribute';
import { textAttribute } from './text-attribute';
import { jsonAttribute } from './json-attribute';

const handlers = {
  checkbox: checkboxAttribute,
  select: selectAttribute,
  text: textAttribute,
  json: jsonAttribute
};

export const createAttributeGroup = (parent, astNode, renderCallback) => {
  let type = astNode.nodeName;
  let element = toHTML(`
        <div class="attribute-group">
            <div class="title">${type}</div>
        </div>`);

  parent.appendChild(element);

  let attributes = COMPONENT_SPEC[type].attributes || [];
  attributes.forEach(attr => {
    let handler = handlers[attr.type];
    if (handler) {
      handler(attr, astNode, element, renderCallback);
    } else {
      console.error(
        'Found attribute type with no implemented renderer: ',
        attr
      );
    }
  });
};
