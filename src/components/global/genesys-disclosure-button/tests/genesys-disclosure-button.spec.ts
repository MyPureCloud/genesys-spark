import { GenesysDisclosureButton } from '../genesys-disclosure-button';

describe('genesys-disclosure-button', () => {
  it('builds', () => {
    expect(new GenesysDisclosureButton()).toBeTruthy();
  });

  describe('formatting', () => {
    it('returns empty string for no names defined', () => {
      const component = new GenesysDisclosureButton();
      expect(component.format()).toEqual('');
    });

    it('formats just first names', () => {
      const component = new GenesysDisclosureButton();
      component.first = 'Joseph';
      expect(component.format()).toEqual('Joseph');
    });

    it('formats first and last names', () => {
      const component = new GenesysDisclosureButton();
      component.first = 'Joseph';
      component.last = 'Publique';
      expect(component.format()).toEqual('Joseph Publique');
    });

    it('formats first, middle and last names', () => {
      const component = new GenesysDisclosureButton();
      component.first = 'Joseph';
      component.middle = 'Quincy';
      component.last = 'Publique';
      expect(component.format()).toEqual('Joseph Quincy Publique');
    });
  });
});