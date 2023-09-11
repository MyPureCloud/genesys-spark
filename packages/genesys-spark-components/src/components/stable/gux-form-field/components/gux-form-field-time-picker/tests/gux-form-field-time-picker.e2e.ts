import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

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

describe('gux-form-field-time-picker', () => {
  describe('#render', () => {
    describe('label-position', () => {
      [
        '',
        'label-position="above"',
        'label-position="beside"',
        'label-position="screenreader"'
      ].forEach((componentAttribute, index) => {
        const html = `
        <gux-form-field-time-picker ${componentAttribute}>
          <gux-time-picker value="07:00"></gux-time-picker>
          <label slot="label">Label</label>
        </gux-form-field-time-picker>
        `;

        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-form-field-time-picker');
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

    describe('interval', () => {
      ['interval="15"', 'interval="30"', 'interval="60"'].forEach(
        (componentAttribute, index) => {
          const html = `
          <gux-form-field-time-picker>
            <gux-time-picker value="07:00" ${componentAttribute}></gux-time-picker>
            <label slot="label">Label</label>
          </gux-form-field-time-picker>
        `;

          it(`should render component as expected (${index + 1})`, async () => {
            const page = await newNonrandomE2EPage({ html });
            const element = await page.find('gux-form-field-time-picker');
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
        }
      );
    });

    describe('help', () => {
      const html = `
      <gux-form-field-time-picker>
      <gux-time-picker value="09:00"></gux-time-picker>
      <label slot="label">Select Time</label>
      <span slot="help">This is a help message</span>
    </gux-form-field-time-picker>
      `;

      it('should render component as expected', async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-form-field-time-picker');
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
