import { newSpecPage } from '@stencil/core/testing';
import { GuxTabPanelBeta } from '../gux-tab-panel-beta';

describe('gux-tab-panel-beta', () => {
  let component: GuxTabPanelBeta;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTabPanelBeta],
      html: `<gux-tab-panel-beta></gux-tab-panel-beta>`,
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
