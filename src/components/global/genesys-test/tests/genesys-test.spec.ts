import { GenesysTest } from './genesys-test';

describe('genesys-test', () => {
  it('builds', () => {
    expect(new GenesysTest()).toBeTruthy();
  });

  describe('formatting', () => {
    it('returns empty string for no names defined', () => {
      const component = new GenesysTest();
      expect(component.format()).toEqual('');
    });

    it('formats just first names', () => {
      const component = new GenesysTest();
      component.first = 'Joseph';
      expect(component.format()).toEqual('Joseph');
    });

    it('formats first and last names', () => {
      const component = new GenesysTest();
      component.first = 'Joseph';
      component.last = 'Publique';
      expect(component.format()).toEqual('Joseph Publique');
    });

    it('formats first, middle and last names', () => {
      const component = new GenesysTest();
      component.first = 'Joseph';
      component.middle = 'Quincy';
      component.last = 'Publique';
      expect(component.format()).toEqual('Joseph Quincy Publique');
    });
  });
});