import { newSpecPage } from '@stencil/core/testing';
import { GuxToggle } from '../gux-toggle';

describe('gux-toggle', () => {
  let component: GuxToggle;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxToggle],
      html: `<gux-toggle></gux-toggle>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxToggle);
  });
});
