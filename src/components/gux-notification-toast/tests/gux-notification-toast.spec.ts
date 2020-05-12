import { newSpecPage } from '@stencil/core/testing';
import { GuxNotificationToast } from '../gux-notification-toast';

describe('gux-notification-toast', () => {
  let component: GuxNotificationToast;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxNotificationToast],
      html: `<gux-notification-toast></gux-notification-toast>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxNotificationToast);
  });

  describe('Class Logic', () => {
    describe('getAccent', () => {
      it('should return neutral if props/attr is not set correctly', () => {
        expect(component.getAccent()).toBe('neutral');
        component.accent = 'aaaaaa';
        expect(component.getAccent()).toBe('neutral');
      });

      it('should return accent in lowercase if props/attr is set correctly', () => {
        expect(component.getAccent()).toBe('neutral');
        component.accent = 'PoSitive';
        expect(component.getAccent()).toBe('positive');
      });
    });

    describe('getIcon', () => {
      it('should return icon and accent classname', () => {
        expect(component.getIcon()).toBe('');
        component.iconUri = 'test';
        // testing JSX
        expect((component.getIcon() as any).$tag$).toBe('img');
        expect((component.getIcon() as any).$attrs$.src).toBe('test');
        component.icon = 'test';
        expect((component.getIcon() as any).$tag$).toBe('gux-icon');
        expect((component.getIcon() as any).$attrs$.iconName).toBe('test');
      });
    });
  });
});
