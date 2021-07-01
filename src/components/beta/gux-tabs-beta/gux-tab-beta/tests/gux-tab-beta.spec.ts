import { newSpecPage } from '@stencil/core/testing';
import { GuxTabBeta } from '../gux-tab-beta';

describe('gux-tab', () => {
  let component: GuxTabBeta;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTabBeta],
      html: `<gux-tab-beta></gux-tab-beta>`,
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
