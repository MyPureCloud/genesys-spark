import { toHTML } from '../../utils/to-html';

export const codeAttribute = (name, _, parent) => {
  const element = toHTML(`
    <gux-form-field-text-like label-position="above">
      <input slot="input" type="text" value="This value can only be set in the code editor "readonly/>
      <label slot="label">${name}:</label>
    </gux-form-field-text-like>`);

  parent.appendChild(element);
};
