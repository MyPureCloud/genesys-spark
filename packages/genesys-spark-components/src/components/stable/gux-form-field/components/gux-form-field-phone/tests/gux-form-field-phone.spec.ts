import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldPhone } from '../gux-form-field-phone';

const components = [GuxFormFieldPhone];
const language = 'en';

describe('gux-form-field-phone', () => {
  it('should build', async () => {
    const html = `
      <gux-form-field-phone>
        <gux-phone-input-beta></gux-phone-input-beta>
        <label slot="label">Label</label>
      </gux-form-field-phone>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldPhone);
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
            <gux-form-field-phone ${componentAttribute}>
              <gux-phone-input-beta></gux-phone-input-beta>
              <label slot="label">Label</label>
            </gux-form-field-phone>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('error', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-phone>
          <gux-phone-input-beta></gux-phone-input-beta>
          <label slot="label">Default</label>
          <span slot="error">Custom Error Message</span>
        </gux-form-field-phone>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('help', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-phone>
          <gux-phone-input-beta></gux-phone-input-beta>
          <label slot="label">Default</label>
          <span slot="help">Custom Help Message</span>
        </gux-form-field-phone>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
