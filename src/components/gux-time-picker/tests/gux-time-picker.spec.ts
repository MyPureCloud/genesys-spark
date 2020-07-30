import { newSpecPage } from '@stencil/core/testing';
import { KeyCode } from '../../../common-enums';
import { GuxTimePicker } from '../gux-time-picker';

const MAX_TIME: string = '23:59:59';
const MIN_TIME: string = '00:00:00';

describe('gux-time-picker-beta', () => {
  let component: GuxTimePicker;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTimePicker],
      html: `
        <gux-time-picker-beta>
        </gux-time-picker-beta>
      `,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', () => {
    expect(component).toBeInstanceOf(GuxTimePicker);
  });

  describe('isInFormat method', () => {
    it('isInFormat - true', () => {
      // Run
      const res = component.isInFormat('00:59:78');

      // Validate
      expect(res).toBeTruthy();
    });

    it('isInFormat - false', () => {
      // Run
      const res = component.isInFormat('00:9:78');

      // Validate
      expect(res).toBeFalsy();
    });
  });

  describe('isValidTime method', () => {
    it('isValidTime - true', () => {
      // Run
      const res = component.isValidTime('00:09:18');

      // Validate
      expect(res).toBeTruthy();
    });

    it('isValidTime - bad hours', () => {
      // Run
      const res = component.isValidTime('24:09:18');

      // Validate
      expect(res).toBeFalsy();
    });

    it('isValidTime - bad minutes', () => {
      // Run
      const res = component.isValidTime('00:89:18');

      // Validate
      expect(res).toBeFalsy();
    });

    it('isValidTime - bad seconds', () => {
      // Run
      const res = component.isValidTime('00:09:88');

      // Validate
      expect(res).toBeFalsy();
    });
  });

  describe('Boundries', () => {
    describe('validateUpperBound', () => {
      it('validateUpperBound - not in format', () => {
        // Setup
        component.max = '23:0980';

        // Run
        component.validateUpperBound();

        // Validate
        expect(component.max).toBe(MAX_TIME);
      });

      it('validateUpperBound - not a valid time', () => {
        // Setup
        component.max = '23:09:80';

        // Run
        component.validateUpperBound();

        // Validate
        expect(component.max).toBe(MAX_TIME);
      });

      it('validateUpperBound - good boundry', () => {
        // Setup
        component.max = '23:09:59';

        // Run
        component.validateUpperBound();

        // Validate
        expect(component.max).toBe('23:09:59');
      });
    });

    describe('validateLowerBound', () => {
      it('validateLowerBound - not in format', () => {
        // Setup
        component.min = '23:0980';

        // Run
        component.validateLowerBound();

        // Validate
        expect(component.min).toBe(MIN_TIME);
      });

      it('validateLowerBound - not a valid time', () => {
        // Setup
        component.min = '23:09:80';

        // Run
        component.validateLowerBound();

        // Validate
        expect(component.min).toBe(MIN_TIME);
      });

      it('validateLowerBound - good boundry', () => {
        // Setup
        component.min = '23:09:59';

        // Run
        component.validateLowerBound();

        // Validate
        expect(component.min).toBe('23:09:59');
      });
    });

    describe('validateBounds', () => {
      it('validateBounds - min > max', () => {
        // Setup
        component.min = '23:00:00';
        component.max = '01:00:00';

        // Run
        component.validateBounds();

        // Validate
        expect(component.min).toBe(MIN_TIME);
        expect(component.max).toBe(MAX_TIME);
      });

      it('validateBounds - min < max', () => {
        // Setup
        component.min = '01:00:00';
        component.max = '23:00:00';

        // Run
        component.validateBounds();

        // Validate
        expect(component.min).toBe('01:00:00');
        expect(component.max).toBe('23:00:00');
      });
    });
  });

  describe('validateValue', () => {
    it('validateValue - not in format', () => {
      // Run
      const res = component.validateValue('0:00:05');

      // Validate
      expect(res).toBe('');
    });

    it('validateValue - not a valid time', () => {
      // Run
      const res = component.validateValue('29:00:05');

      // Validate
      expect(res).toBe('');
    });

    it('validateValue - not in bounds', () => {
      // Setup
      component.min = '01:00:00';
      component.max = '23:00:00';
      component.validateBounds();

      // Run
      const res = component.validateValue('00:00:05');

      // Validate
      expect(res).toBe('');
    });

    it('validateValue - in bounds', () => {
      // Setup
      component.min = '01:00:00';
      component.max = '23:00:00';
      component.validateBounds();

      // Run
      const res = component.validateValue('01:00:05');

      // Validate
      expect(res).toBe('01:00:05');
    });
  });

  describe('canBeCompletedToAValidTime method', () => {
    it('canBeCompletedToAValidTime - true', () => {
      // Setup
      component.min = '01:00:00';
      component.max = '23:00:00';
      component.validateBounds();

      // Run
      const res = component.canBeCompletedToAValidTime('00:');

      // Validate
      expect(res).toBeFalsy();
    });

    it('canBeCompletedToAValidTime - false', () => {
      // Setup
      component.min = '01:00:00';
      component.max = '23:00:00';
      component.validateBounds();

      // Run
      const res = component.canBeCompletedToAValidTime('10:');

      // Validate
      expect(res).toBeTruthy();
    });
  });

  describe('updateChosenValue method', () => {
    it('updateChosenValue', () => {
      // Setup
      component.inputElement.value = '05:00:00';
      component.value = '';
      component.active = true;
      component.openDropdown = true;

      // Run
      component.updateChosenValue();

      // Validate
      expect(component.value).toBe('05:00:00');
      expect(component.active).toBeFalsy();
      expect(component.openDropdown).toBeFalsy();
    });
  });

  describe('buildDropdownOptions method', () => {
    it('buildDropdownOptions', () => {
      // Setup
      component.suggestion = '20';
      component.min = '01:00:00';
      component.max = '23:00:00';
      component.validateBounds();

      // Run
      const res = component.buildDropdownOptions();

      // Validate
      expect(res).toEqual(['20:00:00', '20:15:00', '20:30:00', '20:45:00']);
    });

    it('buildDropdownOptions', () => {
      // Setup
      component.suggestion = '23';
      component.min = '01:00:00';
      component.max = '23:00:00';
      component.validateBounds();

      // Run
      const res = component.buildDropdownOptions();

      // Validate
      expect(res).toEqual(['23:00:00']);
    });
  });

  describe('onMouseUp listner', () => {
    it('onMouseUp Select end of input', () => {
      // Setup
      const event = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      component.inputElement.setSelectionRange = jest.fn();
      component.inputElement.value = '00:00';
      component.inputElement.selectionEnd = 5;

      // Run
      component.inputElement.dispatchEvent(event);

      // Validate
      expect(component.inputElement.setSelectionRange).toHaveBeenCalledWith(
        5,
        5
      );
    });

    it('onMouseUp select middle of input', () => {
      // Setup
      const event = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      component.inputElement.setSelectionRange = jest.fn();
      component.inputElement.value = '00:00';
      component.inputElement.selectionEnd = 2;

      // Run
      component.inputElement.dispatchEvent(event);

      // Validate
      expect(component.inputElement.setSelectionRange).toHaveBeenCalledWith(
        0,
        5
      );
    });
  });

  describe('onKeyDown listner', () => {
    it('onKeyDown backspace delete from end without semicolon', () => {
      // Setup
      const event = {
        keyCode: KeyCode.Backsp,
        preventDefault: jest.fn(),
        target: component.inputElement
      } as any;
      component.inputElement.value = '00:0';

      // Run
      component.onKeyDown(event);

      // Validate
      expect(component.openDropdown).toBeTruthy();
      expect(component.focusedField.value).toBe('00:');
    });

    it('onKeyDown backspace delete from end with semicolon', () => {
      // Setup
      const event = {
        keyCode: KeyCode.Backsp,
        preventDefault: jest.fn(),
        target: component.inputElement
      } as any;
      component.inputElement.value = '00:';

      // Run
      component.onKeyDown(event);

      // Validate
      expect(component.openDropdown).toBeTruthy();
      expect(component.focusedField.value).toBe('0');
    });

    it('onKeyDown backspace delete all', () => {
      // Setup
      const event = {
        keyCode: KeyCode.Backsp,
        preventDefault: jest.fn(),
        target: component.inputElement
      } as any;
      component.inputElement.selectionStart = 0;
      component.inputElement.selectionEnd = 3;
      component.inputElement.value = '00:';

      // Run
      component.onKeyDown(event);

      // Validate
      expect(component.openDropdown).toBeTruthy();
      expect(component.focusedField.value).toBe('');
    });

    it('onKeyDown Enter', () => {
      // Setup
      const event = {
        keyCode: KeyCode.Enter,
        preventDefault: jest.fn(),
        target: component.inputElement
      } as any;
      component.inputElement.blur = jest.fn();

      // Run
      component.onKeyDown(event);

      // Validate
      expect(component.inputElement.blur).toHaveBeenCalled();
    });

    it('onKeyDown Number accepted', () => {
      // Setup
      const event = {
        key: '0',
        keyCode: 48,
        preventDefault: jest.fn(),
        target: component.inputElement
      } as any;

      // Run
      component.onKeyDown(event);

      // Validate
      expect(component.openDropdown).toBeTruthy();
      expect(component.focusedField.value).toBe('0');
      expect(component.suggestion).toBe('00');
    });

    it('onKeyDown Number accepted with colon', () => {
      // Setup
      const event = {
        key: '0',
        keyCode: 48,
        preventDefault: jest.fn(),
        target: component.inputElement
      } as any;
      component.inputElement.value = '00:0';

      // Run
      component.onKeyDown(event);

      // Validate
      expect(component.openDropdown).toBeTruthy();
      expect(component.focusedField.value).toBe('00:00:');
      expect(component.suggestion).toBe('00');
    });

    it('onKeyDown Number not accepted', () => {
      // Setup
      const event = {
        key: '3',
        keyCode: 51,
        preventDefault: jest.fn(),
        target: component.inputElement
      } as any;

      // Run
      component.onKeyDown(event);

      // Validate
      expect(component.openDropdown).toBeTruthy();
      expect(component.focusedField.value).toBe('');
      expect(component.suggestion).toBe('00');
    });

    it('onKeyDown Number not accepted in seconds', () => {
      // Setup
      const event = {
        key: '9',
        keyCode: 57,
        preventDefault: jest.fn(),
        target: component.inputElement
      } as any;
      component.inputElement.value = '00:00:';

      // Run
      component.onKeyDown(event);

      // Validate
      expect(component.openDropdown).toBeTruthy();
      expect(component.focusedField.value).toBe('00:00:');
      expect(component.suggestion).toBe('00');
    });
  });
});
