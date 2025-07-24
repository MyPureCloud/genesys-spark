import {
  checkRenders,
  setContent,
  test,
  expect
} from '@test/playwrightTestUtils';

import {
  renderConfig,
  renderConfigs,
  narrowRenderConfig
} from './gux-tabs.common';

const axeExclusions = [];

test.describe('gux-tabs', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-tabs',
      axeExclusions
    });
  });

  test('does not render the scroll buttons when tabs fit container', async ({
    page
  }) => {
    const html = renderConfig.html;
    await setContent(page, html);

    const scrollButtons = page.locator('.gux-scroll-button');

    await expect(scrollButtons).toHaveCount(0);
  });

  test('renders scroll buttons when tabs overflow container', async ({
    page
  }) => {
    const html = narrowRenderConfig.html;
    await setContent(page, html);

    const scrollButtons = page.locator('.gux-scroll-button');

    await expect(scrollButtons).toHaveCount(2);
  });

  test('should update the tab trigger list if a new tab is added', async ({
    page
  }) => {
    const html = renderConfig.html;
    await setContent(page, html);

    await page.evaluate(() => {
      const tabsElement = document.querySelector('gux-tabs');
      const tabListElement = document.querySelector('gux-tab-list');

      const tabElement = document.createElement('gux-tab');
      tabElement.innerText = 'Tab Header 26';
      tabElement.setAttribute('tab-id', 'z');
      tabListElement.append(tabElement);

      const tabPanelElement = document.createElement('gux-tab-panel');
      tabPanelElement.innerText = 'Tab content 26';
      tabPanelElement.setAttribute('tab-id', 'z');
      tabsElement.append(tabPanelElement);
    });
    await page.waitForChanges();

    const tablist = page.locator('gux-tab-list .gux-scrollable-section');
    const tabTarget = page.locator('gux-tab[tab-id="z"]');

    await expect(tablist).toHaveAttribute(
      'aria-owns',
      'gux-a-tab gux-b-tab gux-c-tab gux-z-tab'
    );

    await tabTarget.click();
    await page.waitForChanges();

    const tabTargetButton = tabTarget.locator('.gux-tab');
    await expect(tabTargetButton).toContainClass('gux-active');
  });

  test('should update the tab trigger list if a tab is removed', async ({
    page
  }) => {
    const html = renderConfig.html;
    await setContent(page, html);

    await page.evaluate(() => {
      const tabElement = document.querySelector('gux-tab[tab-id="b"]');
      tabElement?.parentNode?.removeChild(tabElement);
    });
    await page.waitForChanges();

    const tablist = page.locator('gux-tab-list .gux-scrollable-section');

    await expect(tablist).toHaveAttribute('aria-owns', 'gux-a-tab gux-c-tab');
  });
});
