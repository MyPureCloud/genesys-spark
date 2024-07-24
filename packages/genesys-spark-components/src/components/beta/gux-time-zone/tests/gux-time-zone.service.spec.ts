import { getLocalizedOffset, shortenZone } from '../gux-time-zone.service';
import { GuxTimeZoneIdentifier } from '../../../../i18n/time-zone/types';

interface ZoneTestCase {
  timeZoneId: GuxTimeZoneIdentifier;
  expectedOutput: string;
}

describe('gux-time-zone.service', () => {
  describe('#getLocalizedOffset', () => {
    const cases: ZoneTestCase[] = [
      { timeZoneId: 'Etc/GMT', expectedOutput: 'UTC+00:00' },
      { timeZoneId: 'Etc/GMT-1', expectedOutput: 'UTC+01:00' }
    ];
    cases.forEach(
      ({
        timeZoneId,
        expectedOutput
      }: {
        timeZoneId: GuxTimeZoneIdentifier;
        expectedOutput: string;
      }) => {
        it(`should work as expected for "${timeZoneId}"`, async () => {
          expect(getLocalizedOffset('UTC', timeZoneId)).toBe(expectedOutput);
        });
      }
    );
  });

  describe('#shortenZone', () => {
    [
      { timeZone: 'Etc/GMT', expectedOutput: 'GMT' },
      { timeZone: 'Europe/London', expectedOutput: 'London' }
    ].forEach(({ timeZone, expectedOutput }) => {
      it(`should work as expected for "${timeZone}"`, async () => {
        expect(shortenZone(timeZone)).toBe(expectedOutput);
      });
    });
  });
});
