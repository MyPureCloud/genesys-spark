import { newSpecPage } from '@test/specTestUtils';
import { GuxRating } from '../gux-rating';

const components = [GuxRating];
const language = 'en';

describe('gux-rating', () => {
  it('should build', async () => {
    const html = `<gux-rating aria-label="Feedback"></gux-rating>`;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxRating);
  });

  describe('#render', () => {
    [
      '<gux-rating aria-label="Feedback"></gux-rating>',
      '<gux-rating value="0" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="0.5" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="1" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="1.5" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="2" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="2.5" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="3" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="3.5" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="4" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="4.5" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="5" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="0" increment="1" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="1" increment="1" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="2 increment="1" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="3" increment="1" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="4" increment="1" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="5" increment="1" aria-label="Feedback"></gux-rating>',
      '<gux-rating value="0" max-value=10 aria-label="Feedback"></gux-rating>',
      '<gux-rating value="5" max-value=10 aria-label="Feedback"></gux-rating>',
      '<gux-rating value="10" max-value=10 aria-label="Feedback"></gux-rating>',
      '<gux-rating value="3" disabled aria-label="Feedback"></gux-rating>',
      '<gux-rating value="3" readonly aria-label="Feedback"></gux-rating>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
