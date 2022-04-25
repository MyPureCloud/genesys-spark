import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxFormFieldCheckbox } from '../gux-form-field-checkbox';

const components = [GuxFormFieldCheckbox];
const language = 'en';

describe('gux-form-field-checkbox-beta', () => {
  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });

  it('should build', async () => {
    const html = `
      <gux-form-field-checkbox-beta>
        <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
        <label slot="label">Pizza</label>
      </gux-form-field-checkbox-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldCheckbox);
  });

  describe('#render', () => {
    [
      `
        <gux-form-field-checkbox-beta>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox-beta>
      `,
      `
        <gux-form-field-checkbox-beta>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza" disabled/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox-beta>
      `,
      `
        <gux-form-field-checkbox-beta>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
          <label slot="label">Pizza</label>
          <span slot="error">This is an error message</span>
        </gux-form-field-checkbox-beta>
      `,
      `
        <gux-form-field-checkbox-beta>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza" checked/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox-beta>
      `,
      `
        <gux-form-field-checkbox-beta>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
          <label slot="label">Pizza</label>
          <span slot="error">Error message</span>
        </gux-form-field-checkbox-beta>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
