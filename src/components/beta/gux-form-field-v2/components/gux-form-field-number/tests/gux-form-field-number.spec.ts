import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxFormFieldNumber } from '../gux-form-field-number';

const components = [GuxFormFieldNumber];
const language = 'en';

describe('gux-form-field-number-beta', () => {
  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });

  it('should build', async () => {
    const html = `
      <gux-form-field-number-beta>
        <input slot="input" type="number" value="10"/>
        <label slot="label">Label</label>
        <span slot="error">Error message</span>
      </gux-form-field-number-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldNumber);
  });

  describe('#render', () => {
    describe('clearable', () => {
      [
        { componentAttribute: '', inputAttribute: '' },
        { componentAttribute: 'clearable', inputAttribute: '' },
        { componentAttribute: 'clearable="true"', inputAttribute: '' },
        { componentAttribute: 'clearable="false"', inputAttribute: '' },
        { componentAttribute: 'clearable', inputAttribute: 'disabled' }
      ].forEach(({ componentAttribute, inputAttribute }, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const html = `
            <gux-form-field-number-beta ${componentAttribute}>
              <input slot="input" type="number" value="10" ${inputAttribute}/>
              <label slot="label">Label</label>
            </gux-form-field-number-beta>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('label-position', () => {
      [
        '',
        'label-position="above"',
        'label-position="beside"',
        'label-position="screenreader"'
      ].forEach((componentAttribute, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const html = `
            <gux-form-field-number-beta ${componentAttribute}>
              <input slot="input" type="number" value="10"/>
              <label slot="label">Label</label>
            </gux-form-field-number-beta>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('input attributes', () => {
      ['', 'disabled', 'required'].forEach((inputAttribute, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const html = `
            <gux-form-field-number-beta>
              <input slot="input" type="number" value="10" ${inputAttribute}/>
              <label slot="label">Label</label>
            </gux-form-field-number-beta>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });
  });
});
