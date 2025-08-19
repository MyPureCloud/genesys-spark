import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'target-size',
    exclusionReason:
      'COMUI-2944 Fix any of the following: Target has insufficient size (20px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 20px instead of at least 24px.'
  }
];
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

describe('gux-form-field-time-zone-picker', () => {
  describe('#render', () => {
    describe('label-position', () => {
      [
        '',
        'label-position="above"',
        'label-position="beside"',
        'label-position="screenreader"'
      ].forEach((componentAttribute, index) => {
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

        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-form-field-time-zone-picker');
          const elementShadowDom = await element.find(
            'pierce/.gux-form-field-container'
          );

          expect(element.outerHTML).toMatchSnapshot();
          expect(elementShadowDom).toMatchSnapshot();
        });

        it(`should be accessible (${index + 1})`, async () => {
          const page = await newSparkE2EPage({ html });

          await a11yCheck(page, axeExclusions);
        });
      });
    });

    describe('input attributes', () => {
      ['', 'disabled', 'required'].forEach((inputAttribute, index) => {
        const html = `
          <gux-form-field-time-zone-picker>
          <gux-time-zone-picker-beta
          value="Etc/GMT+1"
          workspace-default="Etc/GMT"
          local-default="America/Detroit"
          ${inputAttribute}
        >
        </gux-time-zone-picker-beta>
        <label slot="label">Select Time Zone</label>
          </gux-form-field-time-zone-picker>
          `;

        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-form-field-time-zone-picker');
          const elementShadowDom = await element.find(
            'pierce/.gux-form-field-fieldset-container'
          );

          expect(element.outerHTML).toMatchSnapshot();
          expect(elementShadowDom).toMatchSnapshot();
        });

        it(`should be accessible (${index + 1})`, async () => {
          const page = await newSparkE2EPage({ html });

          await a11yCheck(page, axeExclusions);
        });
      });
    });

    describe('help', () => {
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

      it('should render component as expected', async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-form-field-time-zone-picker');
        const elementShadowDom = await element.find(
          'pierce/.gux-form-field-container'
        );

        expect(element.outerHTML).toMatchSnapshot();
        expect(elementShadowDom).toMatchSnapshot();
      });

      it('should be accessible', async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
      });
    });

    describe('error', () => {
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

      it('should render component as expected', async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-form-field-time-zone-picker');
        const elementShadowDom = await element.find(
          'pierce/.gux-form-field-container'
        );

        expect(element.outerHTML).toMatchSnapshot();
        expect(elementShadowDom).toMatchSnapshot();
      });

      it('should be accessible', async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
      });
    });
  });
});
