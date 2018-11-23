import { GenesysDropdown } from '../genesys-dropdown';

describe('genesys-dropdown', () => {
  let component;
  beforeEach(async () => {
    component = new GenesysDropdown();
  });
  it('builds', () => {
    expect(component).toBeTruthy();
  });

  describe('methods', () => {
    it('setValue', () => {
      const value = 'dummy';
      component.setValue(value);
      expect(component.value).toEqual(value);
    });
  });
});