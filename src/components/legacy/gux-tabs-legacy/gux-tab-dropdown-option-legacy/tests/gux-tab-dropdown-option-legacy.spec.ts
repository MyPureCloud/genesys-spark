import { newSpecPage } from '@stencil/core/testing';
import { GuxTabDropdownOptionLegacy } from '../gux-tab-dropdown-option-legacy';

describe('gux-tab-dropdown-option-legacy', () => {
  let component: GuxTabDropdownOptionLegacy;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTabDropdownOptionLegacy],
      html: `<gux-tab-dropdown-option-legacy></gux-tab-dropdown-option-legacy>`,
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
