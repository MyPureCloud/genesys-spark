import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldTimeZonePicker } from '../gux-form-field-time-zone-picker';
import { GuxScreenReader } from '../../../../../beta/gux-screen-reader/gux-screen-reader';

const components = [GuxFormFieldTimeZonePicker, GuxScreenReader];
const language = 'en';

describe('gux-form-field-time-zone-picker', () => {
  it('should build', async () => {
    const html = `
    <gux-form-field-time-zone-picker>
      <gux-time-zone-picker-beta
        value="Etc/GMT+1"
        workspace-default="Etc/GMT"
        local-default="America/Detroit"
      >
      </gux-time-zone-picker-beta>
      <label slot="label">Select Time Zone</label>
    </gux-form-field-time-zone-picker>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldTimeZonePicker);
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
            <gux-form-field-time-zone-picker ${componentAttribute}>
            <gux-time-zone-picker-beta
            value="Etc/GMT+1"
            workspace-default="Etc/GMT"
            local-default="America/Detroit"
          >
          </gux-time-zone-picker-beta>
          <label slot="label">Select Time Zone</label>
            </gux-form-field-time-zone-picker>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('help', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-time-zone-picker>
        <gux-time-zone-picker-beta
        value="Etc/GMT+1"
        workspace-default="Etc/GMT"
        local-default="America/Detroit"
      >
      </gux-time-zone-picker-beta>
      <label slot="label">Select Time Zone</label>
      <span slot="help">This is a help message</span>
      </gux-form-field-time-zone-picker>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('label-info', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-time-zone-picker>
          <gux-time-zone-picker-beta
          value="Etc/GMT+1"
          workspace-default="Etc/GMT"
          local-default="America/Detroit"
        >
        </gux-time-zone-picker-beta>
        <label slot="label">Select Time Zone</label>
        <gux-label-info-beta slot="label-info">
          <span slot="content">This is some tooltip text</span>
        </gux-label-info-beta>
      </gux-form-field-time-zone-picker>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('error', () => {
      it('should render component as expected', async () => {
        const html = `
          <gux-form-field-time-zone-picker>
          <gux-time-zone-picker-beta
          value="Etc/GMT+1"
          workspace-default="Etc/GMT"
          local-default="America/Detroit"
        >
        </gux-time-zone-picker-beta>
        <label slot="label">Select Time Zone</label>
        <span slot="error">This is an error message</span>
        </gux-form-field-time-zone-picker>
          `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('input attributes', () => {
      ['', 'disabled', 'required'].forEach((inputAttribute, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const html = `
            <gux-form-field-time-zone-picker>
            <gux-time-zone-picker-beta
            value="Etc/GMT+1"
            workspace-default="Etc/GMT"
            local-default="America/Detroit"
            ${inputAttribute}
          >
          </gux-time-zone-picker-beta>
            </gux-form-field-time-zone-picker>
            `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });
  });
});
