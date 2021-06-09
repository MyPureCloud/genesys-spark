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

  it('should add an aria-label with the provided screenreader-text to the progressbar', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-page-loading-spinner screenreader-text="Loading Content"></gux-page-loading-spinner>'
    );

    const progressbar = await page.find(
      'gux-radial-loading div[role="progressbar"]'
    );

    expect(progressbar.getAttribute('aria-label')).toEqual('Loading Content');
  });

  it('should add the default aria-label text if no screenreader-text is provided', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-page-loading-spinner></gux-page-loading-spinner>'
    );

    const progressbar = await page.find(
      'gux-radial-loading div[role="progressbar"]'
    );

    expect(progressbar.getAttribute('aria-label')).toEqual('Loading');
  });
});
