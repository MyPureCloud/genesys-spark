import { getLocalizedOffset, shortenZone } from '../gux-time-zone.service';

interface ZoneTestCase {
  timeZoneId: string;
  expectedOutput: string;
}

describe('gux-time-zone.service', () => {
  describe('#getLocalizedOffset', () => {
    const cases: ZoneTestCase[] = [
      { timeZoneId: 'Etc/GMT', expectedOutput: 'UTC+00:00' },
      { timeZoneId: 'Etc/GMT-1', expectedOutput: 'UTC+01:00' },
      { timeZoneId: 'Asia/Calcutta', expectedOutput: 'UTC+05:30' }
    ];
    cases.forEach(
      ({
        timeZoneId,
        expectedOutput
      }: {
        timeZoneId: string;
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
      { timeZone: 'Europe/London', expectedOutput: 'London' },
      { timeZone: 'Asia/Calcutta', expectedOutput: 'Calcutta' }
    ].forEach(({ timeZone, expectedOutput }) => {
      it(`should work as expected for "${timeZone}"`, async () => {
        expect(shortenZone(timeZone)).toBe(expectedOutput);
      });
    });
  });
});
