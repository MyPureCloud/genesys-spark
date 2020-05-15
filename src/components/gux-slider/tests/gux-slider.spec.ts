import { newSpecPage } from '@stencil/core/testing';
import { GuxSlider } from '../gux-slider';

describe('gux-slider', () => {
  let component: GuxSlider;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxSlider],
      html: `<gux-slider></gux-slider>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxSlider);
  });
});
