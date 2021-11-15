import { newSpecPage } from '@stencil/core/testing';
import { GuxTabLegacy } from '../gux-tab-legacy';

describe('gux-tab-legacy', () => {
  let component: GuxTabLegacy;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTabLegacy],
      html: `<gux-tab-legacy></gux-tab-legacy>`,
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
