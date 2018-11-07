import { GenesysAccordion } from '../genesys-accordion';

describe('genesys-accordion', () => {
  it('builds', () => {
    expect(new GenesysAccordion()).toBeTruthy();
  });

  describe('rendering', () => {
    let component;
    beforeEach(async () => {
      component = new GenesysAccordion();
    });
    it('should have default values', () => {
      expect(component.sections).toEqual([]);
    });

    describe('methods', () => {
      beforeEach(async () => {
        component.sections = ['First', 'Second', 'Third'];
      });
      it('getPreviousSlot', () => {
        expect(component.getPreviousSlot('First')).toEqual('Third');
        expect(component.getPreviousSlot('Second')).toEqual('First');
      });
      it('getNextSlot', () => {
        expect(component.getNextSlot('First')).toEqual('Second');
        expect(component.getNextSlot('Third')).toEqual('First');
      });
    });
  });
});
