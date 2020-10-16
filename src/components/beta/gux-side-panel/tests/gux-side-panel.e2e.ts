import { newE2EPage } from '@stencil/core/testing';

describe('gux-side-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-side-panel-beta></gux-side-panel-beta>');
    const element = await page.find('gux-side-panel-beta');
    expect(element).toHaveClass('hydrated');
  });

  it('shows the panel content when it is open', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-side-panel-beta>
        <div slot="side-panel-icons">
          <gux-side-panel-button id="settings-button" icon="ic-settings-gear" alt-text="settings gear">
          </gux-side-panel-button>
        </div>

        <div slot="side-panel-content">
          <span>I will be visible when the panel is open!</span>
        </div>
      </gux-side-panel-beta>`);
    const component = await page.find('gux-side-panel-beta');
    const contentElement = await page.find('div.gux-panel-content');

    component.setProperty('position', 'right');
    component.setProperty('isOpen', true);
    await page.waitForChanges();
    const computedStyles = await contentElement.getComputedStyle();
    expect(computedStyles.display).toEqual('block');
  });

  it('shows the panel content when it is open', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-side-panel-beta>
        <div slot="side-panel-icons">
          <gux-side-panel-button id="settings-button" icon="ic-settings-gear" alt-text="settings gear">
          </gux-side-panel-button>
        </div>

        <div slot="side-panel-content">
          <span>I will be visible when the panel is open!</span>
        </div>
      </gux-side-panel-beta>`);
    const component = await page.find('gux-side-panel-beta');
    const contentElement = await page.find('div.gux-panel-content');

    component.setProperty('position', 'right');
    component.setProperty('isOpen', false);
    await page.waitForChanges();
    const computedStyles = await contentElement.getComputedStyle();
    expect(computedStyles.display).toEqual('none');
  });
});
