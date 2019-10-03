import { ButtonAccents } from '../../../../common-enums';
import { GuxButton } from '../gux-button';

describe('gux-button', () => {
  it('builds', () => {
    expect(new GuxButton()).toBeTruthy();
  });

  describe('getAccent', () => {
    it('returns secondary string for no accent defined', () => {
      const component = new GuxButton();
      expect((component as any).accentClass).toEqual(
        `gux-${ButtonAccents.Secondary}`
      );
    });

    it('returns primary if accent equals to primary', () => {
      const component = new GuxButton();
      component.accent = ButtonAccents.Primary;
      expect((component as any).accentClass).toEqual(
        `gux-${ButtonAccents.Primary}`
      );
    });

    it('returns secondary string for other accents defined', () => {
      const component = new GuxButton();
      component.accent = 'sss' as ButtonAccents;
      expect((component as any).accentClass).toEqual(
        `gux-${ButtonAccents.Secondary}`
      );
    });
  });
});
