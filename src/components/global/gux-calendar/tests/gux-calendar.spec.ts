import { CalendarModes, KeyCode } from '../../../../common-enums';
import * as utils from '../../../../common-utils';
import { GuxCalendar } from '../gux-calendar';

describe('gux-calendar', () => {
  let component: GuxCalendar;
  beforeEach(async () => {
    component = new GuxCalendar();
    component.input = {
      emit: jest.fn()
    };
    component.change = {
      emit: jest.fn()
    };
    component.root = {
      querySelector() {
        return null;
      },
      querySelectorAll() {
        return [];
      }
    } as any;
  });
  it('builds', () => {
    component.componentWillLoad();
    component.render();
    expect(component).toBeTruthy();
  });
  // Methods
  describe('methods', () => {
    const newValue = new Date();
    const newValue2 = new Date(1970, 0, 1);
    const newValue3 = new Date(1970, 0, 5);
    const spyEl = {
      classList: {
        add: jest.fn(),
        contains: () => false
      },
      focus: jest.fn(),
      setAttribute: jest.fn()
    };
    // Public
    describe('public', () => {
      it('setValue with single mode', () => {
        component.setValue(newValue);
        expect(component.previewValue).toEqual(newValue);
        expect(component.value).toEqual(newValue);
      });
      it('setValue with range mode from-to', () => {
        component.mode = CalendarModes.Range;
        component.setValue([newValue2, newValue]);
        expect(component.previewValue).toEqual(newValue2);
        expect(component.fromValue).toEqual(newValue2);
        expect(component.toValue).toEqual(newValue);
      });
      it('setValue with range mode to-from', () => {
        component.mode = CalendarModes.Range;
        component.setValue([newValue, newValue2]);
        expect(component.previewValue).toEqual(newValue);
        expect(component.fromValue).toEqual(newValue2);
        expect(component.toValue).toEqual(newValue);
      });
      it('focusPreviewDate', () => {
        component.focusPreviewDate();
        expect(spyEl.focus).not.toHaveBeenCalled();
        component.root = {
          querySelector() {
            return spyEl;
          }
        } as any;
        component.focusPreviewDate();
        expect(spyEl.focus).toHaveBeenCalled();
      });
    });
    // Private
    describe('private', () => {
      it('incrementPreviewDateByMonth', () => {
        const inc = 3;
        component.incrementPreviewDateByMonth(inc);
        expect(component.previewValue.getMonth()).toEqual(
          newValue.getMonth() + 3
        );
      });
      it('updateTabIndex without target', () => {
        const element = {
          setAttribute: jest.fn()
        };
        spyOn(component, 'getAllSelectableDatesElements').and.callFake(() => [
          element
        ]);
        component.updateTabIndex(false);
        expect(element.setAttribute).toHaveBeenCalledWith('tabindex', '-1');
        expect(component.shouldSetTabIndex).toEqual(true);
        expect(component.shouldFocus).toEqual(false);
        component.updateTabIndex(true);
        expect(component.shouldFocus).toEqual(true);
      });
      it('updateTabIndex with target', () => {
        component.root = {
          querySelector() {
            return spyEl;
          }
        } as any;
        spyOn(component, 'getAllSelectableDatesElements').and.callFake(
          () => []
        );
        component.updateTabIndex(false);
        expect(spyEl.setAttribute).toHaveBeenCalledWith('tabindex', '0');
        component.updateTabIndex(true);
        expect(spyEl.focus).toHaveBeenCalled();
      });
      it('generateDatesFrom', () => {
        component.value = newValue2;
        component.fromValue = newValue2;
        component.mode = CalendarModes.Range;
        const result = component.generateDatesFrom(1, newValue2.getTime(), 31);
        expect(result[0].selected).toEqual(true);
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              hidden: true
            })
          ])
        );
      });
      it('addDays', () => {
        const inc = 2;
        const result = component.addDays(newValue3, inc);
        expect(result.getDate()).toEqual(newValue3.getDate() + inc);
      });
      it('getAllDatesElements', () => {
        const dummy = ['one', 'two'];
        component.root = {
          querySelectorAll() {
            return dummy;
          }
        } as any;
        const result = component.getAllDatesElements();
        expect(result).toEqual(dummy);
      });
      it('getRangeDatesElements', () => {
        spyOn(component, 'getRangeDates').and.callThrough();
        component.getRangeDatesElements(newValue2, newValue3);
        expect(component.getRangeDates).toHaveBeenCalledWith(
          newValue2,
          newValue3
        );
        component.root = {
          querySelector() {
            return 'dummy';
          }
        } as any;
        const result = component.getRangeDatesElements(newValue3, newValue2);
        expect(component.getRangeDates).toHaveBeenCalledWith(
          newValue2,
          newValue3
        );
        expect(result.length).toEqual(5);
      });
      it('onDateClick with single mode', () => {
        spyOn(component, 'setValue').and.callFake(() => {
          return;
        });
        spyOn(component, 'onChange').and.callFake(() => {
          return;
        });
        component.onDateClick(newValue);
        expect(component.setValue).toHaveBeenCalledWith(newValue);
        expect(component.onChange).toHaveBeenCalledWith(newValue);
      });
      it('onDateClick with range mode', () => {
        component.mode = CalendarModes.Range;
        spyOn(component, 'getAllDatesElements').and.callFake(() => {
          return;
        });
        spyOn(utils, 'removeClassToElements').and.callFake(() => {
          return;
        });
        spyOn(component, 'onChange').and.callFake(() => {
          return;
        });
        spyOn(component, 'updateRangeElements').and.callFake(() => {
          return;
        });
        component.onDateClick(newValue2);
        component.onDateClick(newValue3);
        expect(component.onChange).toHaveBeenCalledWith([newValue2, newValue3]);
      });
      it('onDateMouseEnter', () => {
        spyOn(component, 'updateRangeElements').and.callFake(() => {
          return;
        });
        component.mode = CalendarModes.Range;
        component.isSelecting = true;
        component.onDateMouseEnter(newValue);
        expect(component.toValue).toEqual(newValue);
        expect(component.updateRangeElements).toHaveBeenCalled();
      });
      it('onKeyDown', () => {
        spyOn(component, 'incrementPreviewDateByMonth').and.callFake(() => {
          return;
        });
        spyOn(component, 'setValue').and.callFake(() => {
          return;
        });
        spyOn(component, 'onChange').and.callFake(() => {
          return;
        });
        const initialPreviewValue = newValue3;
        component.previewValue = new Date(newValue3);
        const days = initialPreviewValue.getDate();
        let event = { keyCode: KeyCode.Down } as KeyboardEvent;
        component.onKeyDown(event);
        expect(component.previewValue.getDate()).toEqual(days + 7);
        event = { keyCode: KeyCode.Up } as KeyboardEvent;
        component.onKeyDown(event);
        expect(component.previewValue.getDate()).toEqual(days);
        event = { keyCode: KeyCode.Left } as KeyboardEvent;
        component.onKeyDown(event);
        expect(component.previewValue.getDate()).toEqual(days - 1);
        event = { keyCode: KeyCode.Right } as KeyboardEvent;
        component.onKeyDown(event);
        expect(component.previewValue.getDate()).toEqual(days);
        event = { keyCode: KeyCode.End } as KeyboardEvent;
        component.onKeyDown(event);
        expect(component.incrementPreviewDateByMonth).toHaveBeenCalledWith(1);
        event = { keyCode: KeyCode.Home } as KeyboardEvent;
        component.onKeyDown(event);
        expect(component.incrementPreviewDateByMonth).toHaveBeenCalledWith(-1);
        event = { keyCode: KeyCode.Enter } as KeyboardEvent;
        component.onKeyDown(event);
        expect(component.setValue).toHaveBeenCalledWith(initialPreviewValue);
        expect(component.onChange).toHaveBeenCalledWith(initialPreviewValue);
      });
    });
  });
  // Getters
  describe('getters', () => {
    it('weekdays', () => {
      expect(component.weekdays.length).toEqual(7);
    });
  });
  // Events
  describe('events', () => {
    it('onChange', () => {
      const value = new Date();
      component.onChange(value);
      expect(component.input.emit).toHaveBeenCalledWith(value);
      expect(component.change.emit).toHaveBeenCalledWith(value);
    });
  });
});
