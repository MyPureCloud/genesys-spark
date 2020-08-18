import { newE2EPage } from '@stencil/core/testing';

describe('gux-panel-frame', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-panel-frame-beta></gux-panel-frame-beta>');
    const element = await page.find('gux-panel-frame-beta');
    expect(element).toHaveClass('hydrated');
  });

  it('should render all parts', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-panel-frame-beta><div slot="header"></div><div slot="body"></div><div slot="footer"></div></gux-panel-frame-beta>'
    );
    const header = await page.find('.gux-panel-header');
    const body = await page.find('.gux-panel-body');
    const footer = await page.find('.gux-panel-footer');
    expect(header).toBeTruthy();
    expect(body).toBeTruthy();
    expect(footer).toBeTruthy();
  });

  it('should not render any part', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-panel-frame-beta><div slot="nothing"></div></gux-panel-frame-beta>'
    );
    const header = await page.find('.gux-panel-header');
    const body = await page.find('.gux-panel-body');
    const footer = await page.find('.gux-panel-footer');
    expect(header).toBeFalsy();
    expect(body).toBeFalsy();
    expect(footer).toBeFalsy();
  });
});
