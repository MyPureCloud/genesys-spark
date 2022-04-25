import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-side-panel', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-side-panel-legacy></gux-side-panel-legacy>`
    });

    const element = await page.find('gux-side-panel-legacy');
    expect(element).toHaveAttribute('hydrated');
  });

  it('shows the panel content when it is open', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-side-panel-legacy>
        <div slot="side-panel-icons">
          <gux-side-panel-button id="settings-button" icon="ic-settings-gear" alt-text="settings gear">
          </gux-side-panel-button>
        </div>

        <div slot="side-panel-content">
          <span>I will be visible when the panel is open!</span>
        </div>
      </gux-side-panel-legacy>`
    });

    const component = await page.find('gux-side-panel-legacy');
    const contentElement = await page.find('div.gux-panel-content');

    component.setProperty('position', 'right');
    component.setProperty('isOpen', true);
    await page.waitForChanges();
    const computedStyles = await contentElement.getComputedStyle();
    await a11yCheck(page);

    expect(computedStyles.display).toEqual('block');
  });

  it('does not show the panel content when it is closed', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-side-panel-legacy>
        <div slot="side-panel-icons">
          <gux-side-panel-button id="settings-button" icon="ic-settings-gear" alt-text="settings gear">
          </gux-side-panel-button>
        </div>

        <div slot="side-panel-content">
          <span>I will be visible when the panel is open!</span>
        </div>
      </gux-side-panel-legacy>
      `
    });

    const component = await page.find('gux-side-panel-legacy');
    const contentElement = await page.find('div.gux-panel-content');

    component.setProperty('position', 'right');
    component.setProperty('isOpen', false);
    await page.waitForChanges();
    const computedStyles = await contentElement.getComputedStyle();
    await a11yCheck(page);

    expect(computedStyles.display).toEqual('none');
  });
});
