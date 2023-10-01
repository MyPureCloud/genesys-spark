import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldCheckbox } from '../gux-form-field-checkbox';

const components = [GuxFormFieldCheckbox];
const language = 'en';

describe('gux-form-field-checkbox', () => {
  it('should build', async () => {
    const html = `
      <gux-form-field-checkbox>
        <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
        <label slot="label">Pizza</label>
      </gux-form-field-checkbox>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldCheckbox);
  });

  describe('#render', () => {
    [
      `
        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
      `,
      `
        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza" disabled/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
      `,
      `
        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
          <label slot="label">Pizza</label>
          <span slot="error">This is an error message</span>
        </gux-form-field-checkbox>
      `,
      `
        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza" checked/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
      `,
      `
        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
          <label slot="label">Pizza</label>
          <span slot="error">Error message</span>
        </gux-form-field-checkbox>
      `,
      `
      <gux-form-field-checkbox>
        <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
        <label slot="label">Pizza</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-checkbox>
    `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
