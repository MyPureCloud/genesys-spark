import { toHTML } from '../../utils/to-html';
import { debounce } from '../../utils/debounce';

export const textAttribute = (name, astNode, parent, renderCallback) => {
  let matchingAttr = astNode.attrs.find(a => a.name === name);
  let value = matchingAttr ? matchingAttr.value : '';

  let element = toHTML(`
    <label>
        <span>${name}:</span>
        <input type="text" value="${value}" />
    </label>`);

  element.addEventListener(
    'input',
    debounce(event => {
      let value = event.target.value;
      if (matchingAttr) {
        matchingAttr.value = value;
      } else if (value) {
        astNode.attrs.push({ name: name, value });
      } else {
        astNode.attrs = astNode.attrs.filter(a => a.name !== name);
      }

      renderCallback();
    })
  );

  parent.appendChild(element);
};
