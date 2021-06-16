import { newE2EPage } from '@stencil/core/testing';

describe('gux-radial-loading', () => {
  [
    '<gux-radial-loading></gux-radial-loading>',
    '<gux-radial-loading context="modal"></gux-radial-loading>',
    '<gux-radial-loading context="input"></gux-radial-loading>',
    '<gux-radial-loading context="full-page"></gux-radial-loading>'
  ].forEach((content, index) => {
    it(`should display component as expected (${index + 1})`, async () => {
      const page = await newE2EPage();

      await page.setContent(content);

      const element = await page.find('gux-radial-loading');

      expect(element.innerHTML).toMatchSnapshot();
    });
  });

  it('should add an aria-label with the provided screenreader-text to the progressbar', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-radial-loading screenreader-text="Loading Content"></gux-radial-loading>'
    );

    const progressbar = await page.find(
      'gux-radial-loading div[role="progressbar"]'
    );

    expect(progressbar.getAttribute('aria-label')).toEqual('Loading Content');
  });

  it('should add the default aria-label text if no screenreader-text is provided', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-radial-loading></gux-radial-loading>');

    const progressbar = await page.find(
      'gux-radial-loading div[role="progressbar"]'
    );

    expect(progressbar.getAttribute('aria-label')).toEqual('Loading');
  });
});
