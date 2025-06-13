import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck, newSparkE2EPage } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-table-toolbar.common';

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

describe('gux-table-toolbar', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(`${description}: snapshot check`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-table-toolbar');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it(`${description}: accessibility check`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });
  });
});
