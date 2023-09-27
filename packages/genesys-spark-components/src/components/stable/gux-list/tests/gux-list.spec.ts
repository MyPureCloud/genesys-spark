import { newSpecPage } from '@test/specTestUtils';
import { GuxList } from '../gux-list';
import { GuxListDivider } from '../gux-list-divider/gux-list-divider';
import { GuxListItem } from '../gux-list-item/gux-list-item';

const components = [GuxList, GuxListDivider, GuxListItem];
const language = 'en';

describe('gux-list', () => {
  describe('#render', () => {
    it('should render component as expected', async () => {
      const html = `
        <gux-list id="list">
          <gux-list-item>Test1</gux-list-item>
          <gux-list-divider></gux-list-divider>
          <gux-list-item>Test2</gux-list-item>
          <gux-list-item>Test3</gux-list-item>
          <gux-list-item>Test4</gux-list-item>
        </gux-list>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });
  });
});
