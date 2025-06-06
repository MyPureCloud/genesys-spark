import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../../test/e2eTestUtils';
import { renderConfig } from './gux-avatar-change-photo.common';

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

describe('gux-avatar-change-photo-beta', () => {
  describe('#render', () => {
    it(renderConfig.description, async () => {
      const page = await newNonrandomE2EPage({ html: renderConfig.html });
      const element = await page.find('gux-avatar-change-photo-beta');

      expect(element.outerHTML).toMatchSnapshot();
    });

    it(`should be accessible`, async () => {
      const page = await newSparkE2EPage({ html: renderConfig.html });

      await a11yCheck(page, axeExclusions);
    });
  });
});
