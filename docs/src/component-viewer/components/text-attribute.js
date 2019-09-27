import { toHTML } from '../../utils/to-html';
import { debounce } from '../../utils/debounce';

export const textAttribute = (attr, astNode, parent, renderCallback) => {
  let matchingAttr = astNode.attrs.find(a => a.name === attr.name);
  let value = matchingAttr ? matchingAttr.value : '';

  let element = toHTML(`
    <label>
        <span>${attr.name}:</span>
        <input type="text" value="${value}" />
    </label>`);

  element.addEventListener(
    'input',
    debounce(event => {
      let value = event.target.value;
      if (matchingAttr) {
        matchingAttr.value = value;
      } else if (value) {
        astNode.attrs.push({ name: attr.name, value });
      } else {
        astNode.attrs = astNode.attrs.filter(a => a.name !== attr.name);
      }

      renderCallback();
    })
  );

  parent.appendChild(element);
};
