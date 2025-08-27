import { newSpecPage } from '@test/specTestUtils';
import { GuxTextHighlight } from '../gux-text-highlight';
import { renderConfigs } from './gux-text-highlight.common';

const components = [GuxTextHighlight];
const language = 'en';

describe('gux-text-highlight', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxTextHighlight);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
