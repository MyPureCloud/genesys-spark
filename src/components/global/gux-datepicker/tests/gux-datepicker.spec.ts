import { GuxDatepicker } from '../gux-datepicker';
import { CalendarModes, KeyCode } from './../../../../common-enums';

describe('gux-datepicker', () => {
  let component: GuxDatepicker;
  beforeEach(async () => {
    document.getSelection = () => {
      return {
        toString() {
          return '';
        }
      } as any;
    };
    component = new GuxDatepicker();
    component.inputElement = {
      blur: jest.fn() as any,
      setSelectionRange: jest.fn() as any,
      value: ''
    } as HTMLInputElement;
    component.toInputElement = {
      blur: jest.fn() as any,
      setSelectionRange: jest.fn() as any,
      value: ''
    } as HTMLInputElement;
    component.textFieldElement = {
      querySelector() {
        return component.inputElement;
      }
    } as any;
    component.toTextFieldElement = {
      querySelector() {
        return component.toInputElement;
      }
    } as any;
    component.calendarElement = {
      focusPreviewDate: jest.fn(),
      setValue: jest.fn()
    } as any;
    component.input = {
      emit: jest.fn()
    };
    component.change = {
      emit: jest.fn()
    };
    component.i18n = jest.fn();
    component.root = {
      contains() {
        return null;
      }
    } as any;
  });
  it('builds', () => {
    component.componentWillLoad();
    component.componentDidLoad();
    component.render();
    expect(component).toBeTruthy();
  });
  // Methods
  describe('methods', () => {
    const value1str = '11/22/1970';
    const value1date = new Date(1970, 10, 22);
    const value2str = '11/25/1970';
    const value2date = new Date(1970, 10, 25);
    // Private
    describe('private', () => {
      it('setValue', () => {
        component.inputElement.value = value1str;
        component.setValue();
        expect(component.calendarElement.setValue).toHaveBeenCalledWith(
          value1date
        );
        component.mode = CalendarModes.Range;
        component.toInputElement.value = value2str;
        component.setValue();
        expect(component.calendarElement.setValue).toHaveBeenCalledWith([
          value1date,
          value2date
        ]);
      });
      it('replaceUndefinedChars', () => {
        component.inputElement.value = '1 /22/1970';
        component.toInputElement.value = '11/2 /1970';
        component.replaceUndefinedChars();
        expect(component.inputElement.value).toEqual('10/22/1970');
        expect(component.toInputElement.value).toEqual('11/20/1970');
      });
      it('onDaySelect', () => {
        component.onDaySelect(value1date);
        expect(component.inputElement.value).toEqual(value1str);
        component.mode = CalendarModes.Range;
        component.onDaySelect([value1date, value2date]);
        expect(component.inputElement.value).toEqual(value1str);
        expect(component.toInputElement.value).toEqual(value2str);
      });
      it('getPreviousSep/getNextSep', () => {
        component.componentDidLoad();
        expect(component.getPreviousSep('d')).toEqual('m');
        expect(component.getPreviousSep('m')).toEqual('y');
        expect(component.getNextSep('y')).toEqual('m');
        expect(component.getNextSep('m')).toEqual('d');
      });
      it('onKeyDown', () => {
        component.componentDidLoad();
        spyOn(component, 'setCursorRange').and.callThrough();
        let event = {
          keyCode: KeyCode.Enter,
          preventDefault: jest.fn()
        } as any;
        component.onKeyDown(event);
        event = {
          keyCode: KeyCode.Enter,
          target: component.inputElement,
          preventDefault: jest.fn()
        } as any;
        component.onKeyDown(event);
        expect(component.active).toEqual(false);
        event = {
          keyCode: KeyCode.Tab,
          target: component.inputElement,
          preventDefault: jest.fn()
        } as any;
        component.onKeyDown(event);
        expect(component.calendarElement.focusPreviewDate).toHaveBeenCalled();
        event = {
          keyCode: KeyCode.Up,
          target: component.inputElement,
          preventDefault: jest.fn()
        } as any;
        component.onKeyDown(event);
        expect(component.setCursorRange).toHaveBeenCalledTimes(1);
        event = {
          keyCode: KeyCode.Right,
          target: component.inputElement,
          preventDefault: jest.fn()
        } as any;
        component.onKeyDown(event);
        expect(component.setCursorRange).toHaveBeenCalledTimes(2);
        event = {
          keyCode: KeyCode.Down,
          target: component.inputElement,
          preventDefault: jest.fn()
        } as any;
        component.onKeyDown(event);
        expect(component.setCursorRange).toHaveBeenCalledTimes(3);
        event = {
          keyCode: KeyCode.Left,
          target: component.inputElement,
          preventDefault: jest.fn()
        } as any;
        component.onKeyDown(event);
        expect(component.setCursorRange).toHaveBeenCalledTimes(4);
        // 1
        event = {
          keyCode: 97,
          target: component.inputElement,
          preventDefault: jest.fn()
        } as any;
        component.onKeyDown(event);
        expect(event.preventDefault).toHaveBeenCalled();
      });
    });
  });
  // Getters
  describe('getters', () => {
    it('calendarLabels', () => {
      component.mode = CalendarModes.Range;
      expect(component.calendarLabels.length).toEqual(2);
      expect(component.i18n).toHaveBeenCalledTimes(2);
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
