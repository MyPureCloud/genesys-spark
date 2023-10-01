import { newSpecPage } from '@test/specTestUtils';
import { GuxCard } from '../gux-card';

const components = [GuxCard];
const language = 'en';

describe('#render different card accents', () => {
  [
    '<gux-card><span>This is a content slot</span></gux-card>',
    '<gux-card accent="bordered"><span>This is a content slot</span></gux-card>',
    '<gux-card accent="raised"><span>This is a content slot</span></gux-card>',
    '<gux-card accent="borderless"><span>This is a content slot</span></gux-card>'
  ].forEach((html, index) => {
    it(`should render component as expected (${index + 1})`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });
  });
});
