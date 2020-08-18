import { newSpecPage } from '@stencil/core/testing';
import { GuxListDivider } from '../gux-list-divider';

describe('gux-list-divider', () => {
  let component: GuxListDivider;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxListDivider],
      html: `<gux-list-divider></gux-list-divider>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxListDivider);
  });
});
