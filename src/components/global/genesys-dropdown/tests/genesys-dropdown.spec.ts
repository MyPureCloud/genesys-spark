import { GenesysDropdown } from '../genesys-dropdown';

describe('genesys-dropdown', () => {
  let component;
  const items = [
    { text: 'Belgium' },
    { text: 'Brazil' }
  ];
  const thirdItem = { text: 'France' };
  beforeEach(async () => {
    component = new GenesysDropdown();
    component.items = [...items, thirdItem];
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
    it('_clickHandler', () => {
      component.disabled = false;
      component.opened = true;
      component._clickHandler();
      expect(component.opened).toEqual(false);
    });
    it('_focusHandler', () => {
      component._focusHandler();
      expect(component.inputIsFocused).toEqual(true);
      expect(component.opened).toEqual(true);
    });
    it('_focusListItemHandler', () => {
      const value = 'dummy';
      component._focusListItemHandler({ text: value });
      expect(component.forcedGhostValue).toEqual(value);
    });
    it('_blurHandler', () => {
      component._blurHandler();
      expect(component.inputIsFocused).toEqual(false);
      expect(component.forcedGhostValue).toEqual('');
    });
    it('_inputHandler', () => {
      const value = 'dummy';
      component._inputHandler({ detail: value });
      expect(component.value).toEqual(value);
    });
  });
  describe('getters', () => {
    it('filteredItems', () => {
      component.filterable = false;
      expect(component.filteredItems).toEqual([...items, thirdItem]);
      component.filterable = true;
      component.value = 'B';
      expect(component.filteredItems).toEqual(items);
    });
    it('ghost', () => {
      component.opened = true;
      component.filterable = true;
      component.forcedGhostValue = 'Bel';
      expect(component.ghost).toEqual(component.forcedGhostValue);
      component.opened = false;
      component.value = '';
      component.filterable = false;
      component.placeholder = 'Select...';
      expect(component.ghost).toEqual(component.placeholder);
    });
  });
});