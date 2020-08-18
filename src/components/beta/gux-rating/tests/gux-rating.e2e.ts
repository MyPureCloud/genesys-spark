import { newE2EPage } from '@stencil/core/testing';

describe('gux-rating', () => {
  describe('#render', () => {
    [
      '<gux-rating-beta></gux-rating-beta>',
      '<gux-rating-beta rating="0"></gux-rating-beta>',
      '<gux-rating-beta rating="1"></gux-rating-beta>',
      '<gux-rating-beta rating="2"></gux-rating-beta>',
      '<gux-rating-beta rating="3"></gux-rating-beta>',
      '<gux-rating-beta rating="4"></gux-rating-beta>',
      '<gux-rating-beta rating="5"></gux-rating-beta>',
      '<gux-rating-beta allow-half-ratings rating="0.5"></gux-rating-beta>',
      '<gux-rating-beta allow-half-ratings rating="1.5"></gux-rating-beta>',
      '<gux-rating-beta allow-half-ratings rating="2.5"></gux-rating-beta>',
      '<gux-rating-beta allow-half-ratings rating="3.5"></gux-rating-beta>',
      '<gux-rating-beta allow-half-ratings rating="4.5"></gux-rating-beta>',
      '<gux-rating-beta rating="0" max-rating=10></gux-rating-beta>',
      '<gux-rating-beta rating="5" max-rating=10></gux-rating-beta>',
      '<gux-rating-beta rating="10" max-rating=10></gux-rating-beta>',
      '<gux-rating-beta rating="3" disabled></gux-rating-beta>'
    ].forEach((content, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newE2EPage();

        await page.setContent(content);

        const element = await page.find('gux-rating-beta');

        expect(element.innerHTML).toMatchSnapshot();
      });
    });
  });
});
