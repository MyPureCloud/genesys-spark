import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxFormFieldRadio } from '../gux-form-field-radio';

const components = [GuxFormFieldRadio];
const language = 'en';

describe('gux-form-field-radio-beta', () => {
  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });

  it('should build', async () => {
    const html = `
      <gux-form-field-radio-beta>
        <input slot="input" type="radio" name="food-1" value="pizza"/>
        <label slot="label">Pizza</label>
      </gux-form-field-radio-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldRadio);
  });

  describe('#render', () => {
    [
      `
        <gux-form-field-radio-beta>
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio-beta>
      `,
      `
        <gux-form-field-radio-beta>
          <input slot="input" type="radio" name="food-1" value="pizza" disabled/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio-beta>
      `,
      `
        <gux-form-field-radio-beta>
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
          <span slot="error">This is an error message</span>
        </gux-form-field-radio-beta>
      `,
      `
        <gux-form-field-radio-beta>
          <input slot="input" type="radio" name="food-1" value="pizza" checked/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio-beta>
      `,
      `
        <gux-form-field-radio-beta>
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
          <span slot="error">Error message</span>
        </gux-form-field-radio-beta>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
