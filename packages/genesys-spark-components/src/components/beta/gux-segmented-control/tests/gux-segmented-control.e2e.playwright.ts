import {
  checkRenders,
  setContent,
  test,
  expect
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-segmented-control.common';

test.describe('gux-segmented-control-beta', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-segmented-control-beta'
  });

  test.describe('User Interactions', () => {
    test('should fire input and change events when an item is clicked', async ({
      page
    }) => {
      const html = `
        <gux-segmented-control-beta>
          <gux-segmented-control-item value="option1">
            <span slot="text">Option 1</span>
          </gux-segmented-control-item>
          <gux-segmented-control-item value="option2">
            <span slot="text">Option 2</span>
          </gux-segmented-control-item>
        </gux-segmented-control-beta>
      `;
      await setContent(page, html);
      const inputSpy = await page.spyOnEvent('input');
      const changeSpy = await page.spyOnEvent('change');

      const item = page.locator('gux-segmented-control-item[value="option1"]');
      await item.click();
      await page.waitForChanges();

      expect(inputSpy).toHaveLength(1);
      expect(changeSpy).toHaveLength(1);
    });

    test('should update value when an item is clicked', async ({ page }) => {
      const html = `
        <gux-segmented-control-beta>
          <gux-segmented-control-item value="option1">
            <span slot="text">Option 1</span>
          </gux-segmented-control-item>
          <gux-segmented-control-item value="option2">
            <span slot="text">Option 2</span>
          </gux-segmented-control-item>
        </gux-segmented-control-beta>
      `;
      await setContent(page, html);

      const control = page.locator('gux-segmented-control-beta');
      const item = page.locator('gux-segmented-control-item[value="option2"]');

      await item.click();
      await page.waitForChanges();

      await expect(control).toHaveJSProperty('value', 'option2');
    });

    test('should not fire events when clicking the same selected item', async ({
      page
    }) => {
      const html = `
        <gux-segmented-control-beta value="option1">
          <gux-segmented-control-item value="option1">
            <span slot="text">Option 1</span>
          </gux-segmented-control-item>
          <gux-segmented-control-item value="option2">
            <span slot="text">Option 2</span>
          </gux-segmented-control-item>
        </gux-segmented-control-beta>
      `;
      await setContent(page, html);
      const inputSpy = await page.spyOnEvent('input');
      const changeSpy = await page.spyOnEvent('change');

      const item = page.locator('gux-segmented-control-item[value="option1"]');
      await item.click();
      await page.waitForChanges();

      expect(inputSpy).toHaveLength(0);
      expect(changeSpy).toHaveLength(0);
    });

    test('should not fire events when clicking disabled item', async ({
      page
    }) => {
      const html = `
        <gux-segmented-control-beta>
          <gux-segmented-control-item value="option1" disabled>
            <span slot="text">Option 1</span>
          </gux-segmented-control-item>
          <gux-segmented-control-item value="option2">
            <span slot="text">Option 2</span>
          </gux-segmented-control-item>
        </gux-segmented-control-beta>
      `;
      await setContent(page, html);
      const inputSpy = await page.spyOnEvent('input');
      const changeSpy = await page.spyOnEvent('change');

      const item = page.locator('gux-segmented-control-item[value="option1"]');
      await item.click();
      await page.waitForChanges();

      expect(inputSpy).toHaveLength(0);
      expect(changeSpy).toHaveLength(0);
    });

    test('should not fire events when control is disabled', async ({
      page
    }) => {
      const html = `
        <gux-segmented-control-beta disabled>
          <gux-segmented-control-item value="option1">
            <span slot="text">Option 1</span>
          </gux-segmented-control-item>
          <gux-segmented-control-item value="option2">
            <span slot="text">Option 2</span>
          </gux-segmented-control-item>
        </gux-segmented-control-beta>
      `;
      await setContent(page, html);
      const inputSpy = await page.spyOnEvent('input');
      const changeSpy = await page.spyOnEvent('change');

      const item = page.locator('gux-segmented-control-item[value="option1"]');

      await item.click();
      await page.waitForChanges();

      expect(inputSpy).toHaveLength(0);
      expect(changeSpy).toHaveLength(0);
    });

    test('should update selected state of items when value changes', async ({
      page
    }) => {
      const html = `
        <gux-segmented-control-beta>
          <gux-segmented-control-item value="option1">
            <span slot="text">Option 1</span>
          </gux-segmented-control-item>
          <gux-segmented-control-item value="option2">
            <span slot="text">Option 2</span>
          </gux-segmented-control-item>
        </gux-segmented-control-beta>
      `;
      await setContent(page, html);

      const item1 = page.locator('gux-segmented-control-item[value="option1"]');
      const item2 = page.locator('gux-segmented-control-item[value="option2"]');

      await expect(item1).toHaveJSProperty('selected', false);
      await expect(item2).toHaveJSProperty('selected', false);

      await item1.click();
      await page.waitForChanges();

      await expect(item1).toHaveJSProperty('selected', true);
      await expect(item2).toHaveJSProperty('selected', false);

      await item2.click();
      await page.waitForChanges();

      await expect(item1).toHaveJSProperty('selected', false);
      await expect(item2).toHaveJSProperty('selected', true);
    });
  });
});
