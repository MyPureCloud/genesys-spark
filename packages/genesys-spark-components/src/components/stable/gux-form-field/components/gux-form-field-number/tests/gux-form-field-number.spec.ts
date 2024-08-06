import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldNumber } from '../gux-form-field-number';

const components = [GuxFormFieldNumber];
const language = 'en';

describe('gux-form-field-number', () => {
  it('should build', async () => {
    const html = `
      <gux-form-field-number>
        <input slot="input" type="number" value="10"/>
        <label slot="label">Label</label>
        <span slot="error">Error message</span>
      </gux-form-field-number>
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
            <gux-form-field-number ${componentAttribute}>
              <input slot="input" type="number" value="10" ${inputAttribute}/>
              <label slot="label">Label</label>
            </gux-form-field-number>
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
            <gux-form-field-number ${componentAttribute}>
              <input slot="input" type="number" value="10"/>
              <label slot="label">Label</label>
            </gux-form-field-number>
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
            <gux-form-field-number>
              <input slot="input" type="number" value="10" ${inputAttribute}/>
              <label slot="label">Label</label>
            </gux-form-field-number>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('help', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-number>
        <input slot="input" type="number" name="e-1" value="10" />
        <label slot="label">Default</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-number>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('label-info', () => {
      it('should render component as expected', async () => {
        const html = `
          <gux-form-field-number>
            <input slot="input" type="number" name="e-1" value="10" />
            <label slot="label">Default</label>
            <gux-label-info-beta slot="label-info">
              <span slot="content">This is some tooltip text</span>
            </gux-label-info-beta>
          </gux-form-field-number>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
