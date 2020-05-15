import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';
import { GuxList } from '../gux-list';

describe('gux-list', () => {
  let component: GuxList;

  beforeEach(async () => {
    global.MutationObserver = MutationObserver;

    const page = await newSpecPage({
      components: [GuxList],
      html: `<gux-list></gux-list>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxList);
  });
});
