import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';
import { GuxListLegacy } from '../gux-list';

describe('gux-list', () => {
  let component: GuxListLegacy;

  beforeEach(async () => {
    global.MutationObserver = MutationObserver;

    const page = await newSpecPage({
      components: [GuxListLegacy],
      html: `<gux-list-legacy></gux-list-legacy>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxListLegacy);
  });
});
