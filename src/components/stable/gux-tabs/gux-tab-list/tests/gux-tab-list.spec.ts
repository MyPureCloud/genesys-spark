import { newSpecPage } from '@stencil/core/testing';
import { GuxTabList } from '../gux-tab-list';
import MutationObserver from 'mutation-observer';

describe('gux-tab-list', () => {
  let component: GuxTabList;

  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;

    const page = await newSpecPage({
      components: [GuxTabList],
      html: `<gux-tab-list></gux-tab-list>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  describe('Class Logic', () => {
    it('should pass', () => {
      expect(true).toBeTruthy();
    });
  });
});
