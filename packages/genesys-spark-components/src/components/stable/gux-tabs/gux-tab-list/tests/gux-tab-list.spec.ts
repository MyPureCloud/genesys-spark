import { newSpecPage } from '@test/specTestUtils';
import { GuxTabList } from '../gux-tab-list';
import { renderConfig } from './gux-tab-list.common';

describe('gux-tab-list', () => {
  let component: GuxTabList;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTabList],
      html: renderConfig.html,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxTabList);
  });
});
