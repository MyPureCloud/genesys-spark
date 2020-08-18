import { newSpecPage } from '@stencil/core/testing';
import { GuxActionItem } from '../gux-action-item';

describe('gux-action-item', () => {
  let component: GuxActionItem;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxActionItem],
      html: `<gux-action-item></gux-action-item>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxActionItem);
  });
});
