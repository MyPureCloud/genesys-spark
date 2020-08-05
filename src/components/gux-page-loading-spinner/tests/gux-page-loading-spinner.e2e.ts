import { newE2EPage } from '@stencil/core/testing';

describe('gux-page-loading-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-page-loading-spinner></gux-page-loading-spinner>'
    );

    const element = await page.find('gux-page-loading-spinner');

    expect(element.outerHTML).toMatchSnapshot();
  });
});
