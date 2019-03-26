import { GuxPanelBody } from '../gux-panel-body';

describe('gux-panel-body', () => {
  it('builds', () => {
    expect(new GuxPanelBody()).toBeTruthy();
  });

  describe('formatting', () => {
    it('returns empty string for no names defined', () => {
      const component = new GuxPanelBody();
      expect(component.format()).toEqual('');
    });

    it('formats just first names', () => {
      const component = new GuxPanelBody();
      component.first = 'Joseph';
      expect(component.format()).toEqual('Joseph');
    });

    it('formats first and last names', () => {
      const component = new GuxPanelBody();
      component.first = 'Joseph';
      component.last = 'Publique';
      expect(component.format()).toEqual('Joseph Publique');
    });

    it('formats first, middle and last names', () => {
      const component = new GuxPanelBody();
      component.first = 'Joseph';
      component.middle = 'Quincy';
      component.last = 'Publique';
      expect(component.format()).toEqual('Joseph Quincy Publique');
    });
  });
});