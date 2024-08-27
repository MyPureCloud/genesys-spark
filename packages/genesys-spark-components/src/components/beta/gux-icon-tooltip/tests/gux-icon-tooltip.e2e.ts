import { a11yCheck } from '../../../../test/e2eTestUtils';
import { E2EPage, newE2EPage } from '@stencil/core/testing';

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

describe('gux-icon-tooltip-beta', () => {
  describe('#render', () => {
    it(`should render component as expected`, async () => {
      const html = `
          <gux-icon-tooltip-beta icon-name="fa/bell-regular">
            <span slot="content">This is some tooltip text</span>
          </gux-icon-tooltip-beta>
        `;
      const page = await newNonrandomE2EPage({ html });
      const element = await page.find('gux-icon-tooltip-beta');

      await element.hover();
      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
