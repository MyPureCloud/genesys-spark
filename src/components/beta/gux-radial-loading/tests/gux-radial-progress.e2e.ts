import { newE2EPage } from '@stencil/core/testing';

describe('gux-radial-loading', () => {
  [
    '<gux-radial-loading-beta></gux-radial-loading-beta>',
    '<gux-radial-loading-beta context="modal"></gux-radial-loading-beta>',
    '<gux-radial-loading-beta context="input"></gux-radial-loading-beta>',
    '<gux-radial-loading-beta context="full-page"></gux-radial-loading-beta>'
  ].forEach((content, index) => {
    it(`should display component as expected (${index + 1})`, async () => {
      const page = await newE2EPage();

      await page.setContent(content);

      const element = await page.find('gux-radial-loading-beta');

      expect(element.innerHTML).toMatchSnapshot();
    });
  });
});
