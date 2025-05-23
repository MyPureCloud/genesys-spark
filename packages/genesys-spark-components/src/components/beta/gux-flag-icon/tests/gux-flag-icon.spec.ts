import { newSpecPage } from '@test/specTestUtils';
import { GuxFlagIconBeta } from '../gux-flag-icon';
import { flagConfigs } from './gux-flag-icon.common';

const components = [GuxFlagIconBeta];
const language = 'en';

describe('gux-flag-icon-beta', () => {
  describe('#render different flags', () => {
    flagConfigs.forEach(flag => {
      it(flag.description, async () => {
        const html = flag.html;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });

    it('should render component with screenreader text as expected', async () => {
      const html = `<gux-flag-icon-beta flag="IE" screenreader-text="Irish flag"></gux-flag-icon-beta>`;
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });
  });
});
