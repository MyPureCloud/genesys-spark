import { newSpecPage } from '@test/specTestUtils';
import { GuxList } from '../gux-list';
import { GuxListDivider } from '../gux-list-divider/gux-list-divider';
import { GuxListItem } from '../gux-list-item/gux-list-item';
import { renderConfig } from './gux-list.common';

const components = [GuxList, GuxListDivider, GuxListItem];
const language = 'en';

describe('gux-list', () => {
  it(renderConfig.description, async () => {
    const page = await newSpecPage({
      components,
      html: renderConfig.html,
      language
    });

    expect(page.root).toMatchSnapshot();
  });
});
