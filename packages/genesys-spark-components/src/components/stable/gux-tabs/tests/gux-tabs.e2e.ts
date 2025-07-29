import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck, newSparkE2EPage } from '../../../../test/e2eTestUtils';

import {
  renderConfig,
  renderConfigs,
  narrowRenderConfig
} from './gux-tabs.common';

const axeExclusions = [];

async function newNonrandomE2EPage(
  {
    html
  }: {
    html: string;
  },
  lang: string = 'en'
): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(`<div lang=${lang}>${html}</div>`);
  await page.waitForChanges();
  await page.addScriptTag({
    path: '../../node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();

  return page;
}

describe('gux-tabs', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const snapshotPage = await newNonrandomE2EPage({ html });
        const element = await snapshotPage.find('gux-tabs');

        expect(element.outerHTML).toMatchSnapshot();

        const accessibilityPage = await newSparkE2EPage({ html });

        await a11yCheck(accessibilityPage, axeExclusions);
      });
    });

    it('does not render the scroll buttons when tabs fit container', async () => {
      const html = renderConfig.html;
      const page = await newNonrandomE2EPage({ html });
      const scrollButtons = await page.findAll('.gux-scroll-button');

      expect(scrollButtons.length).toBe(0);

      const accessibilityPage = await newSparkE2EPage({ html });
      await a11yCheck(accessibilityPage, axeExclusions);
    });

    it('renders scroll buttons when tabs overflow container', async () => {
      const html = narrowRenderConfig.html;
      const page = await newNonrandomE2EPage({ html });
      const scrollButtons = await page.findAll('.gux-scroll-button');

      expect(scrollButtons.length).toBe(2);

      const accessibilityPage = await newSparkE2EPage({ html });
      await a11yCheck(accessibilityPage, axeExclusions);
    });

    it('should update the tab trigger list if a new tab is added', async () => {
      const html = renderConfig.html;

      const page = await newNonrandomE2EPage({ html });
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

      const tablist = await page.find(
        'pierce/gux-tab-list .gux-scrollable-section'
      );
      const tabTarget = await page.find('gux-tab[tab-id="z"]');

      expect(tablist.getAttribute('aria-owns')).toEqual(
        'gux-a-tab gux-b-tab gux-c-tab gux-z-tab'
      );

      await tabTarget.click();
      await page.waitForChanges();

      const tabTargetButton = await tabTarget.find('.gux-tab');
      expect(tabTargetButton.classList.contains('gux-active')).toBe(true);
    });

    it('should update the tab trigger list if a tab is removed', async () => {
      const html = renderConfig.html;

      const page = await newNonrandomE2EPage({ html });
      await page.evaluate(() => {
        const tabElement = document.querySelector('gux-tab[tab-id="b"]');
        tabElement?.parentNode?.removeChild(tabElement);
      });
      await page.waitForChanges();

      const tablist = await page.find(
        'pierce/gux-tab-list .gux-scrollable-section'
      );

      expect(tablist.getAttribute('aria-owns')).toEqual('gux-a-tab gux-c-tab');
    });
  });

  describe(`#interactions`, () => {
    it('should change tabpanel content when tab is changed', async () => {
      const html = renderConfig.html;
      const page = await newNonrandomE2EPage({ html });

      const tabTarget = await page.find('gux-tab[tab-id="b"]');
      const tabPanel = await page.find('gux-tab-panel[tab-id="b"]');

      const spyOnActivePanelChangeEvent = await tabPanel.spyOnEvent(
        'guxactivepanelchange'
      );

      await tabTarget.click();
      await page.waitForChanges();

      expect(spyOnActivePanelChangeEvent.length).toBe(1);
      expect(spyOnActivePanelChangeEvent.events[0].detail).toBe('b');
    });

    it('should not change tabpanel content when tab is disabled', async () => {
      const html = renderConfig.html;
      const page = await newNonrandomE2EPage({ html });

      const tabTarget = await page.find('gux-tab[tab-id="d"]');
      const tabPanel = await page.find('gux-tab-panel[tab-id="d"]');

      const spyOnActivePanelChangeEvent = await tabPanel.spyOnEvent(
        'guxactivepanelchange'
      );

      await tabTarget.click();
      await page.waitForChanges();

      expect(spyOnActivePanelChangeEvent.length).toBe(0);
    });
  });
});
