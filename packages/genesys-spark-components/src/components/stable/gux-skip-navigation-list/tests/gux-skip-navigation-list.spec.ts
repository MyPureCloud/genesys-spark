import { newSpecPage } from '@test/specTestUtils';
import { GuxSkipNavigationList } from '../gux-skip-navigation-list';
import { GuxSkipNavigationItem } from '../gux-skip-navigation-item/gux-skip-navigation-item';

const components = [GuxSkipNavigationList, GuxSkipNavigationItem];
const language = 'en';

describe('gux-skip-navigation-list', () => {
  describe('#render', () => {
    it(`should render the component as expected`, async () => {
      const html = `
        <gux-skip-navigation-list>
          <gux-skip-navigation-item>
            <a href="#" onclick="notify(event)">Navigation Link 1</a>
          </gux-skip-navigation-item>
          <gux-skip-navigation-item>
            <a href="#" onclick="notify(event)">Navigation Link 2 that is long</a>
          </gux-skip-navigation-item>
          <gux-skip-navigation-item>
            <a href="#" onclick="notify(event)">Navigation Link 3</a>
          </gux-skip-navigation-item>
          <gux-skip-navigation-item>
            <a href="#" onclick="notify(event)">Link 4</a>
          </gux-skip-navigation-item>
        </gux-skip-navigation-list>
      `;
      const page = await newSpecPage({ components, language, html });

      expect(page.root).toMatchSnapshot();
    });
  });
});
