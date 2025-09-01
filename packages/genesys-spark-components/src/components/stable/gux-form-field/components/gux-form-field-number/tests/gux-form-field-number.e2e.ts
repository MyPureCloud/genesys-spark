import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

import { renderConfigs } from './gux-form-field-number.common';

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

describe('gux-tooltip-beta', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ html, description }) => {
      it(description, async () => {
        const snapshotPage = await newNonrandomE2EPage({ html });
        const element = await snapshotPage.find('gux-tooltip-beta');

        expect(element.outerHTML).toMatchSnapshot();

        const accessibilityPage = await newSparkE2EPage({ html });

        await a11yCheck(accessibilityPage, axeExclusions);
      });
    });
  });
});
