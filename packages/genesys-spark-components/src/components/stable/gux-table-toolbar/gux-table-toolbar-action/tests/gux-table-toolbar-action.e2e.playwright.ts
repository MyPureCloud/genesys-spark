import {
  checkRenders,
  test,
  expect,
  setContent
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-table-toolbar-action.common';

test.describe('gux-table-toolbar-action', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-table-toolbar-action'
    });
  });

  test.describe('interactions', () => {
    test('should fire a click event when the toolbar action is clicked', async ({
      page
    }) => {
      const html =
        '<gux-table-toolbar-action action="export"></gux-table-toolbar-action>';
      await setContent(page, html);

      const element = page.locator('gux-table-toolbar-action');
      const clickSpy = await page.spyOnEvent('click');

      await element.click();
      await page.waitForChanges();

      expect(clickSpy).toHaveReceivedEventTimes(1);
    });

    test('should not fire a click event when the disabled toolbar action is clicked', async ({
      page
    }) => {
      const html =
        '<gux-table-toolbar-action action="export" disabled></gux-table-toolbar-action>';
      await setContent(page, html);

      const element = page.locator('gux-table-toolbar-action');
      const clickSpy = await page.spyOnEvent('click');

      await element.click();
      await page.waitForChanges();

      expect(clickSpy).not.toHaveReceivedEvent();
    });
  });
});
