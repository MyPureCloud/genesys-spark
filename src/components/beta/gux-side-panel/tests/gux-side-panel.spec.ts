import { newSpecPage } from '@stencil/core/testing';
import { GuxSidePanel } from '../gux-side-panel';

describe('gux-side-panel', () => {
  let component: GuxSidePanel;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxSidePanel],
      html: `<gux-side-panel-beta></gux-side-panel-beta>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxSidePanel);
  });

  describe('Class Logic', () => {
    describe('containerClass', () => {
      it('should return the correct class for closed, left, panels', () => {
        component.position = 'left';
        component.isOpen = false;

        expect(component.containerClass).toEqual('gux-left gux-closed');
      });

      it('should return the correct class for closed, right, panels', () => {
        component.position = 'right';
        component.isOpen = false;

        expect(component.containerClass).toEqual('gux-right gux-closed');
      });

      it('should return the correct class for open, left, panels', () => {
        component.position = 'left';
        component.isOpen = true;

        expect(component.containerClass).toEqual('gux-left gux-open');
      });

      it('should return the correct class for open, right, panels', () => {
        component.position = 'right';
        component.isOpen = true;

        expect(component.containerClass).toEqual('gux-right gux-open');
      });
    });

    describe('contentClass', () => {
      it('should return the correct class for an open panel', () => {
        component.isOpen = false;

        expect(component.contentClass).toEqual('gux-panel-content gux-closed');
      });

      it('should return the correct class for closed, right, panels', () => {
        component.isOpen = true;

        expect(component.contentClass).toEqual('gux-panel-content gux-open');
      });
    });
  });
});
