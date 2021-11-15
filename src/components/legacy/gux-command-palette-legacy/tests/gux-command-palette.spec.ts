import { newSpecPage } from '@stencil/core/testing';
import { GuxCommandPaletteLegacy } from '../gux-command-palette';

describe('gux-command-palette', () => {
  let component: GuxCommandPaletteLegacy;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxCommandPaletteLegacy],
      html: `<gux-command-palette-legacy></gux-command-palette-legacy>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxCommandPaletteLegacy);
  });
});
