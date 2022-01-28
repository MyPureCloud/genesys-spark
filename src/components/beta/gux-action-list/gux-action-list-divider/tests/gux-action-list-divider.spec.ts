import { newSpecPage } from '@stencil/core/testing';
import { GuxActionListDivider } from '../gux-action-list-divider';

describe('gux-list-divider', () => {
  let component: GuxActionListDivider;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxActionListDivider],
      html: `<gux-action-list-divider></gux-action-list-divider>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxActionListDivider);
  });
});
