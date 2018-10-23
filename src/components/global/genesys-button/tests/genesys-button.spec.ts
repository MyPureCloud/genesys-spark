import { GenesysButton } from '../genesys-button';

describe('genesys-button', () => {
  it('builds', () => {
    expect(new GenesysButton()).toBeTruthy();
  });

  describe('getAccent', () => {
    it('returns secondary string for no accent defined', () => {
      const component = new GenesysButton();
      expect(component.getAccent()).toEqual('secondary');
    });

    it('returns primary if accent equals to primary', () => {
      const component = new GenesysButton();
      component.accent = 'primary';
      expect(component.getAccent()).toEqual('primary');
    });

    it('returns secondary string for other accents defined', () => {
      const component = new GenesysButton();
      component.accent = 'sss';
      expect(component.getAccent()).toEqual('secondary');
    });

  });
});