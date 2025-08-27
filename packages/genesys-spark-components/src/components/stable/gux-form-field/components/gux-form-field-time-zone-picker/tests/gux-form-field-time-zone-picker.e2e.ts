import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

import { renderConfigs } from './gux-form-field-time-zone-picker.common';

const axeExclusions = [
  {
    issueId: 'target-size',
    exclusionReason:
      'COMUI-2944 Fix any of the following: Target has insufficient size (20px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 20px instead of at least 24px.'
  }
];

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

describe('gux-form-field-time-zone-picker', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ html, description }) => {
      it(description, async () => {
        const snapshotPage = await newNonrandomE2EPage({ html });
        const element = await snapshotPage.find(
          'gux-form-field-time-zone-picker'
        );
        const elementShadowDom = await element.find(
          'pierce/.gux-form-field-fieldset-container'
        );

        expect(element.outerHTML).toMatchSnapshot();
        expect(elementShadowDom).toMatchSnapshot();

        const accessibilityPage = await newSparkE2EPage({ html });

        await a11yCheck(accessibilityPage, axeExclusions);
      });
    });
  });
});
