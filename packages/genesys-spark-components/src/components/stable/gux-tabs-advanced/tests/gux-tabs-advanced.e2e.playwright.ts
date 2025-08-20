import {
  checkRenders,
  test,
  expect,
  setContent,
  runAxe
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-tabs-advanced.common';

const axeExclusions = [
  {
    issueId: 'duplicate-id-aria',
    exclusionReason:
      'Test uses seeded value for Math.random, so duplicate ids are expected (tooltips)'
  },
  {
    issueId: 'duplicate-id-active',
    exclusionReason:
      'Test uses seeded value for Math.random, so duplicate ids are expected (option buttons)'
  },
  {
    issueId: 'aria-required-children',
    target: '.gux-tablist',
    exclusionReason:
      'Error: Element has children which are not allowed: [role=list] - this is caused because the popover-list has role=list on it which causes a violation since the top parent element has role=tablist'
  }
];

test.describe('gux-tabs-advanced', () => {
  const htmlExample1 = `
    <gux-tabs-advanced>
    <gux-tab-advanced-list
      slot="tab-list"
      allow-sort="false"
      show-new-tab-button="true"
    >
      <gux-tab-advanced tab-id="1-1">
        Tab Header 1
        <gux-list slot="dropdown-options">
          <gux-list-item>
            <gux-icon icon-name="close" decorative="true"></gux-icon>
            Close
          </gux-list-item>
        </gux-list>
      </gux-tab-advanced>
      <gux-tab-advanced tab-id="1-2">
        <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
        Tab Header 2
      </gux-tab-advanced>
      <gux-tab-advanced gux-disabled tab-id="1-3">
        Tab Header 3
      </gux-tab-advanced>
      <gux-tab-advanced tab-id="1-4">
        Tab Header 4
      </gux-tab-advanced>
      <gux-tab-advanced tab-id="1-5">
        Tab Header 5 long long
      </gux-tab-advanced>
      <gux-tab-advanced tab-id="1-6">
        <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
        Tab Header 6
        <gux-list slot="dropdown-options">
          <gux-list-item>
            <gux-icon icon-name="close" decorative="true"></gux-icon>
            Close
          </gux-list-item>
        </gux-list>
      </gux-tab-advanced>
      <gux-tab-advanced tab-id="1-7">
        <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
        Tab Header 7 long long long
        <gux-list slot="dropdown-options">
          <gux-list-item>
            <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
            Close
          </gux-list-item>
        </gux-list>
      </gux-tab-advanced>
      <gux-tab-advanced tab-id="1-8">
      Tab Header 8 longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
      <gux-list slot="dropdown-options">
        <gux-list-item>
          <gux-icon icon-name="close" decorative="true"></gux-icon>
          Close
        </gux-list-item>
      </gux-list>
    </gux-tab-advanced>
      <gux-tab-advanced gux-disabled tab-id="1-9">
        Tab Header 9 long long long
      </gux-tab-advanced>
    </gux-tab-advanced-list>
    <gux-tab-advanced-panel tab-id="1-1">
      <span>Tab content 1</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-2">
      <span>Tab content 2</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-3">
      <span>Tab content 3</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-4">
      <span>Tab content 4</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-5">
      <span>Tab content 5</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-6">
      <span>Tab content 6</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-7">
      <span>Tab content 7</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-8">
      <span>Tab content 8</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-9">
      <span>Tab content 9</span>
    </gux-tab-advanced-panel>
  </gux-tabs-advanced>`;

  const htmlExample2 = renderConfig.html;

  test.describe('#render', () => {
    checkRenders({
      renderConfigs: [renderConfig],
      axeExclusions
    });

    test('does not render the scroll buttons when tabs fit container', async ({
      page
    }) => {
      await setContent(page, htmlExample2);
      const component = page.locator('gux-tabs-advanced');
      const scrollButtons = component.locator('.gux-scroll-button');

      expect(await scrollButtons.count()).toBe(0);
    });

    test('renders scroll buttons when tabs overflow container', async ({
      page
    }) => {
      const restrictedWidthHtml = `<div lang=ja style="width: 200px">${htmlExample2}</div>`;
      await setContent(page, restrictedWidthHtml);
      const scrollButtons = page.locator('.gux-scroll-button');

      expect(await scrollButtons.count()).toBe(2);
    });
  });

  test.describe('#interactions', () => {
    test('should change tabpanel content when tab is changed', async ({
      page
    }) => {
      await setContent(page, htmlExample1);
      const tabTarget = page.locator('gux-tab-advanced[tab-id="1-2"]');
      const spyOnActivePanelChangeEvent = await page.spyOnEvent(
        'guxactivepanelchange'
      );

      await tabTarget.click();
      await page.waitForChanges();

      expect(spyOnActivePanelChangeEvent).toHaveLength(1);
      expect(spyOnActivePanelChangeEvent.events[0].detail).toBe('1-2');
    });

    test('should not change tabpanel content when tab is disabled', async ({
      page
    }) => {
      await setContent(page, htmlExample1);
      const tabTarget = page.locator('gux-tab-advanced[tab-id="1-3"]');
      const spyOnActivePanelChangeEvent = await page.spyOnEvent(
        'guxactivepanelchange'
      );

      await tabTarget.click();
      await page.waitForChanges();

      expect(spyOnActivePanelChangeEvent).toHaveLength(0);
    });

    test('should open and close options popup on click', async ({ page }) => {
      await setContent(page, htmlExample1);
      const optionPopoverTarget = page.locator(
        'gux-tab-advanced[tab-id="1-1"] .gux-tab-options-trigger'
      );

      await optionPopoverTarget.click();
      await page.waitForChanges();

      expect((await runAxe(page)).violations).toHaveNoViolations({
        axeExclusions,
        axeScanContext: 'options popover expanded'
      });

      const optionPopover = page.locator(
        'gux-tab-advanced[tab-id="1-1"] gux-popover-list'
      );

      await expect(optionPopover).toHaveAttribute('is-open', '');

      await optionPopoverTarget.click();
      await page.waitForChanges();

      const popoverIsOpen = await optionPopover.getAttribute('is-open');
      expect(popoverIsOpen).toBeNull();
    });
  });
});
