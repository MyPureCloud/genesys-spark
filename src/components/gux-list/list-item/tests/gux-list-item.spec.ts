import { newSpecPage } from '@stencil/core/testing';
import { GuxListItem } from '../gux-list-item';

describe('gux-list-item', () => {
  let component: GuxListItem;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxListItem],
      html: `<gux-list-item></gux-list-item>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxListItem);
  });
});
