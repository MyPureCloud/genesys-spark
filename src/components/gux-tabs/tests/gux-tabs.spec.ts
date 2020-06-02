import { newSpecPage } from '@stencil/core/testing';
import { GuxTabs } from '../gux-tabs';

describe('gux-tabs', () => {
  let component: GuxTabs;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTabs],
      html: `<gux-tabs></gux-tabs>`,
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
