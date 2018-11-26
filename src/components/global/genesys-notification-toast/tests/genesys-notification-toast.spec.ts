import { GenesysNotificationToast } from '../genesys-notification-toast';

describe('genesys-notification-toast', () => {
  it('builds', () => {
    expect(new GenesysNotificationToast()).toBeTruthy();
  });
  describe('getAccent', () => {
    it('should return neutral if props/attr is not set correctly', () => {
      const component = new GenesysNotificationToast();
      expect(component.getAccent()).toBe('neutral');
      component.accent = 'aaaaaa';
      expect(component.getAccent()).toBe('neutral');
    });
    it('should return accent in lowercase if props/attr is set correctly', () => {
      const component = new GenesysNotificationToast();
      expect(component.getAccent()).toBe('neutral');
      component.accent = 'PoSitive';
      expect(component.getAccent()).toBe('positive');
    });
  });
  describe('getIconClass', () => {
    it('should return icon and accent classname', () => {
      const component = new GenesysNotificationToast();
      expect(component.getIconClass('test')).toBe('genesys-icon-test neutral');
      expect(component.getIconClass('genesys-icon-test')).toBe('genesys-icon-test neutral');
    });
  });
  describe('getIcon', () => {
    it('should return icon and accent classname', () => {
      const component = new GenesysNotificationToast();
      expect(component.getIcon()).toBe('');
      component.iconUri = 'test';
      // testing JSX
      expect((component.getIcon() as any).vtag).toBe('img');
      expect((component.getIcon() as any).vattrs.src).toBe('test');
    });
  });
  
});



