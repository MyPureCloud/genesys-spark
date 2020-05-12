import { newSpecPage } from '@stencil/core/testing';
import { GuxCommandAction } from '../gux-command-action';

describe('gux-command-action', () => {
  let component: GuxCommandAction;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxCommandAction],
      html: `<gux-command-action></gux-command-action>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxCommandAction);
  });
});
