import { newSpecPage } from '@test/specTestUtils';
import { GuxTabPanel } from '../gux-tab-panel';

describe('gux-tab-panel', () => {
  let component: GuxTabPanel;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTabPanel],
      html: `<gux-tab-panel></gux-tab-panel>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxTabPanel);
  });
});
