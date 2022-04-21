import { newSpecPage } from '@stencil/core/testing';
import { GuxCard } from '../gux-card';

const components = [GuxCard];
const language = 'en';

describe('#render different card variations eg(outline,outline(explicit),filled,raised)', () => {
  [
    '<gux-card-beta><span>This is a content slot</span></gux-card-beta>',
    '<gux-card-beta accent="outline"><span>This is a content slot</span></gux-card-beta>',
    '<gux-card-beta accent="raised"><span>This is a content slot</span></gux-card-beta>',
    '<gux-card-beta accent="filled"><span>This is a content slot</span></gux-card-beta>'
  ].forEach((html, index) => {
    it(`should render component as expected (${index + 1})`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });
  });
});
