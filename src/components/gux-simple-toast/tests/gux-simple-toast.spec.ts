import { GuxSimpleToast } from '../gux-simple-toast';

describe('gux-simple-toast', () => {
  it('builds', () => {
    expect(new GuxSimpleToast()).toBeTruthy();
  });

  describe('getAccent', () => {
    it('should return neutral if props/attr is not set correctly', () => {
      const component = new GuxSimpleToast();
      expect(component.getAccent()).toBe('neutral');
      component.accent = 'aaaaaa';
      expect(component.getAccent()).toBe('neutral');
    });
    it('should return accent in lowercase if props/attr is set correctly', () => {
      const component = new GuxSimpleToast();
      expect(component.getAccent()).toBe('neutral');
      component.accent = 'PoSitive';
      expect(component.getAccent()).toBe('positive');
    });
  });

  describe('getIcon', () => {
    it('should return icon and accent classname', () => {
      const component = new GuxSimpleToast();
      expect(component.getIcon()).toBe('');
      component.iconUri = 'test';
      // testing JSX
      expect((component.getIcon() as any).$tag$).toBe('img');
      expect((component.getIcon() as any).$attrs$.src).toBe('test');
      component.icon = 'test';
      // testing JSX
      expect((component.getIcon() as any).$tag$).toBe('gux-icon');
      expect((component.getIcon() as any).$attrs$.iconName).toBe('test');
    });
  });
});
