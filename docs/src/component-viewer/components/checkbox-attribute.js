import { toHTML } from '../../utils/to-html';

export const checkboxAttribute = (name, astNode, parent, renderCallback) => {
  let matchingAttr = astNode.attrs.find(a => a.name === name);

  let element = toHTML(`
    <gux-form-field>
      <input slot="input" type="checkbox" value="${name}"}>
      <label slot="label">${name}:</label>
    </gux-form-field>`);

  element.addEventListener('change', ({ target }) => {
    if (target.checked) {
      astNode.attrs.push({ name: name, value: '' });
    } else {
      astNode.attrs = astNode.attrs.filter(attr => attr.name !== name);
    }

    renderCallback();
  });

  parent.appendChild(element);
};
