import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldFileBeta } from '../gux-form-field-file';

const components = [GuxFormFieldFileBeta];
const language = 'en';

// Skipping because DataTransfer is not defined in spec tests environment
describe('gux-form-field-file-beta', () => {
  it('should build', async () => {
    const html = `
    <gux-form-field-file-beta>
      <label slot="label">Upload a profile picture</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        slot="input"
      />
    </gux-form-field-file-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldFileBeta);
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
            <gux-form-field-file-beta ${componentAttribute}>
            <label slot="label">Upload a profile picture</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              slot="input"
            />
          </gux-form-field-file-beta>
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
            <gux-form-field-file-beta>
            <label slot="label">Upload a profile picture</label>
            <input
              slot="input"
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              ${inputAttribute}
            />
          </gux-form-field-file-beta>
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
            <gux-form-field-file-beta ${indicatorMark}>
              <label slot="label">Upload a profile picture</label>
              <input
                slot="input"
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
              />
            </gux-form-field-file-beta>
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
        <gux-form-field-file-beta>
        <label slot="label">Upload a profile picture</label>
        <input
          slot="input"
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        />
        <span slot="help">This is a help message </span>
      </gux-form-field-file-beta>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('label-info', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-file-beta>
          <label slot="label">Upload a profile picture</label>
          <input
            slot="input"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
          />
          <gux-label-info-beta slot="label-info">
            <span slot="content">This is some tooltip text</span>
          </gux-label-info-beta>
        </gux-form-field-file-beta>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
