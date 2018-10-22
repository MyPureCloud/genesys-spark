import { GenesysButton } from '../genesys-button';

describe('genesys-button', () => {
  it('builds', () => {
    expect(new GenesysButton()).toBeTruthy();
  });

  describe('getType', () => {
    it('returns secondary string for no type defined', () => {
      const component = new GenesysButton();
      expect(component.getType()).toEqual('secondary');
    });

    it('returns primary if type equals to primary', () => {
      const component = new GenesysButton();
      component.type = 'primary';
      expect(component.getType()).toEqual('primary');
    });

    it('returns secondary string for other types defined', () => {
      const component = new GenesysButton();
      component.type = 'sss';
      expect(component.getType()).toEqual('secondary');
    });

  });
});