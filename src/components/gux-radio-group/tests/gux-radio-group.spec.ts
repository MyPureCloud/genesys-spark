import { newSpecPage } from '@stencil/core/testing';
import { GuxRadioGroup } from '../gux-radio-group';

describe('gux-radio-group', () => {
  let component: GuxRadioGroup;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxRadioGroup],
      html: `<gux-radio-group></gux-radio-group>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxRadioGroup);
  });
});
