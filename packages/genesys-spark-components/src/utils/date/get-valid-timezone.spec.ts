import { getValidTimezone } from './get-valid-timezone';
// import { timeZoneIdentifiers } from '../../i18n/time-zone/identifiers';

describe('#getValidTimezone', () => {
  // const validTimeZoneIdentifiers = timeZoneIdentifiers;
  const invalidTimeZoneIdentifiers = ['invalid', '', null, undefined];

  // describe('Valid Timezones', () => {
  //   validTimeZoneIdentifiers.forEach((timeZoneIdentifier, index) => {
  //     it(`should work as expected (${index + 1})`, () => {
  //       const output = getValidTimezone(timeZoneIdentifier);

  //       expect(output).toBe(timeZoneIdentifier);
  //     });
  //   });
  // });

  // describe('Valid Timezones with a fallback', () => {
  //   validTimeZoneIdentifiers.forEach((timeZoneIdentifier, index) => {
  //     it(`should work as expected (${index + 1})`, () => {
  //       const output = getValidTimezone(timeZoneIdentifier, 'UTC');

  //       expect(output).toBe(timeZoneIdentifier);
  //     });
  //   });
  // });

  // describe('Invalid Timezones', () => {
  //   invalidTimeZoneIdentifiers.forEach((timeZoneIdentifier, index) => {
  //     it(`should work as expected (${index + 1})`, () => {
  //       const output = getValidTimezone(
  //         timeZoneIdentifier as string
  //       );

  //       expect(output).not.toBeDefined();
  //     });
  //   });
  // });

  describe('Invalid Timezones with a fallback', () => {
    invalidTimeZoneIdentifiers.forEach((timeZoneIdentifier, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = getValidTimezone(timeZoneIdentifier as string, 'UTC');

        expect(output).toBe('UTC');
      });
    });
  });
});
