import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-rich-text-editor-action-link.common';

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

describe('gux-rich-text-editor-action-link', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ html }, index) => {
      it(`should display component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-rich-text-editor-action-link');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it(`should be accessible (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });
  });
});
