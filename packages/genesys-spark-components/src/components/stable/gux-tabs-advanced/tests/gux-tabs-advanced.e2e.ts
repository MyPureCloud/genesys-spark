import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck } from '../../../../test/e2eTestUtils';

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
  }
];

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

describe('gux-tabs-advanced', () => {
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
  </gux-tabs-advanced>
`;
  const htmlExample2 = `
    <gux-tabs-advanced>
      <gux-tab-advanced-list
        slot="tab-list"
        allow-sort="false"
        show-new-tab-button="true"
      >
        <gux-tab-advanced tab-id="1-1">
          Tab Header 1
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

    </gux-tabs-advanced>
    `;
  describe('#render', () => {
    // This test is flaky
    it('renders', async () => {
      const page = await newNonrandomE2EPage({ html: htmlExample2 });
      const element = await page.find('gux-tabs-advanced');
      await a11yCheck(page, axeExclusions);

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('renders i18n strings', async () => {
      const restrictedWidthHtml = `<div style="width: 200px">${htmlExample2}</div>`;
      const page = await newNonrandomE2EPage(
        { html: restrictedWidthHtml },
        'ja'
      );
      const element = await page.find('gux-tabs-advanced');

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('does not render the scroll buttons when tabs fit container', async () => {
      const page = await newNonrandomE2EPage({ html: htmlExample2 });
      const scrollButtons = await page.findAll('.gux-scroll-button');
      await a11yCheck(page, axeExclusions);

      expect(scrollButtons.length).toBe(0);
    });

    it('renders scroll buttons when tabs overflow container', async () => {
      const restrictedWidthHtml = `<div style="width: 200px">${htmlExample2}</div>`;
      const page = await newNonrandomE2EPage({ html: restrictedWidthHtml });
      const scrollButtons = await page.findAll('.gux-scroll-button');
      await a11yCheck(page, axeExclusions);

      expect(scrollButtons.length).toBe(2);
    });
  });

  describe('#interactions', () => {
    it('should change tabpanel content when tab is changed', async () => {
      const page = await newNonrandomE2EPage({ html: htmlExample1 });
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
      const page = await newNonrandomE2EPage({ html: htmlExample1 });
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
      const page = await newNonrandomE2EPage({ html: htmlExample1 });
      const optionPopoverTarget = await page.find(
        'gux-tab-advanced[tab-id="1-1"] .gux-tab-options-button'
      );

      await optionPopoverTarget.click();
      await page.waitForChanges();
      await a11yCheck(page, axeExclusions, 'options popover expanded');

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
