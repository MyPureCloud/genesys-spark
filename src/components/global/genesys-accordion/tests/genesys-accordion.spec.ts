import { GenesysAccordion } from '../genesys-accordion';

describe('genesys-accordion', () => {
  it('builds', () => {
    expect(new GenesysAccordion()).toBeTruthy();
  });

  describe('formatting', () => {
    it('returns empty string for no names defined', () => {
      const component = new GenesysAccordion();
      expect(component.sections).toEqual([]);
    });
  });
});