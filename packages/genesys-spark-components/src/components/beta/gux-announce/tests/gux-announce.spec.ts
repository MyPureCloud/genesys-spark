import { newSpecPage } from '@test/specTestUtils';
import { GuxAnnounce } from '../gux-announce';

const components = [GuxAnnounce];
const language = 'en';

describe('gux-announce-beta', () => {
  describe('#render', () => {
    [
      '<gux-announce-beta> This is some text to read </gux-announce-beta>',
      '<gux-announce-beta politeness="assertive"> This is some text to read </gux-announce-beta>',
      '<gux-announce-beta politeness="off"> This is some text to read </gux-announce-beta>',
      '<gux-announce-beta politeness="polite"> This is some text to read </gux-announce-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
