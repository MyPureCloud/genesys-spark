import { newSpecPage } from '@stencil/core/testing';
import { GuxCommandPalette } from '../gux-command-palette';

describe('gux-command-palette', () => {
  let component: GuxCommandPalette;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxCommandPalette],
      html: `<gux-command-palette></gux-command-palette>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxCommandPalette);
  });
});
