import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck } from '../../../../test/e2eTestUtils';

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
  [
    {
      description: 'using gux-tab-panel',
      html: `<gux-tabs>
      <gux-tab-list slot="tab-list">
          <gux-tab tab-id="2-1">Tab Header 1</gux-tab>
          <gux-tab tab-id="2-2">Tab Header 2</gux-tab>
          <gux-tab tab-id="2-3">Tab Header 3</gux-tab>
          <gux-tab gux-disabled tab-id="2-4"
            >Tab Header 4</gux-tab
          >
          <gux-tab gux-disabled="true" tab-id="2-5"
            >Tab Header 5</gux-tab
          >
      </gux-tab-list>
      <gux-tab-panel tab-id="2-1">Tab content 1</gux-tab-panel>
      <gux-tab-panel tab-id="2-2">Tab content 2</gux-tab-panel>
      <gux-tab-panel tab-id="2-3">Tab content 3</gux-tab-panel>
      <gux-tab-panel tab-id="2-4">Tab content 4</gux-tab-panel>
      <gux-tab-panel tab-id="2-5">Tab content 5</gux-tab-panel>
    </gux-tabs>`
    },
    {
      description: 'using gux-tab-panel',
      html: `<gux-tabs>
      <gux-tab-list slot="tab-list">
          <gux-tab tab-id="2-1">Tab Header 1</gux-tab>
          <gux-tab tab-id="2-2">Tab Header 2</gux-tab>
          <gux-tab tab-id="2-3">Tab Header 3</gux-tab>
          <gux-tab gux-disabled tab-id="2-4"
            >Tab Header 4</gux-tab
          >
          <gux-tab gux-disabled="true" tab-id="2-5"
            >Tab Header 5</gux-tab
          >
      </gux-tab-list>
      <gux-tab-panel tab-id="2-1">Tab content 1</gux-tab-panel>
      <gux-tab-panel tab-id="2-2">Tab content 2</gux-tab-panel>
      <gux-tab-panel tab-id="2-3">Tab content 3</gux-tab-panel>
      <gux-tab-panel tab-id="2-4">Tab content 4</gux-tab-panel>
      <gux-tab-panel tab-id="2-5">Tab content 5</gux-tab-panel>
    </gux-tabs>`
    }
  ].forEach(({ description, html }) => {
    describe(`#render ${description}`, () => {
      const restrictedWidthHtml = `<div style="width: 200px">${html}</div>`;

      it('renders', async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-tabs');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it('renders i18n strings', async () => {
        const page = await newNonrandomE2EPage(
          { html: restrictedWidthHtml },
          'ja'
        );
        const element = await page.find('gux-tabs');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it('does not render the scroll buttons when tabs fit container', async () => {
        const page = await newNonrandomE2EPage({ html });
        const scrollButtons = await page.findAll('.gux-scroll-button');
        await a11yCheck(page);

        expect(scrollButtons.length).toBe(0);
      });

      it('renders scroll buttons when tabs overflow container', async () => {
        const page = await newNonrandomE2EPage({ html: restrictedWidthHtml });
        const scrollButtons = await page.findAll('.gux-scroll-button');
        await a11yCheck(page);

        expect(scrollButtons.length).toBe(2);
      });
      it('should update the tab trigger list if a new tab is added', async () => {
        const page = await newNonrandomE2EPage({ html });
        await page.evaluate(() => {
          const tabListElement = document.querySelector('gux-tab-list');
          const tabElement = document.createElement('gux-tab');
          tabElement.innerText = 'Tab Header 6';
          tabElement.setAttribute('tab-id', '2-6');
          tabListElement.append(tabElement);
        });
        await page.waitForChanges();

        const tablist = await page.find(
          'pierce/gux-tab-list .gux-scrollable-section'
        );
        const tabTarget = await page.find('gux-tab[tab-id="2-6"]');

        expect(tablist.getAttribute('aria-owns')).toEqual(
          'gux-2-1-tab gux-2-2-tab gux-2-3-tab gux-2-6-tab'
        );

        await tabTarget.click();
        await page.waitForChanges();

        const tabTargetButton = await tabTarget.find('.gux-tab');
        expect(tabTargetButton.classList.contains('gux-active')).toBe(true);
      });

      it('should update the tab trigger list if a tab is removed', async () => {
        const page = await newNonrandomE2EPage({ html });
        await page.evaluate(() => {
          const tabElement = document.querySelector('gux-tab[tab-id="2-2"]');
          if (tabElement.parentNode) {
            tabElement.parentNode.removeChild(tabElement);
          }
        });
        await page.waitForChanges();

        const tablist = await page.find(
          'pierce/gux-tab-list .gux-scrollable-section'
        );

        expect(tablist.getAttribute('aria-owns')).toEqual(
          'gux-2-1-tab gux-2-3-tab'
        );
      });
    });

    describe(`#interactions ${description}`, () => {
      it('should change tabpanel content when tab is changed', async () => {
        const page = await newNonrandomE2EPage({ html });
        const tabTarget = await page.find('gux-tab[tab-id="2-2"]');
        const tabPanel =
          (await page.find('gux-tab-panel[tab-id="2-2"]')) ||
          (await page.find('gux-tab-panel[tab-id="2-2"]'));
        const spyOnActivePanelChangeEvent = await tabPanel.spyOnEvent(
          'guxactivepanelchange'
        );

        await tabTarget.click();
        await page.waitForChanges();

        expect(spyOnActivePanelChangeEvent.length).toBe(1);
        expect(spyOnActivePanelChangeEvent.events[0].detail).toBe('2-2');
      });
      it('should not change tabpanel content when tab is disabled', async () => {
        const page = await newNonrandomE2EPage({ html });
        const tabTarget = await page.find('gux-tab[tab-id="2-4"]');
        const tabPanel =
          (await page.find('gux-tab-panel[tab-id="2-4"]')) ||
          (await page.find('gux-tab-panel[tab-id="2-4"]'));
        const spyOnActivePanelChangeEvent = await tabPanel.spyOnEvent(
          'guxactivepanelchange'
        );

        await tabTarget.click();
        await page.waitForChanges();

        expect(spyOnActivePanelChangeEvent.length).toBe(0);
      });
    });
  });
});
