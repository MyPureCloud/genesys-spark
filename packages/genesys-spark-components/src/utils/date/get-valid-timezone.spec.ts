import { getValidTimezone } from './get-valid-timezone';
import { genesysSupportedTimeZones } from '../../i18n/time-zone/identifiers';

describe('#getValidTimezone', () => {
  const validTimeZoneIdentifiers = genesysSupportedTimeZones;
  const invalidTimeZoneIdentifiers = ['invalid', '', null];

  describe('Valid Timezones', () => {
    validTimeZoneIdentifiers.forEach((timeZoneIdentifier, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = getValidTimezone(timeZoneIdentifier);

        expect(output).toBe(
          Intl.DateTimeFormat('en-US', {
            timeZone: timeZoneIdentifier
          }).resolvedOptions().timeZone
        );
      });
    });
  });

  describe('Valid Timezones with a fallback', () => {
    validTimeZoneIdentifiers.forEach((timeZoneIdentifier, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = getValidTimezone(timeZoneIdentifier, 'UTC');

        expect(output).toBe(
          Intl.DateTimeFormat('en-US', {
            timeZone: timeZoneIdentifier
          }).resolvedOptions().timeZone
        );
      });
    });
  });

  describe('Deprecated Timezones', () => {
    it(`should work as expected`, () => {
      const output = getValidTimezone('Canada/Eastern');
      expect(output).toBe('America/Toronto');
    });
  });

  describe('Deprecated Timezones with a fallback', () => {
    it(`should work as expected`, () => {
      const output = getValidTimezone('Canada/Eastern', 'UTC');
      expect(output).toBe('America/Toronto');
    });
  });

  describe('Undefined Timezone', () => {
    it(`returns system timezone if given undefined`, () => {
      const output = getValidTimezone(undefined);
      expect(output).toBe('UTC');
    });
  });

  describe('Undefined Timezone', () => {
    it(`returns system timezone if given undefined`, () => {
      const output = getValidTimezone(undefined);
      expect(output).toBe('UTC');
    });
  });

  describe('Invalid Timezones', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    invalidTimeZoneIdentifiers.forEach((timeZoneIdentifier, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = getValidTimezone(timeZoneIdentifier as string);
        expect(spy).toHaveBeenCalled();
        expect(output).not.toBeDefined();
      });
    });
  });

  describe('Invalid Timezones with a fallback', () => {
    invalidTimeZoneIdentifiers.forEach((timeZoneIdentifier, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = getValidTimezone(timeZoneIdentifier as string, 'UTC');

        expect(output).toBe('UTC');
      });
    });
  });
});
