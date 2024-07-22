import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldTimePicker } from '../gux-form-field-time-picker';
import { GuxScreenReader } from '../../../../../beta/gux-screen-reader/gux-screen-reader';

const components = [GuxFormFieldTimePicker, GuxScreenReader];
const language = 'en';

describe('gux-form-field-time-picker', () => {
  it('should build', async () => {
    const html = `
      <gux-form-field-time-picker>
        <gux-time-picker></gux-time-picker>
        <label slot="label">Label</label>
        <span slot="error">Error message</span>
      </gux-form-field-time-picker>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldTimePicker);
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
            <gux-form-field-time-picker ${componentAttribute}>
              <gux-time-picker value="07:00"></gux-time-picker>
              <label slot="label">Label</label>
            </gux-form-field-time-picker>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });

      describe('indicator marks', () => {
        ['', 'indicator-mark="optional"', 'indicator-mark="required"'].forEach(
          (indicatorMark, index) => {
            it(`should render component as expected (${
              index + 1
            })`, async () => {
              const html = `
                <gux-form-field-time-picker ${indicatorMark}>
                  <gux-time-picker value="07:00"></gux-time-picker>
                  <label slot="label">Label</label>
                </gux-form-field-time-picker>
              `;
              const page = await newSpecPage({ components, html, language });

              expect(page.root).toMatchSnapshot();
            });
          }
        );
      });
    });

    describe('intervals', () => {
      ['interval="15"', 'interval="30"', 'interval="60"'].forEach(
        (componentAttribute, index) => {
          it(`should render component as expected (${index + 1})`, async () => {
            const html = `
            <gux-form-field-time-picker>
              <gux-time-picker value="07:00" ${componentAttribute}></gux-time-picker>
              <label slot="label">Label</label>
            </gux-form-field-time-picker>
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
        <gux-form-field-time-picker>
        <gux-time-picker value="09:00"></gux-time-picker>
        <label slot="label">Select Time</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-time-picker>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('label-info', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-time-picker>
        <gux-time-picker value="09:00"></gux-time-picker>
        <label slot="label">Select Time</label>
        <gux-label-info-beta slot="label-info">
          <span slot="content">This is some tooltip text</span>
        </gux-label-info-beta>
      </gux-form-field-time-picker>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
