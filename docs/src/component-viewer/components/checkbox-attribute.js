import { toHTML } from '../../utils/to-html';

export const checkboxAttribute = (name, astNode, parent, renderCallback) => {
  const matchingAttr = astNode.attrs.find(a => a.name === name);

  const randomHTMLId = prefix => {
    return `${prefix}-${Math.random().toString(36).substr(2, 10)}`;
  };

  const checkboxId = randomHTMLId('docs-checkbox');
  const isChecked =
    matchingAttr && matchingAttr.value === 'true' ? 'checked' : '';

  const element = toHTML(`
    <gux-form-field>
      <input slot="input" type="checkbox" value="${name}" id="${checkboxId}" ${isChecked}>
      <label slot="label" for="${checkboxId}">${name}:</label>
    </gux-form-field>`);

  element.addEventListener('change', ({ target }) => {
    if (target.checked) {
      astNode.attrs.push({ name: name, value: 'true' });
    } else {
      astNode.attrs = astNode.attrs.filter(attr => attr.name !== name);
    }

    renderCallback();
  });

  parent.appendChild(element);
};
