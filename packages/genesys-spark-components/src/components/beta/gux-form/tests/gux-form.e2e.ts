import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const axeExclusions = [];

async function newNonrandomE2EPage({
  html
}: {
  html: string;
}): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(html);
  await page.waitForChanges();

  return page;
}

describe('gux-form', () => {
  describe('#render', () => {
    [
      `<gux-form-beta>
        <form>
          <header>
            <gux-form-heading><h1 slot="heading">Form Heading</h1></gux-form-heading>
            <gux-form-description
              ><p slot="description">
                This is a simple paragraph to accompany the form header.
              </p></gux-form-description
            >
          </header>
          <fieldset>
            <legend>
              <gux-form-fieldset-heading
                ><h2 slot="heading">Form Fieldset Header</h2>
              </gux-form-fieldset-heading>
              <gux-form-description
                ><p slot="description">
                  This is a simple paragraph to accompany the fieldset header.
                </p></gux-form-description
              >
            </legend>
            <gux-form-field-text-like label-position="above">
              <input slot="input" type="text" name="lp-3" />
              <label slot="label">Fieldset Form field label</label>
            </gux-form-field-text-like>

            <gux-form-field-phone label-position="above">
              <gux-phone-input-beta></gux-phone-input-beta>
              <label slot="label">Fieldset Form field label</label>
            </gux-form-field-phone>

            <gux-form-field-textarea label-position="above">
              <textarea slot="input" name="textarea"></textarea>
              <label slot="label">Fieldset Form field label</label>
            </gux-form-field-textarea>
          </fieldset>

          <gux-form-field-text-like label-position="above">
            <input slot="input" type="text" name="lp-3" />
            <label slot="label">Fieldset Form field label</label>
          </gux-form-field-text-like>

          <gux-form-footer placement="page-desktop">
            <footer>
              <gux-button accent="primary">Primary</gux-button>
              <gux-button accent="secondary">Secondary</gux-button>
            </footer>
          </gux-form-footer>
        </form>
      </gux-form-beta>`
    ].forEach((html, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-form-beta');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it('should be accessible', async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
      });
    });
  });
});
