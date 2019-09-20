import { CalendarModes, KeyCode } from '../../../../common-enums';
import * as utils from '../../../../common-utils';
import { GuxCalendar } from '../gux-calendar';

describe('gux-calendar', () => {
  let component: GuxCalendar;
  let componentRoot: any;
  beforeEach(async () => {
    component = new GuxCalendar();
    component.input = {
      emit: jest.fn()
    };
    componentRoot = component.root as any;
    componentRoot.querySelector = () => {
      return null;
    };
    componentRoot.querySelectorAll = () => {
      return [];
    };
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
        expect(component.value[0]).toEqual(newValue2);
        expect(component.value[1]).toEqual(newValue);
      });
      it('setValue with range mode to-from', () => {
        component.mode = CalendarModes.Range;
        component.setValue([newValue, newValue2]);
        expect(component.previewValue).toEqual(newValue2);
        expect(component.value[0]).toEqual(newValue2);
        expect(component.value[1]).toEqual(newValue);
      });
      it('focusPreviewDate', () => {
        component.focusPreviewDate();
        expect(spyEl.focus).not.toHaveBeenCalled();
        componentRoot.querySelector = () => {
          return spyEl;
        };
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
      it('generateDatesFrom', () => {
        component.value = [newValue2, newValue3];
        component.mode = CalendarModes.Range;
        const result = component.generateDatesFrom(1, newValue3, 42);
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
        componentRoot.querySelectorAll = () => {
          return dummy;
        };
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
        componentRoot.querySelector = () => {
          return 'dummy';
        };
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
        spyOn(component, 'onInput').and.callFake(() => {
          return;
        });
        component.onDateClick(newValue);
        expect(component.setValue).toHaveBeenCalledWith(newValue);
        expect(component.onInput).toHaveBeenCalled();
      });
      it('onDateClick with range mode', () => {
        component.mode = CalendarModes.Range;
        spyOn(component, 'getAllDatesElements').and.callFake(() => {
          return;
        });
        spyOn(utils, 'removeClassToElements').and.callFake(() => {
          return;
        });
        spyOn(component, 'onInput').and.callFake(() => {
          return;
        });
        spyOn(component, 'updateRangeElements').and.callFake(() => {
          return;
        });
        component.onDateClick(newValue2);
        component.onDateClick(newValue3);
        expect(component.onInput).toHaveBeenCalled();
      });
      it('onDateMouseEnter', () => {
        spyOn(component, 'updateRangeElements').and.callFake(() => {
          return;
        });
        component.mode = CalendarModes.Range;
        component.isSelecting = true;
        component.onDateMouseEnter(newValue);
        expect(component.value[1]).toEqual(newValue);
        expect(component.updateRangeElements).toHaveBeenCalled();
      });
      it('onKeyDown', () => {
        spyOn(component, 'incrementPreviewDateByMonth').and.callFake(() => {
          return;
        });
        spyOn(component, 'setValue').and.callFake(() => {
          return;
        });
        spyOn(component, 'onInput').and.callFake(() => {
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
        event = { keyCode: KeyCode.PageUp } as KeyboardEvent;
        component.onKeyDown(event);
        expect(component.incrementPreviewDateByMonth).toHaveBeenCalledWith(1);
        event = { keyCode: KeyCode.PageDown } as KeyboardEvent;
        component.onKeyDown(event);
        expect(component.incrementPreviewDateByMonth).toHaveBeenCalledWith(-1);
        event = { keyCode: KeyCode.Enter } as KeyboardEvent;
        component.onKeyDown(event);
        expect(component.setValue).toHaveBeenCalledWith(initialPreviewValue);
        expect(component.onInput).toHaveBeenCalled();
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
    it('onInput', () => {
      const value = new Date();
      component.value = value;
      component.onInput();
      expect(component.input.emit).toHaveBeenCalledWith(value);
    });
  });
});
