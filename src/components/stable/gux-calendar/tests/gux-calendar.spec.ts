import { CalendarModes } from '../../../../common-enums';
import * as utils from '../../../../utils/dom/manipulate-elements-classes';
import { GuxCalendar } from '../gux-calendar';

describe('gux-calendar', () => {
  let component: GuxCalendar;
  let componentRoot: any;
  let componentShadowRoot: any;

  beforeEach(async () => {
    component = new GuxCalendar();
    component.input = {
      emit: jest.fn()
    };
    componentRoot = component.root as any;
    componentShadowRoot = {} as any;
    componentRoot.shadowRoot = componentShadowRoot;

    componentShadowRoot.querySelector = () => {
      return null;
    };
    componentShadowRoot.querySelectorAll = () => {
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
    const testDate = new Date(2020, 0, 15);
    const testDateIso = '2020-01-15';
    const rangeStart = new Date(1970, 0, 15);
    const rangeEnd = new Date(1970, 0, 20);
    const rangeIso = '1970-01-15/1970-01-20';
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
      it('setValue with single mode', async () => {
        await component.setValue(testDate);
        expect(component.previewValue).toEqual(testDate);
        expect(component.value).toEqual(testDateIso);
      });
      it('setValue with range mode from-to', async () => {
        component.mode = CalendarModes.Range;
        await component.setValue([rangeStart, rangeEnd]);
        expect(component.previewValue).toEqual(rangeStart);
        expect(component.value).toEqual(rangeIso);
      });
      it('setValue with range mode to-from', async () => {
        component.mode = CalendarModes.Range;
        await component.setValue([rangeEnd, rangeStart]);
        expect(component.previewValue).toEqual(rangeStart);
        expect(component.value).toEqual(rangeIso);
      });
      it('focusPreviewDate', async () => {
        await component.focusPreviewDate();
        expect(spyEl.focus).not.toHaveBeenCalled();
        componentShadowRoot.querySelector = () => {
          return spyEl;
        };
        await component.focusPreviewDate();
        expect(spyEl.focus).toHaveBeenCalled();
      });
    });
    // Private
    describe('private', () => {
      it('incrementPreviewDateByMonth', () => {
        jest.useFakeTimers();
        const startingMonth = component.previewValue.getMonth();
        component.incrementPreviewDateByMonth(3);
        jest.runAllTimers();
        expect(component.previewValue.getMonth()).toEqual(
          (startingMonth + 3) % 12
        );
      });
      it('generateDatesFrom', () => {
        component.value = rangeIso;
        component.mode = CalendarModes.Range;
        const result = component.generateDatesFrom(1, rangeEnd, 42);
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
        const result = component.addDays(rangeEnd, inc);
        expect(result.getDate()).toEqual(rangeEnd.getDate() + inc);
      });
      it('getAllDatesElements', () => {
        const dummy = ['one', 'two'];
        componentShadowRoot.querySelectorAll = () => {
          return dummy;
        };
        const result = component.getAllDatesElements();
        expect(result).toEqual(dummy);
      });
      it('getRangeDatesElements', () => {
        spyOn(component, 'getRangeDates').and.callThrough();
        component.getRangeDatesElements(rangeStart, rangeEnd);
        expect(component.getRangeDates).toHaveBeenCalledWith(
          rangeStart,
          rangeEnd
        );
        componentShadowRoot.querySelector = () => {
          return 'dummy';
        };
        const result = component.getRangeDatesElements(rangeEnd, rangeStart);
        expect(component.getRangeDates).toHaveBeenCalledWith(
          rangeStart,
          rangeEnd
        );
        expect(result.length).toEqual(6);
      });
      it('onDateClick with single mode', async () => {
        spyOn(component, 'setValue').and.callFake(() => {
          return;
        });
        spyOn(component, 'emitInput').and.callFake(() => {
          return;
        });
        await component.onDateClick(testDate);
        expect(component.setValue).toHaveBeenCalledWith(testDate);
        expect(component.emitInput).toHaveBeenCalled();
      });
      it('onDateClick with range mode', async () => {
        component.mode = CalendarModes.Range;
        spyOn(component, 'getAllDatesElements').and.callFake(() => {
          return;
        });
        spyOn(utils, 'removeClassToElements').and.callFake(() => {
          return;
        });
        spyOn(component, 'emitInput').and.callFake(() => {
          return;
        });
        spyOn(component, 'updateRangeElements').and.callFake(() => {
          return;
        });
        await component.onDateClick(rangeStart);
        await component.onDateClick(rangeEnd);
        expect(component.emitInput).toHaveBeenCalled();
      });
      it('onDateMouseEnter', () => {
        spyOn(component, 'updateRangeElements').and.callFake(() => {
          return;
        });
        component.mode = CalendarModes.Range;
        component.selectingDate = rangeStart;
        component.onDateMouseEnter(rangeEnd);
        expect(component.value.split('/')[1]).toEqual(rangeIso.split('/')[1]);
        expect(component.updateRangeElements).toHaveBeenCalled();
      });
      it('onKeyDown', async () => {
        jest.useFakeTimers();
        spyOn(component, 'incrementPreviewDateByMonth').and.callFake(() => {
          return;
        });
        spyOn(component, 'setValue').and.callFake(() => {
          return;
        });
        spyOn(component, 'emitInput').and.callFake(() => {
          return;
        });
        const initialPreviewValue = rangeEnd;
        component.previewValue = new Date(rangeEnd);
        const days = initialPreviewValue.getDate();
        let event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        await component.onKeyDown(event);
        jest.runAllTimers();
        expect(component.previewValue.getDate()).toEqual(days + 7);
        event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        await component.onKeyDown(event);
        jest.runAllTimers();
        expect(component.previewValue.getDate()).toEqual(days);
        event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        await component.onKeyDown(event);
        jest.runAllTimers();
        expect(component.previewValue.getDate()).toEqual(days - 1);
        event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        await component.onKeyDown(event);
        jest.runAllTimers();
        expect(component.previewValue.getDate()).toEqual(days);
        event = new KeyboardEvent('keydown', { key: 'PageUp' });
        await component.onKeyDown(event);
        jest.runAllTimers();
        expect(component.incrementPreviewDateByMonth).toHaveBeenCalledWith(1);
        event = new KeyboardEvent('keydown', { key: 'PageDown' });
        await component.onKeyDown(event);
        jest.runAllTimers();
        expect(component.incrementPreviewDateByMonth).toHaveBeenCalledWith(-1);
        event = new KeyboardEvent('keydown', { key: 'Enter' });
        await component.onKeyDown(event);
        jest.runAllTimers();
        expect(component.setValue).toHaveBeenCalledWith(initialPreviewValue);
        expect(component.emitInput).toHaveBeenCalled();
      });

      it('getWeekdays', () => {
        expect(component.getWeekdays().length).toEqual(7);
      });
    });
  });

  // Events
  describe('events', () => {
    it('onInput', () => {
      const value = '2020-01-15';
      component.value = value;
      component.emitInput();
      expect(component.input.emit).toHaveBeenCalledWith(value);
    });
  });
});
