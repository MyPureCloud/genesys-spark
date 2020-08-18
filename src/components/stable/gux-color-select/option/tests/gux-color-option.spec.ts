import { newSpecPage } from '@stencil/core/testing';
import { GuxColorOption } from '../gux-color-option';

describe('gux-color-option', () => {
  let component: GuxColorOption;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxColorOption],
      html: `<gux-color-option></gux-color-option>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxColorOption);
  });
});
