import { newSpecPage } from '@stencil/core/testing';
import { GuxTextHighlight } from '../gux-text-highlight';

describe('gux-text-highlight', () => {
  let component: GuxTextHighlight;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTextHighlight],
      html: `<gux-text-highlight></gux-text-highlight>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxTextHighlight);
  });
});
