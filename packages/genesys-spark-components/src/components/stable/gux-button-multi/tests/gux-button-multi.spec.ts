import { newSpecPage } from '@test/specTestUtils';
import { GuxButtonMulti } from '../gux-button-multi';

describe('gux-button-multi', () => {
  let component: GuxButtonMulti;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxButtonMulti],
      html: `<gux-button-multi></gux-button-multi>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxButtonMulti);
  });
});
