import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldDate } from '../gux-form-field-date';

const components = [GuxFormFieldDate];
const language = 'en';

describe.skip('gux-form-field-date-beta', () => {
  it('should build', async () => {
    const html = `
      <gux-form-field-date-beta>
        <input slot="input" type="date" value="Sample date"/>
        <label slot="label">Label</label>
        <span slot="error">Error message</span>
      </gux-form-field-date-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldDate);
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
            <gux-form-field-date-beta ${componentAttribute}>
              <input slot="input" type="date" value="Sample date"/>
              <label slot="label">Label</label>
            </gux-form-field-date-beta>
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
            <gux-form-field-date-beta>
              <input slot="input" type="date" value="Sample date" ${inputAttribute}/>
              <label slot="label">Label</label>
            </gux-form-field-date-beta>
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
              <gux-form-field-date-beta ${indicatorMark}>
                <input slot="input" type="date" value="Sample date"/>
                <label slot="label">Label</label>
              </gux-form-field-date-beta>
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
        <gux-form-field-date-beta>
        <input slot="input" type="date" name="e-1" />
        <label slot="label">Default</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-date-beta>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('error', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-date-beta>
        <input slot="input" type="date" name="e-1" />
        <label slot="label">Default</label>
        <span slot="error">This is an error message</span>
      </gux-form-field-date-beta>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('label-info', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-date-beta>
          <input slot="input" type="date" name="e-1" />
          <label slot="label">Default</label>
          <gux-label-info-beta slot="label-info">
            <span slot="content">This is some tooltip text</span>
          </gux-label-info-beta>
        </gux-form-field-date-beta>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
