import { newSpecPage } from '@stencil/core/testing';
import { GuxButtonMultiLegacy } from '../gux-button-multi';

describe('gux-button-multi-legacy', () => {
  let component: GuxButtonMultiLegacy;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxButtonMultiLegacy],
      html: `<gux-button-multi-legacy></gux-button-multi-legacy>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxButtonMultiLegacy);
  });
});
