import { newSpecPage } from '@stencil/core/testing';
import { GuxRadio } from '../gux-radio';

describe('gux-radio', () => {
  let component: GuxRadio;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxRadio],
      html: `<gux-radio></gux-radio>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxRadio);
  });
});
