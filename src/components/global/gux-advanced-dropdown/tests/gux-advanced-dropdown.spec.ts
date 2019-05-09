import { GuxAdvancedDropdown } from '../gux-advanced-dropdown';

describe('gux-advanced-dropdown', () => {
  it('builds', () => {
    expect(new GuxAdvancedDropdown()).toBeTruthy();
  });

  describe('formatting', () => {
    it('returns empty string for no names defined', () => {
      const component = new GuxAdvancedDropdown();
      expect(component.format()).toEqual('');
    });

    it('formats just first names', () => {
      const component = new GuxAdvancedDropdown();
      component.first = 'Joseph';
      expect(component.format()).toEqual('Joseph');
    });

    it('formats first and last names', () => {
      const component = new GuxAdvancedDropdown();
      component.first = 'Joseph';
      component.last = 'Publique';
      expect(component.format()).toEqual('Joseph Publique');
    });

    it('formats first, middle and last names', () => {
      const component = new GuxAdvancedDropdown();
      component.first = 'Joseph';
      component.middle = 'Quincy';
      component.last = 'Publique';
      expect(component.format()).toEqual('Joseph Quincy Publique');
    });
  });
});
