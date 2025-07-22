import { newSpecPage } from '@test/specTestUtils';

import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldCheckbox } from '../gux-form-field-checkbox';

import { renderConfigs } from './gux-form-field-checkbox.common';

const components = [GuxFormFieldCheckbox];
const language = 'en';

describe('gux-form-field-checkbox', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);

    describe('when the component has an error slot', () => {
      it('should apply aria invalid and errormessage', async () => {
        const html = `
          <gux-form-field-checkbox>
            <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
            <label slot="label">Pizza</label>
            <span slot="error">This is an error message</span>
          </gux-form-field-checkbox>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(
          page.root.querySelector('input').getAttribute('aria-invalid')
        ).toBe('true');

        expect(
          page.root.querySelector('input').getAttribute('aria-errormessage')
        ).toBeDefined();
      });
    });
  });
});
