import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldCheckboxGroupBeta } from '../gux-form-field-checkbox-group';

const components = [GuxFormFieldCheckboxGroupBeta];
const language = 'en';

describe('gux-form-field-checkbox-beta', () => {
  it('should build', async () => {
    const html = `
      <gux-form-field-checkbox-group-beta>
        <label slot="group-label">Food</label>
        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
      </gux-form-field-checkbox-group-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldCheckboxGroupBeta);
  });

  describe('#render', () => {
    [
      `
      <gux-form-field-checkbox-group-beta>
        <label slot="group-label">Food</label>
        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
      </gux-form-field-checkbox-group-beta>
     `,
      `
     <gux-form-field-checkbox-group-beta>
      <label slot="group-label">Food</label>
  
      <gux-form-field-checkbox>
        <input slot="input" type="checkbox" name="food-1" value="pizza" />
        <label slot="label">Pizza</label>
      </gux-form-field-checkbox>
  
      <gux-form-field-checkbox>
        <input
          slot="input"
          type="checkbox"
          name="food-1"
          value="sandwich"
          disabled
        />
        <label slot="label">Sandwich</label>
      </gux-form-field-checkbox>
  
      <gux-form-field-checkbox>
        <input slot="input" type="checkbox" name="food-1" value="spaghetti" />
        <label slot="label">Spaghetti</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-checkbox>
      <span slot="group-error">Subject to availibility</span>
    </gux-form-field-checkbox-group-beta>
     `,
      `<gux-form-field-checkbox-group-beta>
      <label slot="group-label">Food</label>
  
      <gux-form-field-checkbox>
        <input slot="input" type="checkbox" name="food-1" value="pizza" />
        <label slot="label">Pizza</label>
      </gux-form-field-checkbox>
  
      <gux-form-field-checkbox>
        <input
          slot="input"
          type="checkbox"
          name="food-1"
          value="sandwich"
          disabled
        />
        <label slot="label">Sandwich</label>
      </gux-form-field-checkbox>
  
      <gux-form-field-checkbox>
        <input slot="input" type="checkbox" name="food-1" value="sushi" />
        <label slot="label">Sushi</label>
        <span slot="error">Subject to availibility</span>
      </gux-form-field-checkbox>
  
      <gux-form-field-checkbox>
        <input slot="input" type="checkbox" name="food-1" value="spaghetti" />
        <label slot="label">Spaghetti</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-checkbox>
      <span slot="group-help">This is a group help message</span>
    </gux-form-field-checkbox-group-beta>`,

      ` <gux-form-field-checkbox-group-beta disabled>
        <label slot="group-label">Food</span>

        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1" value="pizza" />
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>

        <gux-form-field-checkbox>
          <input
            slot="input"
            type="checkbox"
            name="food-1"
            value="sandwich"
            disabled
          />
          <label slot="label">Sandwich</label>
        </gux-form-field-checkbox>

        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1" value="sushi" />
          <label slot="label">Sushi</label>
          <span slot="error">Subject to availibility</span>
        </gux-form-field-checkbox>

        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1" value="spaghetti" />
          <label slot="label">Spaghetti</label>
          <span slot="help">This is a help message</span>
        </gux-form-field-checkbox>
      </gux-form-field-checkbox-group-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
