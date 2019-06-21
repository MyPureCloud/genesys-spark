import { GuxNotificationToast } from '../gux-notification-toast';

describe('gux-notification-toast', () => {
  it('builds', () => {
    expect(new GuxNotificationToast()).toBeTruthy();
  });

  describe('getAccent', () => {
    it('should return neutral if props/attr is not set correctly', () => {
      const component = new GuxNotificationToast();
      expect(component.getAccent()).toBe('neutral');
      component.accent = 'aaaaaa';
      expect(component.getAccent()).toBe('neutral');
    });
    it('should return accent in lowercase if props/attr is set correctly', () => {
      const component = new GuxNotificationToast();
      expect(component.getAccent()).toBe('neutral');
      component.accent = 'PoSitive';
      expect(component.getAccent()).toBe('positive');
    });
  });

  describe('getIcon', () => {
    it('should return icon and accent classname', () => {
      const component = new GuxNotificationToast();
      expect(component.getIcon()).toBe('');
      component.iconUri = 'test';
      // testing JSX
      expect((component.getIcon() as any).$tag$).toBe('img');
      expect((component.getIcon() as any).$attrs$.src).toBe('test');
      component.icon = 'test';
      expect((component.getIcon() as any).$tag$).toBe('i');
      expect((component.getIcon() as any).$attrs$.class).toBe('test');
    });
  });
});
