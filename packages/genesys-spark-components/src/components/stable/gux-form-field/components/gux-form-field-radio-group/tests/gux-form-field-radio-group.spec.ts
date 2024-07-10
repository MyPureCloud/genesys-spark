import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldRadioGroupBeta } from '../gux-form-field-radio-group';

const components = [GuxFormFieldRadioGroupBeta];
const language = 'en';

describe('gux-form-field-radio-beta', () => {
  it('should build', async () => {
    const html = `
      <gux-form-field-radio-group-beta>
        <label slot="group-label">Food</label>
        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
      </gux-form-field-radio-group-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldRadioGroupBeta);
  });

  describe('#render', () => {
    [
      `
      <gux-form-field-radio-group-beta>
        <label slot="group-label">Food</label>
        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
      </gux-form-field-radio-group-beta>
     `,
      `
     <gux-form-field-radio-group-beta>
      <label slot="group-label">Food</label>
  
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pizza" />
        <label slot="label">Pizza</label>
      </gux-form-field-radio>
  
      <gux-form-field-radio>
        <input
          slot="input"
          type="radio"
          name="food-1"
          value="sandwich"
          disabled
        />
        <label slot="label">Sandwich</label>
      </gux-form-field-radio>
  
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="spaghetti" />
        <label slot="label">Spaghetti</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-radio>
      <span slot="group-error">Subject to availibility</span>
    </gux-form-field-radio-group-beta>
     `,
      `<gux-form-field-radio-group-beta>
      <label slot="group-label">Food</label>
  
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pizza" />
        <label slot="label">Pizza</label>
      </gux-form-field-radio>
  
      <gux-form-field-radio>
        <input
          slot="input"
          type="radio"
          name="food-1"
          value="sandwich"
          disabled
        />
        <label slot="label">Sandwich</label>
      </gux-form-field-radio>
  
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="sushi" />
        <label slot="label">Sushi</label>
        <span slot="error">Subject to availibility</span>
      </gux-form-field-radio>
  
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="spaghetti" />
        <label slot="label">Spaghetti</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-radio>
      <span slot="group-help">This is a group help message</span>
    </gux-form-field-radio-group-beta>`,

      ` <gux-form-field-radio-group-beta disabled>
        <label slot="group-label">Food</label>

        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza" />
          <label slot="label">Pizza</label>
        </gux-form-field-radio>

        <gux-form-field-radio>
          <input
            slot="input"
            type="radio"
            name="food-1"
            value="sandwich"
            disabled
          />
          <label slot="label">Sandwich</label>
        </gux-form-field-radio>

        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="sushi" />
          <label slot="label">Sushi</label>
          <span slot="error">Subject to availibility</span>
        </gux-form-field-radio>

        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="spaghetti" />
          <label slot="label">Spaghetti</label>
          <span slot="help">This is a help message</span>
        </gux-form-field-radio>
      </gux-form-field-radio-group-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
