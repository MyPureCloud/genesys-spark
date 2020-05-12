import { newSpecPage } from '@stencil/core/testing';
import { GuxColorPicker } from '../gux-color-picker';

describe('gux-color-picker', () => {
  let component: GuxColorPicker;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxColorPicker],
      html: `<gux-color-picker></gux-color-picker>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxColorPicker);
  });
});
