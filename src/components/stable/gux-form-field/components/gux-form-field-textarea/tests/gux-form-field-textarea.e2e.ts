import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from 'test/e2eTestUtils';

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

describe('gux-form-field-textarea', () => {
  describe('#render', () => {
    describe('resize', () => {
      ['', 'resize="auto"', 'resize="manual"', 'resize="none"'].forEach(
        (componentAttribute, index) => {
          const html = `
          <gux-form-field-textarea ${componentAttribute}>
            <textarea slot="input"></textarea>
            <label slot="label">Label</label>
          </gux-form-field-textarea>
        `;

          it(`should render component as expected (${index + 1})`, async () => {
            const page = await newNonrandomE2EPage({ html });
            const element = await page.find('gux-form-field-textarea');
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

    describe('label-position', () => {
      [
        '',
        'label-position="above"',
        'label-position="beside"',
        'label-position="screenreader"'
      ].forEach((componentAttribute, index) => {
        const html = `
          <gux-form-field-textarea ${componentAttribute}>
            <textarea slot="input"></textarea>
            <label slot="label">Label</label>
          </gux-form-field-textarea>
        `;

        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-form-field-textarea');
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
          <gux-form-field-textarea>
            <textarea slot="input" ${inputAttribute}></textarea>
            <label slot="label">Label</label>
          </gux-form-field-textarea>
        `;

        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-form-field-textarea');
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
      <gux-form-field-textarea>
      <textarea slot="input" name="textarea"></textarea>
      <label slot="label">Default</label>
      <span slot="help">This is a help message</span>
    </gux-form-field-textarea>
      `;

      it('should render component as expected', async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-form-field-textarea');
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
