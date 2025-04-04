import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldSearch } from '../gux-form-field-search';

const components = [GuxFormFieldSearch];
const language = 'en';

describe('gux-form-field-search', () => {
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

    describe('indicator marks', () => {
      ['', 'indicator-mark="optional"', 'indicator-mark="required"'].forEach(
        (indicatorMark, index) => {
          it(`should render component as expected (${index + 1})`, async () => {
            const html = `
              <gux-form-field-search ${indicatorMark}>
                <input slot="input" type="search" value="Sample search"/>
                <label slot="label">Label</label>
              </gux-form-field-search>
            `;
            const page = await newSpecPage({ components, html, language });

            expect(page.root).toMatchSnapshot();
          });
        }
      );
    });

    describe('help', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-search>
        <input slot="input" type="search" name="e-1" />
        <label slot="label">Default</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-search>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('error', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-search>
        <input slot="input" type="search" name="e-1" />
        <label slot="label">Default</label>
        <span slot="error">This is an error message</span>
      </gux-form-field-search>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('label-info', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-search>
          <input slot="input" type="search" name="e-1" />
          <label slot="label">Default</label>
          <gux-label-info-beta slot="label-info">
            <span slot="content">This is some tooltip text</span>
          </gux-label-info-beta>
        </gux-form-field-search>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
