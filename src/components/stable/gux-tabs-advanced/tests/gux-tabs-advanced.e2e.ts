import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'nested-interactive'
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
  await page.addScriptTag({
    path: 'node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();

  return page;
}

describe('gux-tabs-advanced', () => {
  const html = `
    <gux-tabs-advanced lang="en" id="interactive">
      <gux-tab-advanced-list slot="tab-list" show-new-tab-button="true">
        <gux-tab-advanced tab-id="1-1" tab-icon-name="lock">
          <span slot="title"> Hello World </span>
          <span slot="dropdown-options">
            <gux-tab-advanced-option
              option-id="1"
              icon-name="edit"
              onclick="notify(event)"
            >
              Edit
            </gux-tab-advanced-option>
            <gux-tab-advanced-option
              option-id="2"
              icon-name="clone"
              onclick="notify(event)"
            >
              Clone
            </gux-tab-advanced-option>
            <gux-tab-advanced-option
              option-id="3"
              icon-name="share"
              onclick="notify(event)"
            >
              Share
            </gux-tab-advanced-option>
            <gux-tab-advanced-option
              option-id="4"
              icon-name="download"
              onclick="notify(event)"
            >
              Download
            </gux-tab-advanced-option>
          </span>
        </gux-tab-advanced>
        <gux-tab-advanced tab-id="1-2" tab-icon-name="lock">
          <span slot="title"> Hello World 2 </span>
        </gux-tab-advanced>
        <gux-tab-advanced gux-disabled tab-id="1-3" tab-icon-name="lock">
        <span slot="title"> Hello World 3 </span>
      </gux-tab-advanced>
      </gux-tab-advanced-list>
      <gux-tab-advanced-panel tab-id="1-1">
        <span>Tab content 1</span>
        <div>The current time is: <span id="currentTime"></span></div>
        <div>
          The current selected panel tab-id is: <span id="currenttab-id"></span>
        </div>
      </gux-tab-advanced-panel>
      <gux-tab-advanced-panel tab-id="1-2">
        <span>Tab content 2</span>
      </gux-tab-advanced-panel>
      <gux-tab-advanced-panel tab-id="1-3">
      <span>Tab content 3</span>
    </gux-tab-advanced-panel>
  </gux-tabs-advanced>
`;
  describe('#render', () => {
    it('renders', async () => {
      const page = await newNonrandomE2EPage({ html });
      const element = await page.find('gux-tabs-advanced');
      await a11yCheck(page, axeExclusions);

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('does not render the scroll buttons when tabs fit container', async () => {
      const page = await newNonrandomE2EPage({ html });
      const scrollButtons = await page.findAll('.gux-scroll-button');
      await a11yCheck(page, axeExclusions);

      expect(scrollButtons.length).toBe(0);
    });

    it('renders scroll buttons when tabs overflow container', async () => {
      const restrictedWidthHtml = `<div style="width: 200px">${html}</div>`;
      const page = await newNonrandomE2EPage({ html: restrictedWidthHtml });
      const scrollButtons = await page.findAll('.gux-scroll-button');
      await a11yCheck(page, axeExclusions);

      expect(scrollButtons.length).toBe(2);
    });
  });

  describe('#interactions', () => {
    it('should change tabpanel content when tab is changed', async () => {
      const page = await newNonrandomE2EPage({ html });
      const tabTarget = await page.find('gux-tab-advanced[tab-id="1-2"]');
      const tabPanel = await page.find('gux-tab-advanced-panel[tab-id="1-2"]');
      const spyOnActivePanelChangeEvent = await tabPanel.spyOnEvent(
        'guxactivepanelchange'
      );

      await tabTarget.click();
      await page.waitForChanges();

      expect(spyOnActivePanelChangeEvent.length).toBe(1);
      expect(spyOnActivePanelChangeEvent.events[0].detail).toBe('1-2');
    });
    it('should not change tabpanel content when tab is disabled', async () => {
      const page = await newNonrandomE2EPage({ html });
      const tabTarget = await page.find('gux-tab-advanced[tab-id="1-3"]');
      const tabPanel = await page.find('gux-tab-advanced-panel[tab-id="1-3"]');
      const spyOnActivePanelChangeEvent = await tabPanel.spyOnEvent(
        'guxactivepanelchange'
      );

      await tabTarget.click();
      await page.waitForChanges();

      expect(spyOnActivePanelChangeEvent.length).toBe(0);
    });
    it('should open and close options popup on click', async () => {
      const page = await newNonrandomE2EPage({ html });
      const optionPopoverTarget = await page.find(
        'gux-tab-advanced[tab-id="1-1"] .gux-tab-options-button'
      );

      await optionPopoverTarget.click();
      await page.waitForChanges();
      await a11yCheck(page, [], 'options popover expanded');

      const optionPopover = await page.find(
        'gux-tab-advanced[tab-id="1-1"] gux-popover-list'
      );
      let optionPopoverHidden = optionPopover.getAttribute('hidden');

      expect(optionPopoverHidden).toBe(null);

      await optionPopoverTarget.click();
      await page.waitForChanges();
      optionPopoverHidden = optionPopover.getAttribute('hidden');

      expect(optionPopoverHidden).toBe('');
    });
  });
});
