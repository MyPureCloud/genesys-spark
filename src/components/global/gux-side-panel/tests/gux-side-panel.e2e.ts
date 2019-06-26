import { newE2EPage } from '@stencil/core/testing';

describe('gux-side-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-side-panel></gux-side-panel>');
    const element = await page.find('gux-side-panel');
    expect(element).toHaveClass('hydrated');
  });

  it('shows the panel content when it is open', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-side-panel>
        <div slot="side-panel-icons">
          <gux-side-panel-button id="settings-button" icon="genesys-icon-settings-gear" alt-text="settings gear">
          </gux-side-panel-button>
        </div>

        <div slot="side-panel-content">
          <span>I will be visible when the panel is open!</span>
        </div>
      </gux-side-panel>`);
    const component = await page.find('gux-side-panel');
    const contentElement = await page.find('div.panel-content');

    component.setProperty('position', 'right');
    component.setProperty('isOpen', true);
    await page.waitForChanges();
    const computedStyles = await contentElement.getComputedStyle();
    expect(computedStyles.display).toEqual('block');
  });

  it('shows the panel content when it is open', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-side-panel>
        <div slot="side-panel-icons">
          <gux-side-panel-button id="settings-button" icon="genesys-icon-settings-gear" alt-text="settings gear">
          </gux-side-panel-button>
        </div>

        <div slot="side-panel-content">
          <span>I will be visible when the panel is open!</span>
        </div>
      </gux-side-panel>`);
    const component = await page.find('gux-side-panel');
    const contentElement = await page.find('div.panel-content');

    component.setProperty('position', 'right');
    component.setProperty('isOpen', false);
    await page.waitForChanges();
    const computedStyles = await contentElement.getComputedStyle();
    expect(computedStyles.display).toEqual('none');
  });
});
