import { GuxButton } from '../gux-button';

describe('gux-button', () => {
  it('builds', () => {
    expect(new GuxButton()).toBeTruthy();
  });

  describe('getAccent', () => {
    it('returns secondary string for no accent defined', () => {
      const component = new GuxButton();
      expect(component.getAccent()).toEqual('secondary');
    });

    it('returns primary if accent equals to primary', () => {
      const component = new GuxButton();
      component.accent = 'primary';
      expect(component.getAccent()).toEqual('primary');
    });

    it('returns secondary string for other accents defined', () => {
      const component = new GuxButton();
      component.accent = 'sss';
      expect(component.getAccent()).toEqual('secondary');
    });
  });
});
