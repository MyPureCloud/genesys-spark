import { toHTML } from '../../utils/to-html';

export const selectAttribute = (
  values,
  name,
  astNode,
  parent,
  renderCallback
) => {
  const matchingAttr = astNode.attrs.find(a => a.name === name);
  const options = [
    { value: '', selected: false },
    ...values.map(value => ({ value, selected: false }))
  ];

  options.forEach(option => {
    if (matchingAttr) {
      if (matchingAttr.value === option.value) {
        option.selected = true;
      }
    } else {
      if (option.value === '') {
        option.selected = true;
      }
    }
  });

  const element = toHTML(`
    <gux-form-field-select label-position="above">
      <select slot="input" name="select">
        ${options.map(
          o => `
          <option value="${o.value}" ${o.selected ? 'selected' : ''}>${
            o.value
          }</option>
          `
        )}
      </select>
      <label slot="label">${name}:</label>
    </gux-form-field-select>`);

  element.addEventListener('change', function (event) {
    const selected = event.target.value;

    if (selected === '') {
      astNode.attrs = astNode.attrs.filter(a => a.name !== name);
    } else if (matchingAttr) {
      matchingAttr.value = selected;
    } else {
      astNode.attrs.push({ name: name, value: selected });
    }

    renderCallback();
  });

  parent.appendChild(element);
};
