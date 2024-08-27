import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { a11yCheck } from '../../../../test/e2eTestUtils';

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
  await page.addScriptTag({
    path: '../../node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();

  return page;
}

describe('gux-label-info-beta', () => {
  describe('#render', () => {
    it(`should render component as expected`, async () => {
      const html = `
        <gux-label-info-beta>
          <span slot="content">This is an information tooltip</span>
        </gux-label-info-beta>
        `;
      const page = await newNonrandomE2EPage({ html });
      const element = await page.find('gux-label-info-beta');

      await element.hover();
      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
