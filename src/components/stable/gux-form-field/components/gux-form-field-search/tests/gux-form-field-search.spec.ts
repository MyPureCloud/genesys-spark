import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxFormFieldSearch } from '../gux-form-field-search';

const components = [GuxFormFieldSearch];
const language = 'en';

describe('gux-form-field-search', () => {
  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });

  it('should build', async () => {
    const html = `
      <gux-form-field-search>
        <input slot="input" type="search" value="Sample search"/>
        <label slot="label">Label</label>
        <span slot="error">Error message</span>
      </gux-form-field-search>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldSearch);
  });

  describe('#render', () => {
    describe('label-position', () => {
      [
        '',
        'label-position="above"',
        'label-position="beside"',
        'label-position="screenreader"'
      ].forEach((componentAttribute, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const html = `
            <gux-form-field-search ${componentAttribute}>
              <input slot="input" type="search" value="Sample search"/>
              <label slot="label">Label</label>
            </gux-form-field-search>
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
            <gux-form-field-search>
              <input slot="input" type="search" value="Sample search" ${inputAttribute}/>
              <label slot="label">Label</label>
            </gux-form-field-search>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });
  });
});
