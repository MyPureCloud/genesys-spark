import { toHTML } from '../../utils/to-html';
import COMPONENT_SPEC from '../../gux-components-spec.json';
import { checkboxAttribute } from './checkbox-attribute';
import { selectAttribute } from './select-attribute';
import { textAttribute } from './text-attribute';
import { jsonAttribute } from './json-attribute';

export const createAttributeGroup = (parent, astNode, renderCallback) => {
  let elementName = astNode.nodeName;
  let element = toHTML(`
        <div class="attribute-group">
            <div class="title">${elementName}</div>
        </div>`);

  parent.appendChild(element);

  let attributes = COMPONENT_SPEC[elementName].attributes || [];
  Object.entries(attributes).forEach(([name, type]) => {
    let handler = handlerFor(type);
    if (handler) {
      handler(name, astNode, element, renderCallback);
    } else {
      console.error(
        'Found attribute type with no implemented renderer: ',
        name
      );
    }
  });
};

function handlerFor(type) {
  if (type instanceof Array) {
    return selectAttribute.bind(null, type);
  } else if (type == 'text') {
    return textAttribute;
  } else if (type == 'checkbox') {
    return checkboxAttribute;
  } else if (type == 'json') {
    //TODO: delete when not needed
    return jsonAttribute;
  }
}
