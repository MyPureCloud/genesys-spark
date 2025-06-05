import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-label-info.common';

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

describe('gux-label-info-beta', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ html, description }) => {
      it(`should render ${description}`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-label-info-beta');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it(`should be accessible for ${description}`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
      });
    });
  });
});
