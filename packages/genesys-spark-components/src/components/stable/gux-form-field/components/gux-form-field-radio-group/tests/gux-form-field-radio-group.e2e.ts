import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

import { renderConfigs } from './gux-form-field-radio-group.common';

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

describe('gux-form-field-radio-group-beta', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ html, description }) => {
      it(description, async () => {
        const snapshotPage = await newNonrandomE2EPage({ html });
        const element = await snapshotPage.find(
          'gux-form-field-radio-group-beta'
        );
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
      <gux-form-field-radio-group-beta>
        <label slot="label">Food</label>
        <gux-form-field-radio id="pizza">
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
        <gux-form-field-radio id="pasta">
          <input slot="input" type="radio" name="food-1" value="pasta"/>
          <label slot="label">Pasta</label>
        </gux-form-field-radio>
      </gux-form-field-radio-group-beta>

      `
    });

    const pizzaElement = await page.find('#pizza');
    const pizzaLabel = await pizzaElement.find('label');
    const pizzaInput = await pizzaElement.find('input');

    const pastaElement = await page.find('#pasta');
    const pastaLabel = await pastaElement.find('label');
    const pastaInput = await pastaElement.find('input');

    await a11yCheck(page, axeExclusions, 'Before checking radio');
    await pizzaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(true);
    expect(await pastaInput.getProperty('checked')).toBe(false);

    await a11yCheck(page, axeExclusions, 'After checking radio');
    await pastaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(false);
    expect(await pastaInput.getProperty('checked')).toBe(true);

    await pizzaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(true);
    expect(await pastaInput.getProperty('checked')).toBe(false);
  });
  it('disables the slotted form field radio inputs', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-form-field-radio-group-beta disabled>
        <label slot="label">Food</label>
        <gux-form-field-radio id="pizza">
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
        <gux-form-field-radio id="pasta">
          <input slot="input" type="radio" name="food-1" value="pasta"/>
          <label slot="label">Pasta</label>
        </gux-form-field-radio>
      </gux-form-field-radio-group-beta>

      `
    });

    const pizzaElement = await page.find('#pizza');
    const pizzaLabel = await pizzaElement.find('label');
    const pizzaInput = await pizzaElement.find('input');

    const pastaElement = await page.find('#pasta');
    const pastaLabel = await pastaElement.find('label');
    const pastaInput = await pastaElement.find('input');

    await a11yCheck(page, axeExclusions, 'Before checking radio');
    await pizzaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(false);
    expect(await pastaInput.getProperty('checked')).toBe(false);

    await a11yCheck(page, axeExclusions, 'After checking radio');
    await pastaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(false);
    expect(await pastaInput.getProperty('checked')).toBe(false);
  });
});
