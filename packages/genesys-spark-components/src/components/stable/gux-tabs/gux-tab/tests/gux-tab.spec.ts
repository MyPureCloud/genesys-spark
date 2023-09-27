import { newSpecPage } from '@test/specTestUtils';
import { GuxTab } from '../gux-tab';

describe('gux-tab', () => {
  let component: GuxTab;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTab],
      html: `<gux-tab></gux-tab>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxTab);
  });
});
