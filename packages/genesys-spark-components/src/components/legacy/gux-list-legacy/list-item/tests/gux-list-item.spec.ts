import { newSpecPage } from '@stencil/core/testing';
import { GuxListItemLegacy } from '../gux-list-item';

describe('gux-list-item', () => {
  let component: GuxListItemLegacy;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxListItemLegacy],
      html: `<gux-list-item-legacy></gux-list-item-legacy>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxListItemLegacy);
  });
});
