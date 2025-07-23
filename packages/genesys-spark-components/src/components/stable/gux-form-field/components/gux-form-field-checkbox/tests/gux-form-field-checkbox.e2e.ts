import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

import { renderConfigs } from './gux-form-field-checkbox.common';

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

describe('gux-form-field-checkbox', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ html }, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const snapshotPage = await newNonrandomE2EPage({ html });
        const element = await snapshotPage.find('gux-form-field-checkbox');
        const elementShadowDom = await element.find(
          'pierce/.gux-form-field-container'
        );

        expect(element.outerHTML).toMatchSnapshot();
        expect(elementShadowDom).toMatchSnapshot();

        const accessibilityPage = await newSparkE2EPage({ html });

        await a11yCheck(accessibilityPage, axeExclusions);
      });
    });
  });

  it('switches between states when clicked', async () => {
    const page = await newSparkE2EPage({
      html: `
        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
      `
    });

    const element = await page.find('gux-form-field-checkbox');
    const label = await element.find('label');
    const input = await element.find('input');

    await a11yCheck(page, axeExclusions, 'Before checking checkbox');
    await label.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);

    await a11yCheck(page, axeExclusions, 'After checking checkbox');
    await label.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);

    await label.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });
});
