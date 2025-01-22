import { toHTML } from '../../utils/to-html';
import { debounce } from '../../utils/debounce';

export const textAttribute = (name, astNode, parent, renderCallback) => {
  const matchingAttr = astNode.attrs.find(a => a.name === name);
  const value = matchingAttr ? matchingAttr.value : '';

  const element = toHTML(`
    <gux-form-field-text-like label-position="above">
      <input slot="input" type="text" value="${value}" />
      <label slot="label">${name}:</label>
    </gux-form-field-text-like>`);

  element.addEventListener(
    'input',
    debounce(event => {
      const value = event.target.value;
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
