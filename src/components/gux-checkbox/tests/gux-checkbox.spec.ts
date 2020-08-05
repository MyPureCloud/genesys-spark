import { newSpecPage } from '@stencil/core/testing';
import { GuxCheckbox } from '../gux-checkbox';

describe('gux-checkbox', () => {
  let component: GuxCheckbox;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxCheckbox],
      html: `<gux-checkbox></gux-checkbox>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxCheckbox);
  });
});
