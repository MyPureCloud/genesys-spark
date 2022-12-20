import {
  getTimeDisplayValues,
  getLocaleClockType,
  incrementHour,
  incrementMinute,
  getDisplayValue,
  getValue,
  getHourDisplayValue,
  getMinuteDisplayValue,
  isAm,
  getHoursPattern,
  getMinutesPattern,
  getValidValueHourChange,
  getValidValueMinuteChange
} from '../gux-time-picker.service';

import {
  GuxClockType,
  GuxISOHourMinute,
  GuxMinuteInterval,
  GuxMinuteStep
} from '../gux-time-picker.type';

describe('gux-time-picker.service', () => {
  describe('#getTimeDisplayValues', () => {
    [
      {
        minuteInterval: 15,
        clockType: '24h',
        expectedOutput: [
          '00:00',
          '00:15',
          '00:30',
          '00:45',
          '01:00',
          '01:15',
          '01:30',
          '01:45',
          '02:00',
          '02:15',
          '02:30',
          '02:45',
          '03:00',
          '03:15',
          '03:30',
          '03:45',
          '04:00',
          '04:15',
          '04:30',
          '04:45',
          '05:00',
          '05:15',
          '05:30',
          '05:45',
          '06:00',
          '06:15',
          '06:30',
          '06:45',
          '07:00',
          '07:15',
          '07:30',
          '07:45',
          '08:00',
          '08:15',
          '08:30',
          '08:45',
          '09:00',
          '09:15',
          '09:30',
          '09:45',
          '10:00',
          '10:15',
          '10:30',
          '10:45',
          '11:00',
          '11:15',
          '11:30',
          '11:45',
          '12:00',
          '12:15',
          '12:30',
          '12:45',
          '13:00',
          '13:15',
          '13:30',
          '13:45',
          '14:00',
          '14:15',
          '14:30',
          '14:45',
          '15:00',
          '15:15',
          '15:30',
          '15:45',
          '16:00',
          '16:15',
          '16:30',
          '16:45',
          '17:00',
          '17:15',
          '17:30',
          '17:45',
          '18:00',
          '18:15',
          '18:30',
          '18:45',
          '19:00',
          '19:15',
          '19:30',
          '19:45',
          '20:00',
          '20:15',
          '20:30',
          '20:45',
          '21:00',
          '21:15',
          '21:30',
          '21:45',
          '22:00',
          '22:15',
          '22:30',
          '22:45',
          '23:00',
          '23:15',
          '23:30',
          '23:45'
        ]
      },
      {
        minuteInterval: 30,
        clockType: '24h',
        expectedOutput: [
          '00:00',
          '00:30',
          '01:00',
          '01:30',
          '02:00',
          '02:30',
          '03:00',
          '03:30',
          '04:00',
          '04:30',
          '05:00',
          '05:30',
          '06:00',
          '06:30',
          '07:00',
          '07:30',
          '08:00',
          '08:30',
          '09:00',
          '09:30',
          '10:00',
          '10:30',
          '11:00',
          '11:30',
          '12:00',
          '12:30',
          '13:00',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
          '15:30',
          '16:00',
          '16:30',
          '17:00',
          '17:30',
          '18:00',
          '18:30',
          '19:00',
          '19:30',
          '20:00',
          '20:30',
          '21:00',
          '21:30',
          '22:00',
          '22:30',
          '23:00',
          '23:30'
        ]
      },
      {
        minuteInterval: 60,
        clockType: '24h',
        expectedOutput: [
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00'
        ]
      },
      {
        minuteInterval: 15,
        clockType: '12h',
        expectedOutput: [
          '12:00',
          '12:15',
          '12:30',
          '12:45',
          '1:00',
          '1:15',
          '1:30',
          '1:45',
          '2:00',
          '2:15',
          '2:30',
          '2:45',
          '3:00',
          '3:15',
          '3:30',
          '3:45',
          '4:00',
          '4:15',
          '4:30',
          '4:45',
          '5:00',
          '5:15',
          '5:30',
          '5:45',
          '6:00',
          '6:15',
          '6:30',
          '6:45',
          '7:00',
          '7:15',
          '7:30',
          '7:45',
          '8:00',
          '8:15',
          '8:30',
          '8:45',
          '9:00',
          '9:15',
          '9:30',
          '9:45',
          '10:00',
          '10:15',
          '10:30',
          '10:45',
          '11:00',
          '11:15',
          '11:30',
          '11:45'
        ]
      },
      {
        minuteInterval: 30,
        clockType: '12h',
        expectedOutput: [
          '12:00',
          '12:30',
          '1:00',
          '1:30',
          '2:00',
          '2:30',
          '3:00',
          '3:30',
          '4:00',
          '4:30',
          '5:00',
          '5:30',
          '6:00',
          '6:30',
          '7:00',
          '7:30',
          '8:00',
          '8:30',
          '9:00',
          '9:30',
          '10:00',
          '10:30',
          '11:00',
          '11:30'
        ]
      },
      {
        minuteInterval: 60,
        clockType: '12h',
        expectedOutput: [
          '12:00',
          '1:00',
          '2:00',
          '3:00',
          '4:00',
          '5:00',
          '6:00',
          '7:00',
          '8:00',
          '9:00',
          '10:00',
          '11:00'
        ]
      }
    ].forEach(
      ({
        minuteInterval,
        clockType,
        expectedOutput
      }: {
        minuteInterval: GuxMinuteInterval;
        clockType: GuxClockType;
        expectedOutput: GuxISOHourMinute[];
      }) => {
        it(`should work as expected for ${clockType} with ${minuteInterval} minute intervals`, async () => {
          expect(getTimeDisplayValues(minuteInterval, clockType)).toStrictEqual(
            expectedOutput
          );
        });
      }
    );
  });

  describe('#getLocaleClockType', () => {
    [
      { locale: 'ar', expectedOutput: '12h' },
      { locale: 'cs', expectedOutput: '24h' },
      { locale: 'da', expectedOutput: '24h' },
      { locale: 'de', expectedOutput: '24h' },
      { locale: 'en', expectedOutput: '12h' },
      { locale: 'es-es', expectedOutput: '24h' },
      { locale: 'es', expectedOutput: '24h' },
      { locale: 'fi', expectedOutput: '24h' },
      { locale: 'fr-ca', expectedOutput: '24h' },
      { locale: 'fr', expectedOutput: '24h' },
      { locale: 'he', expectedOutput: '24h' },
      { locale: 'it', expectedOutput: '24h' },
      { locale: 'ja', expectedOutput: '24h' },
      { locale: 'ko', expectedOutput: '12h' },
      { locale: 'nl', expectedOutput: '24h' },
      { locale: 'no', expectedOutput: '24h' },
      { locale: 'pl', expectedOutput: '24h' },
      { locale: 'pt-br', expectedOutput: '24h' },
      { locale: 'pt-pt', expectedOutput: '24h' },
      { locale: 'ru', expectedOutput: '24h' },
      { locale: 'sv', expectedOutput: '24h' },
      { locale: 'th', expectedOutput: '24h' },
      { locale: 'tr', expectedOutput: '24h' },
      { locale: 'zh-cn', expectedOutput: '24h' },
      { locale: 'zh-tw', expectedOutput: '12h' }
    ].forEach(
      ({
        locale,
        expectedOutput
      }: {
        locale: string;
        expectedOutput: GuxClockType;
      }) => {
        it(`should work as expected for "${locale}"`, async () => {
          const element = document.createElement('div');
          element.setAttribute('lang', locale);

          expect(getLocaleClockType(element)).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#incrementHour', () => {
    [
      { input: '00:00', delta: 1, expectedOutput: '01:00' },
      { input: '00:00', delta: -1, expectedOutput: '23:00' },
      { input: '00:00', delta: 12, expectedOutput: '12:00' },
      { input: '23:00', delta: 1, expectedOutput: '00:00' },
      { input: '23:00', delta: -1, expectedOutput: '22:00' },
      { input: '23:00', delta: 12, expectedOutput: '11:00' }
    ].forEach(
      ({
        input,
        delta,
        expectedOutput
      }: {
        input: GuxISOHourMinute;
        delta: 1 | -1 | 12;
        expectedOutput: GuxISOHourMinute;
      }) => {
        it(`should work as expected for "${input}" and delta "${delta}"`, async () => {
          expect(incrementHour(input, delta)).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#incrementMinute', () => {
    [
      { input: '00:00', delta: 1, step: 1, expectedOutput: '00:01' },
      { input: '00:00', delta: -1, step: 1, expectedOutput: '00:59' },
      { input: '00:00', delta: 1, step: 5, expectedOutput: '00:05' },
      { input: '00:00', delta: -1, step: 5, expectedOutput: '00:55' },
      { input: '00:00', delta: 1, step: 10, expectedOutput: '00:10' },
      { input: '00:00', delta: -1, step: 10, expectedOutput: '00:50' },
      { input: '00:00', delta: 1, step: 15, expectedOutput: '00:15' },
      { input: '00:00', delta: -1, step: 15, expectedOutput: '00:45' },
      { input: '00:00', delta: 1, step: 20, expectedOutput: '00:20' },
      { input: '00:00', delta: -1, step: 20, expectedOutput: '00:40' },
      { input: '00:00', delta: 1, step: 30, expectedOutput: '00:30' },
      { input: '00:00', delta: -1, step: 30, expectedOutput: '00:30' },
      { input: '00:00', delta: 1, step: 60, expectedOutput: '00:00' },
      { input: '00:00', delta: -1, step: 60, expectedOutput: '00:00' },

      { input: '00:59', delta: 1, step: 1, expectedOutput: '00:00' },
      { input: '00:59', delta: -1, step: 1, expectedOutput: '00:58' },
      { input: '00:59', delta: 1, step: 5, expectedOutput: '00:00' },
      { input: '00:59', delta: -1, step: 5, expectedOutput: '00:55' },
      { input: '00:59', delta: 1, step: 10, expectedOutput: '00:00' },
      { input: '00:59', delta: -1, step: 10, expectedOutput: '00:50' },
      { input: '00:59', delta: 1, step: 15, expectedOutput: '00:00' },
      { input: '00:59', delta: -1, step: 15, expectedOutput: '00:45' },
      { input: '00:59', delta: 1, step: 20, expectedOutput: '00:00' },
      { input: '00:59', delta: -1, step: 20, expectedOutput: '00:40' },
      { input: '00:59', delta: 1, step: 30, expectedOutput: '00:00' },
      { input: '00:59', delta: -1, step: 30, expectedOutput: '00:30' },
      { input: '00:59', delta: 1, step: 60, expectedOutput: '00:00' },
      { input: '00:59', delta: -1, step: 60, expectedOutput: '00:00' },

      { input: '00:01', delta: 1, step: 1, expectedOutput: '00:02' },
      { input: '00:01', delta: -1, step: 1, expectedOutput: '00:00' },
      { input: '00:01', delta: 1, step: 5, expectedOutput: '00:05' },
      { input: '00:01', delta: -1, step: 5, expectedOutput: '00:00' },
      { input: '00:01', delta: 1, step: 10, expectedOutput: '00:10' },
      { input: '00:01', delta: -1, step: 10, expectedOutput: '00:00' },
      { input: '00:01', delta: 1, step: 15, expectedOutput: '00:15' },
      { input: '00:01', delta: -1, step: 15, expectedOutput: '00:00' },
      { input: '00:01', delta: 1, step: 20, expectedOutput: '00:20' },
      { input: '00:01', delta: -1, step: 20, expectedOutput: '00:00' },
      { input: '00:01', delta: 1, step: 30, expectedOutput: '00:30' },
      { input: '00:01', delta: -1, step: 30, expectedOutput: '00:00' },
      { input: '00:01', delta: 1, step: 60, expectedOutput: '00:00' },
      { input: '00:01', delta: -1, step: 60, expectedOutput: '00:00' }
    ].forEach(
      ({
        input,
        delta,
        step,
        expectedOutput
      }: {
        input: GuxISOHourMinute;
        delta: 1 | -1;
        step: GuxMinuteStep;
        expectedOutput: GuxISOHourMinute;
      }) => {
        it(`should work as expected for "${input}", step "${step}" and delta "${delta}"`, async () => {
          expect(incrementMinute(input, delta, step)).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#getDisplayValue', () => {
    [
      { input: '00:00', clockType: '24h', expectedOutput: '00:00' },
      { input: '00:00', clockType: '12h', expectedOutput: '12:00' },
      { input: '12:00', clockType: '24h', expectedOutput: '12:00' },
      { input: '12:00', clockType: '12h', expectedOutput: '12:00' },
      { input: '20:00', clockType: '24h', expectedOutput: '20:00' },
      { input: '20:00', clockType: '12h', expectedOutput: '8:00' }
    ].forEach(
      ({
        input,
        clockType,
        expectedOutput
      }: {
        input: GuxISOHourMinute;
        clockType: GuxClockType;
        expectedOutput: GuxISOHourMinute;
      }) => {
        it(`should work as expected for "${input}" and clockType "${clockType}"`, async () => {
          expect(getDisplayValue(input, clockType)).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#getValue', () => {
    [
      { input: '00:00', clockType: '24h', expectedOutput: '00:00' },
      { input: '12:00', clockType: '24h', expectedOutput: '12:00' },
      { input: '12:00', clockType: '12h', isAm: true, expectedOutput: '00:00' },
      {
        input: '12:00',
        clockType: '12h',
        isAm: false,
        expectedOutput: '12:00'
      },
      { input: '1:00', clockType: '12h', isAm: true, expectedOutput: '01:00' },
      { input: '1:00', clockType: '12h', isAm: false, expectedOutput: '13:00' },
      { input: '11:00', clockType: '12h', isAm: true, expectedOutput: '11:00' },
      { input: '11:00', clockType: '12h', isAm: false, expectedOutput: '23:00' }
    ].forEach(
      ({
        input,
        clockType,
        isAm,
        expectedOutput
      }: {
        input: GuxISOHourMinute;
        clockType: GuxClockType;
        isAm: boolean;
        expectedOutput: GuxISOHourMinute;
      }) => {
        it(`should work as expected for "${input}", clockType "${clockType}" and isAm "${
          isAm ? 'true' : 'false'
        }"`, async () => {
          expect(getValue(input, clockType, isAm)).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#getHourDisplayValue', () => {
    [
      { input: '00:00', clockType: '24h', expectedOutput: '00' },
      { input: '00:00', clockType: '12h', expectedOutput: '12' },
      { input: '12:00', clockType: '24h', expectedOutput: '12' },
      { input: '12:00', clockType: '12h', expectedOutput: '12' },
      { input: '20:00', clockType: '24h', expectedOutput: '20' },
      { input: '20:00', clockType: '12h', expectedOutput: '8' }
    ].forEach(
      ({
        input,
        clockType,
        expectedOutput
      }: {
        input: GuxISOHourMinute;
        clockType: GuxClockType;
        expectedOutput: string;
      }) => {
        it(`should work as expected for "${input}" and clockType "${clockType}"`, async () => {
          expect(getHourDisplayValue(input, clockType)).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#getMinuteDisplayValue', () => {
    [
      { input: '00:00', expectedOutput: '00' },
      { input: '00:15', expectedOutput: '15' },
      { input: '00:30', expectedOutput: '30' },
      { input: '00:59', expectedOutput: '59' }
    ].forEach(
      ({
        input,
        expectedOutput
      }: {
        input: GuxISOHourMinute;
        expectedOutput: string;
      }) => {
        it(`should work as expected for "${input}"`, async () => {
          expect(getMinuteDisplayValue(input)).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#isAm', () => {
    [
      { input: '00:00', expectedOutput: true },
      { input: '11:15', expectedOutput: true },
      { input: '12:30', expectedOutput: false },
      { input: '23:59', expectedOutput: false }
    ].forEach(
      ({
        input,
        expectedOutput
      }: {
        input: GuxISOHourMinute;
        expectedOutput: boolean;
      }) => {
        it(`should work as expected for "${input}"`, async () => {
          expect(isAm(input)).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#getHoursPattern', () => {
    [
      { input: '24h', expectedOutput: '^([01]?[0-9]|2[0-3])$' },
      { input: '12h', expectedOutput: '^(0?[1-9]|1[012])$' }
    ].forEach(
      ({
        input,
        expectedOutput
      }: {
        input: GuxClockType;
        expectedOutput: string;
      }) => {
        it(`should work as expected for "${input}"`, async () => {
          expect(getHoursPattern(input)).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#getMinutesPattern', () => {
    it(`should work as expected"`, async () => {
      expect(getMinutesPattern()).toBe('^[0-5][0-9]$');
    });
  });

  describe('#getValidValueHourChange', () => {
    [
      {
        input: '00:00',
        clockType: '24h',
        change: 'Backspace',
        selectionStart: 2,
        expectedOutput: '00:00'
      },
      {
        input: '00:00',
        clockType: '24h',
        change: 'Backspace',
        selectionStart: 1,
        expectedOutput: '00:00'
      },
      {
        input: '00:00',
        clockType: '24h',
        change: '5',
        selectionStart: 2,
        expectedOutput: '05:00'
      },
      {
        input: '00:00',
        clockType: '24h',
        change: '9',
        selectionStart: 2,
        expectedOutput: '09:00'
      },
      {
        input: '00:00',
        clockType: '24h',
        change: '0',
        selectionStart: 2,
        expectedOutput: '00:00'
      },
      {
        input: '10:00',
        clockType: '24h',
        change: '5',
        selectionStart: 2,
        expectedOutput: '05:00'
      },
      {
        input: '11:00',
        clockType: '24h',
        change: '9',
        selectionStart: 2,
        expectedOutput: '19:00'
      },
      {
        input: '12:00',
        clockType: '24h',
        change: '0',
        selectionStart: 2,
        expectedOutput: '20:00'
      },
      {
        input: '15:00',
        clockType: '24h',
        change: '3',
        selectionStart: 2,
        expectedOutput: '03:00'
      },
      {
        input: '18:00',
        clockType: '24h',
        change: '9',
        selectionStart: 2,
        expectedOutput: '09:00'
      },
      {
        input: '21:00',
        clockType: '24h',
        change: '3',
        selectionStart: 2,
        expectedOutput: '13:00'
      },
      {
        input: '00:00',
        clockType: '24h',
        change: '0',
        selectionStart: 1,
        expectedOutput: '00:00'
      },
      {
        input: '15:00',
        clockType: '24h',
        change: '3',
        selectionStart: 1,
        expectedOutput: '13:00'
      },
      {
        input: '18:00',
        clockType: '24h',
        change: '9',
        selectionStart: 1,
        expectedOutput: '19:00'
      },
      {
        input: '21:00',
        clockType: '24h',
        change: '3',
        selectionStart: 1,
        expectedOutput: '23:00'
      },
      {
        input: '21:00',
        clockType: '24h',
        change: '9',
        selectionStart: 1,
        expectedOutput: '09:00'
      },
      {
        input: '00:00',
        clockType: '12h',
        change: 'Backspace',
        selectionStart: 2,
        expectedOutput: '01:00'
      },
      {
        input: '00:00',
        clockType: '12h',
        change: 'Backspace',
        selectionStart: 1,
        expectedOutput: '02:00'
      },
      {
        input: '00:00',
        clockType: '12h',
        change: '5',
        selectionStart: 2,
        expectedOutput: '05:00'
      },
      {
        input: '00:00',
        clockType: '12h',
        change: '9',
        selectionStart: 2,
        expectedOutput: '09:00'
      },
      {
        input: '00:00',
        clockType: '12h',
        change: '0',
        selectionStart: 2,
        expectedOutput: '00:00'
      },
      {
        input: '10:00',
        clockType: '12h',
        change: '5',
        selectionStart: 2,
        expectedOutput: '05:00'
      },
      {
        input: '11:00',
        clockType: '12h',
        change: '9',
        selectionStart: 2,
        expectedOutput: '09:00'
      },
      {
        input: '12:00',
        clockType: '12h',
        change: '0',
        selectionStart: 2,
        expectedOutput: '12:00'
      },
      {
        input: '15:00',
        clockType: '12h',
        change: '3',
        selectionStart: 2,
        expectedOutput: '15:00'
      },
      {
        input: '18:00',
        clockType: '12h',
        change: '9',
        selectionStart: 2,
        expectedOutput: '21:00'
      },
      {
        input: '21:00',
        clockType: '12h',
        change: '3',
        selectionStart: 2,
        expectedOutput: '15:00'
      },
      {
        input: '00:00',
        clockType: '12h',
        change: '0',
        selectionStart: 1,
        expectedOutput: '10:00'
      },
      {
        input: '15:00',
        clockType: '12h',
        change: '3',
        selectionStart: 1,
        expectedOutput: '15:00'
      },
      {
        input: '18:00',
        clockType: '12h',
        change: '9',
        selectionStart: 1,
        expectedOutput: '21:00'
      },
      {
        input: '21:00',
        clockType: '12h',
        change: '3',
        selectionStart: 1,
        expectedOutput: '15:00'
      },
      {
        input: '21:00',
        clockType: '12h',
        change: '9',
        selectionStart: 1,
        expectedOutput: '21:00'
      }
    ].forEach(
      ({
        input,
        clockType,
        change,
        selectionStart,
        expectedOutput
      }: {
        input: GuxISOHourMinute;
        clockType: GuxClockType;
        change: string;
        selectionStart: number;
        expectedOutput: GuxISOHourMinute;
      }) => {
        it(`should work as expected for "${input}", change "${change}" and selectionStart "${selectionStart}"`, async () => {
          expect(
            getValidValueHourChange(input, clockType, change, selectionStart)
          ).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#getValidValueMinuteChange', () => {
    [
      {
        input: '00:05',
        change: 'Backspace',
        selectionStart: 2,
        expectedOutput: '00:00'
      },
      {
        input: '00:05',
        change: 'Backspace',
        selectionStart: 1,
        expectedOutput: '00:05'
      },
      {
        input: '00:00',
        change: '5',
        selectionStart: 2,
        expectedOutput: '00:05'
      },
      {
        input: '00:32',
        change: '9',
        selectionStart: 2,
        expectedOutput: '00:29'
      },
      {
        input: '00:28',
        change: '0',
        selectionStart: 2,
        expectedOutput: '00:00'
      },
      {
        input: '00:28',
        change: '6',
        selectionStart: 2,
        expectedOutput: '00:06'
      },
      {
        input: '00:32',
        change: '9',
        selectionStart: 1,
        expectedOutput: '00:39'
      },
      {
        input: '00:28',
        change: '3',
        selectionStart: 1,
        expectedOutput: '00:23'
      },
      {
        input: '00:32',
        change: '9',
        selectionStart: 0,
        expectedOutput: '00:09'
      },
      {
        input: '00:28',
        change: '3',
        selectionStart: 0,
        expectedOutput: '00:38'
      }
    ].forEach(
      ({
        input,
        change,
        selectionStart,
        expectedOutput
      }: {
        input: GuxISOHourMinute;
        change: string;
        selectionStart: number;
        expectedOutput: GuxISOHourMinute;
      }) => {
        it(`should work as expected for "${input}", change "${change}" and selectionStart "${selectionStart}"`, async () => {
          expect(getValidValueMinuteChange(input, change, selectionStart)).toBe(
            expectedOutput
          );
        });
      }
    );
  });
});
