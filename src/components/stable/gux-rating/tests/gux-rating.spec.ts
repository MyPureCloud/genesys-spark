jest.mock('../../../../utils/dom/random-html-id', () => ({
  randomHTMLId: () => 'random'
}));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { GuxRating } from '../gux-rating';

global.InputEvent = Event;

const components = [GuxRating];
const language = 'en';

describe('gux-rating', () => {
  it('should build', async () => {
    const html = `<gux-rating></gux-rating>`;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxRating);
  });

  describe('#render', () => {
    [
      '<gux-rating></gux-rating>',
      '<gux-rating value="0"></gux-rating>',
      '<gux-rating value="0.5"></gux-rating>',
      '<gux-rating value="1"></gux-rating>',
      '<gux-rating value="1.5"></gux-rating>',
      '<gux-rating value="2"></gux-rating>',
      '<gux-rating value="2.5"></gux-rating>',
      '<gux-rating value="3"></gux-rating>',
      '<gux-rating value="3.5"></gux-rating>',
      '<gux-rating value="4"></gux-rating>',
      '<gux-rating value="4.5"></gux-rating>',
      '<gux-rating value="5"></gux-rating>',
      '<gux-rating value="0" max-value=10></gux-rating>',
      '<gux-rating value="5" max-value=10></gux-rating>',
      '<gux-rating value="10" max-value=10></gux-rating>',
      '<gux-rating value="3" disabled></gux-rating>',
      '<gux-rating value="3" readonly></gux-rating>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
