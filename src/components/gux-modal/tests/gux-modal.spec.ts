import { newSpecPage } from '@stencil/core/testing';
import { GuxModal } from '../gux-modal';

describe('gux-modal', () => {
  let component: GuxModal;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxModal],
      html: `<gux-modal></gux-modal>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxModal);
  });
});
