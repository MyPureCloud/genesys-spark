import { newSpecPage } from '@stencil/core/testing';
import { GuxSearch } from '../gux-search';

describe('gux-search', () => {
  let component: GuxSearch;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxSearch],
      html: `<gux-search></gux-search>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxSearch);
  });
});
