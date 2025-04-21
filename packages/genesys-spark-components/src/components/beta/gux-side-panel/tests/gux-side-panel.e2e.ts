import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

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

  return page;
}

describe('side panel', () => {
  it('should render', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-side-panel-beta>
            <gux-side-panel-header slot="header">
              <gux-side-panel-heading slot="title" level="3">
                Side panel title
              </gux-side-panel-heading>
              <h2 slot="description">Description goes here</h2>
            </gux-side-panel-header>
            <div slot="content">
              Content goes here.
            </div>
            <div slot="footer">
              <gux-cta-group>
                <gux-button slot="primary">Primary</gux-button>
                <gux-button slot="secondary">Secondary</gux-button>
                <gux-button slot="dismiss">Dismiss</gux-button>
              </gux-cta-group>
            </div>
          </gux-side-panel-beta>`
    });
    const element = await page.find('gux-side-panel-beta');

    expect(element.outerHTML).toMatchSnapshot();

    await a11yCheck(page);
  });
});

describe('modal side panel', () => {
  const html = `<gux-modal-side-panel-beta>
            <gux-side-panel-header slot="header">
              <gux-side-panel-heading slot="title" level="2">
                Side panel title
              </gux-side-panel-heading>
              <h2 slot="description">Description goes here</h2>
            </gux-side-panel-header>
            <div slot="content">
              Content goes here.
            </div>
            <div slot="footer">
              <gux-cta-group>
                <gux-button slot="primary">Primary</gux-button>
                <gux-button slot="secondary">Secondary</gux-button>
                <gux-button slot="dismiss">Dismiss</gux-button>
              </gux-cta-group>
            </div>
          </gux-modal-side-panel-beta>`;

  it('should render', async () => {
    const page = await newNonrandomE2EPage({ html });
    const element = await page.find('gux-modal-side-panel-beta');

    expect(element.outerHTML).toMatchSnapshot();
  });

  it('should pass accessibility tests', async () => {
    const page = await newSparkE2EPage({ html });
    await a11yCheck(page);
  });

  it('should show/hide when toggling the open attribute', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-modal-side-panel-beta');
    const dialog = await page.find('pierce/dialog');

    expect(element.getAttribute('open')).toBe(null);
    expect(await dialog.isVisible()).toBe(false);

    element.setAttribute('open', '');
    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(true);
  });

  it('should close when clicking the dismiss button', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-modal-side-panel-beta');
    const dialog = await page.find('pierce/dialog');
    const dismissButton = await page.find('pierce/gux-dismiss-button');
    const innerDismissButton = await dismissButton.find('pierce/button');

    element.setAttribute('open', '');
    await page.waitForChanges();
    await dialog.waitForVisible();
    expect(await dialog.isVisible()).toBe(true);

    await innerDismissButton.click();

    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(false);
  });

  it('it should toggle when showModal or close is called', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-modal-side-panel-beta');
    const dialog = await page.find('pierce/dialog');

    expect(element.getAttribute('open')).toBe(null);
    expect(await dialog.isVisible()).toBe(false);

    await element.callMethod('showModal');
    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(true);

    await element.callMethod('close');
    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(false);
  });
});
