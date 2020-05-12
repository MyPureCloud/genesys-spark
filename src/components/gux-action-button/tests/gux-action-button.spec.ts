import { newSpecPage } from '@stencil/core/testing';
import { GuxActionButton } from '../gux-action-button';

describe('gux-action-button', () => {
  let component: GuxActionButton;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxActionButton],
      html: `<gux-action-button></gux-action-button>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxActionButton);
  });
});
