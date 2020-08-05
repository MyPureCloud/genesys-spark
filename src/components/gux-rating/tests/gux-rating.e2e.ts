import { newE2EPage } from '@stencil/core/testing';

describe('gux-rating', () => {
  describe('#render', () => {
    [
      '<gux-rating></gux-rating>',
      '<gux-rating rating="0"></gux-rating>',
      '<gux-rating rating="1"></gux-rating>',
      '<gux-rating rating="2"></gux-rating>',
      '<gux-rating rating="3"></gux-rating>',
      '<gux-rating rating="4"></gux-rating>',
      '<gux-rating rating="5"></gux-rating>',
      '<gux-rating allow-half-ratings rating="0.5"></gux-rating>',
      '<gux-rating allow-half-ratings rating="1.5"></gux-rating>',
      '<gux-rating allow-half-ratings rating="2.5"></gux-rating>',
      '<gux-rating allow-half-ratings rating="3.5"></gux-rating>',
      '<gux-rating allow-half-ratings rating="4.5"></gux-rating>',
      '<gux-rating rating="0" max-rating=10></gux-rating>',
      '<gux-rating rating="5" max-rating=10></gux-rating>',
      '<gux-rating rating="10" max-rating=10></gux-rating>',
      '<gux-rating rating="3" disabled></gux-rating>'
    ].forEach((content, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newE2EPage();

        await page.setContent(content);

        const element = await page.find('gux-rating');

        expect(element.innerHTML).toMatchSnapshot();
      });
    });
  });
});
