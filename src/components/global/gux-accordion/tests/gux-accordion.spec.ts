import { GenesysAccordion } from '../gux-accordion';

describe('gux-accordion', () => {
  let component;
  beforeEach(async () => {
    component = new GenesysAccordion();
  });
  it('builds', () => {
    expect(component).toBeTruthy();
  });

  describe('methods', () => {
    let firstSection;
    let secondSection;
    let thirdSection;
    beforeEach(async () => {
      firstSection = {
        slotName: 'First',
        slotRef: 'DummyRef1'
      };
      secondSection = {
        slotName: 'Second',
        slotRef: 'DummyRef2'
      };
      thirdSection = {
        slotName: 'Third',
        slotRef: 'DummyRef3'
      };
      component.sections = [firstSection, secondSection, thirdSection];
    });
    it('getSectionByName', () => {
      const section = component.getSectionByName(firstSection.slotName);
      expect(section).toEqual(firstSection);
    });
    it('getPreviousSlot', () => {
      expect(component.getPreviousSlot(firstSection.slotName)).toEqual(
        thirdSection.slotRef
      );
      expect(component.getPreviousSlot(thirdSection.slotName)).toEqual(
        secondSection.slotRef
      );
    });
    it('getNextSlot', () => {
      expect(component.getNextSlot(thirdSection.slotName)).toEqual(
        firstSection.slotRef
      );
      expect(component.getNextSlot(firstSection.slotName)).toEqual(
        secondSection.slotRef
      );
    });
  });
});
