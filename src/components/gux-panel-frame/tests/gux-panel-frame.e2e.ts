import { newE2EPage } from '@stencil/core/testing';

describe('gux-panel-frame', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-panel-frame></gux-panel-frame>');
    const element = await page.find('gux-panel-frame');
    expect(element).toHaveClass('hydrated');
  });

  it('should render all parts', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-panel-frame><div slot="header"></div><div slot="body"></div><div slot="footer"></div></gux-panel-frame>'
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
      '<gux-panel-frame><div slot="nothing"></div></gux-panel-frame>'
    );
    const header = await page.find('.gux-panel-header');
    const body = await page.find('.gux-panel-body');
    const footer = await page.find('.gux-panel-footer');
    expect(header).toBeFalsy();
    expect(body).toBeFalsy();
    expect(footer).toBeFalsy();
  });
});
