import { newSpecPage } from '@stencil/core/testing';
import { GuxTabListBeta } from '../gux-tab-list-beta';
import MutationObserver from 'mutation-observer';

describe('gux-tab-list-beta', () => {
  let component: GuxTabListBeta;

  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;

    const page = await newSpecPage({
      components: [GuxTabListBeta],
      html: `<gux-tab-list-beta></gux-tab-list-beta>`,
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
