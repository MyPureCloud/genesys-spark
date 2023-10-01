import { newSpecPage } from '@test/specTestUtils';
import { GuxTabList } from '../gux-tab-list';

describe('gux-tab-list', () => {
  let component: GuxTabList;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTabList],
      html: `<gux-tab-list></gux-tab-list>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxTabList);
  });
});
