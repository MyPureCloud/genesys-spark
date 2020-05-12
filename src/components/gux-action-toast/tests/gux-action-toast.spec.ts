import { newSpecPage } from '@stencil/core/testing';
import { GuxActionToast } from '../gux-action-toast';

describe('gux-action-toast', () => {
  let component: GuxActionToast;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxActionToast],
      html: `<gux-action-toast></gux-action-toast>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxActionToast);
  });
});
