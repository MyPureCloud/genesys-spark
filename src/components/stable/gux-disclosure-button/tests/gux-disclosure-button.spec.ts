import { newSpecPage } from '@stencil/core/testing';
import { GuxDisclosureButton } from '../gux-disclosure-button';

describe('gux-disclosure-button', () => {
  let component: GuxDisclosureButton;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxDisclosureButton],
      html: `<gux-disclosure-button></gux-disclosure-button>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxDisclosureButton);
  });

  describe('Class Logic', () => {
    describe('togglePanel', () => {
      it('should toggle the isOpen property', async () => {
        expect(component.isOpen).toBe(false);

        component.togglePanel();

        expect(component.isOpen).toBe(true);
      });
    });
  });
});
