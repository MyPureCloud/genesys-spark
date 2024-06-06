import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldFile } from '../gux-form-field-file';

const components = [GuxFormFieldFile];
const language = 'en';

describe('gux-form-field-file', () => {
  it('should build', async () => {
    const html = `
    <gux-form-field-file>
      <label slot="label">Upload a profile picture</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        slot="input"
      />
    </gux-form-field-file>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldFile);
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
            <gux-form-field-file ${componentAttribute}>
            <label slot="label">Upload a profile picture</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              slot="input"
            />
          </gux-form-field-file>
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
            <gux-form-field-file>
            <label slot="label">Upload a profile picture</label>
            <input
              slot="input"
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              ${inputAttribute}
            />
          </gux-form-field-file>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('help', () => {
      it('should render component as expected', async () => {
        const html = `
        <gux-form-field-file>
        <label slot="label">Upload a profile picture</label>
        <input
          slot="input"
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        />
        <span slot="help">This is a help message </span>
      </gux-form-field-file>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
