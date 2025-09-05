import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

import { renderConfigs } from './gux-form-field-file.common';

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

describe('gux-form-field-file-beta', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }, index) => {
      it(`${description} (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-form-field-file-beta');
        const elementShadowDom = await element.find(
          'pierce/.gux-form-field-container'
        );

        expect(element.outerHTML).toMatchSnapshot();
        expect(elementShadowDom).toMatchSnapshot();
      });

      it(`should be accessible - ${description} (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
      });
    });
  });
});
