import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../../tests/e2eTestUtils';

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

describe('gux-form-field-number', () => {
  describe('#render', () => {
    describe('clearable', () => {
      [
        { componentAttribute: '', inputAttribute: '' },
        { componentAttribute: 'clearable', inputAttribute: '' },
        { componentAttribute: 'clearable="true"', inputAttribute: '' },
        { componentAttribute: 'clearable="false"', inputAttribute: '' },
        { componentAttribute: 'clearable', inputAttribute: 'disabled' }
      ].forEach(({ componentAttribute, inputAttribute }, index) => {
        const html = `
          <gux-form-field-number lang="en" ${componentAttribute}>
            <input slot="input" type="number" value="10" ${inputAttribute}/>
            <label slot="label">Label</label>
          </gux-form-field-number>
        `;

        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-form-field-number');
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

    describe('label-position', () => {
      [
        '',
        'label-position="above"',
        'label-position="beside"',
        'label-position="screenreader"'
      ].forEach((componentAttribute, index) => {
        const html = `
          <gux-form-field-number lang="en" ${componentAttribute}>
            <input slot="input" type="number" value="10"/>
            <label slot="label">Label</label>
          </gux-form-field-number>
        `;

        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-form-field-number');
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
          <gux-form-field-number lang="en">
            <input slot="input" type="number" value="10" ${inputAttribute}/>
            <label slot="label">Label</label>
          </gux-form-field-number>
        `;

        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-form-field-number');
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

    describe('help', () => {
      const html = `
      <gux-form-field-number>
      <input slot="input" type="number" name="e-1" value="10" />
      <label slot="label">Default</label>
      <span slot="help">This is a help message</span>
    </gux-form-field-number>
      `;

      it('should render component as expected', async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-form-field-number');
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
