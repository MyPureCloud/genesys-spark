import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage
  // a11yCheck
} from '../../../../../../test/e2eTestUtils';

// const axeExclusions = [];

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

describe('gux-form-field-range', () => {
  describe('#render', () => {
    [
      `
      <gux-form-field-range>
        <input slot="input" type="range" name="du-1" />
        <label slot="label">Default</label>
      </gux-form-field-range>
     `,
      `
      <gux-form-field-range display-units="%">
        <input slot="input" type="range" name="du-2" />
        <label slot="label">Percentage</label>
      </gux-form-field-range>
     `,
      `
      <gux-form-field-range display-units="px">
        <input slot="input" type="range" name="du-3" disabled />
        <label slot="label">Pixels</label>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range value-in-tooltip>
        <input slot="input" type="range" name="du-1" />
        <label slot="label">Default</label>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range value-in-tooltip display-units="%">
        <input slot="input" type="range" name="du-2" />
        <label slot="label">Percentage</label>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range label-position="above">
        <input slot="input" type="range" name="lp-3" />
        <label slot="label">Above</label>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range label-position="beside">
        <input slot="input" type="range" name="lp-4" />
        <label slot="label">Beside</label>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range label-position="screenreader">
        <input slot="input" type="range" name="lp-5" />
        <label slot="label">Screenreader</label>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range>
        <input slot="input" type="range" name="a-2" required />
        <label slot="label">Required</label>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range>
        <input
          slot="input"
          type="range"
          name="a-2"
          value="10"
          step="5"
          min="-25"
          max="25"
        />
        <label slot="label">Step / Min / Max</label>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range>
        <input slot="input" type="range" name="e-1" />
        <label slot="label">Default</label>
        <span slot="error">This is an error message</span>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range>
        <input slot="input" type="range" name="e-1" />
        <label slot="label">Default</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range>
        <input slot="input" type="range" name="e-1" />
        <label slot="label">Label Info</label>
        <gux-label-info-beta slot="label-info">
          <span slot="content">This is some tooltip text</span>
        </gux-label-info-beta>
      </gux-form-field-range>
      `,
      `
      <gux-form-field-range indicator-mark="optional">
        <input slot="input" type="range" name="du-1" required />
        <label slot="label">Indicator Mark</label>
      </gux-form-field-range>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-form-field-range');
        const elementShadowDom = await element.find(
          'pierce/.gux-form-field-container'
        );

        expect(element.outerHTML).toMatchSnapshot();
        expect(elementShadowDom).toMatchSnapshot();
      });

      // it(`should be accessible (${index + 1})`, async () => {
      //   const page = await newSparkE2EPage({ html });

      //   await a11yCheck(page, axeExclusions);
      // });
    });
  });

  it('Shows percentage value correctly', async () => {
    const page = await newSparkE2EPage({
      html: `
       <gux-form-field-range display-units="%">
        <input slot="input" type="range" name="du-2" />
        <label slot="label">Percentage</label>
      </gux-form-field-range>
      `
    });

    const element = await page.find('gux-form-field-range');
    console.log(element);
    const display = await element.find('gux-display');
    expect(display.innerText).toBe('50%');
  });
});
