import { newSpecPage } from '@stencil/core/testing';
import { GuxSidePanelButton } from '../gux-side-panel-button';

describe('gux-side-panel-button', () => {
  let component: GuxSidePanelButton;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxSidePanelButton],
      html: `<gux-side-panel-button></gux-side-panel-button>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxSidePanelButton);
  });

  describe('Class Logic', () => {
    it('should return the correct button class if it is selected', () => {
      component.isSelected = true;

      expect(component.buttonClass).toEqual('selected');
    });

    it('should return the correct button class if it is not selected', () => {
      component.isSelected = false;

      expect(component.buttonClass).toEqual('');
    });
  });
});
