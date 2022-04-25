import { newSpecPage } from '@stencil/core/testing';
import { GuxListDividerLegacy } from '../gux-list-divider';

describe('gux-list-divider', () => {
  let component: GuxListDividerLegacy;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxListDividerLegacy],
      html: `<gux-list-divider-legacy></gux-list-divider-legacy>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxListDividerLegacy);
  });
});
