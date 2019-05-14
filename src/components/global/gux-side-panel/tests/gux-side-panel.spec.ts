import { GuxSidePanel } from '../gux-side-panel';

describe('gux-side-panel', () => {
  it('builds', () => {
    const component = new GuxSidePanel();
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();
  });

  describe('containerClass', () => {
    it('should return the correct class for closed, left, panels', () => {
      const component = new GuxSidePanel();
      component.position = 'left';
      component.isOpen = false;
      expect(component.containerClass).toEqual('panel-icons left closed');
    });

    it('should return the correct class for closed, right, panels', () => {
      const component = new GuxSidePanel();
      component.position = 'right';
      component.isOpen = false;
      expect(component.containerClass).toEqual('panel-icons right closed');
    });

    it('should return the correct class for open, left, panels', () => {
      const component = new GuxSidePanel();
      component.position = 'left';
      component.isOpen = true;
      expect(component.containerClass).toEqual('panel-icons left open');
    });

    it('should return the correct class for open, right, panels', () => {
      const component = new GuxSidePanel();
      component.position = 'right';
      component.isOpen = true;
      expect(component.containerClass).toEqual('panel-icons right open');
    });
  });

  describe('contentClass', () => {
    it('should return the correct class for an open panel', () => {
      const component = new GuxSidePanel();
      component.isOpen = false;
      expect(component.contentClass).toEqual('panel-content closed');
    });

    it('should return the correct class for closed, right, panels', () => {
      const component = new GuxSidePanel();
      component.isOpen = true;
      expect(component.contentClass).toEqual('panel-content open');
    });
  });
});
