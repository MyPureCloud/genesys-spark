import { firstDateInMonth, getWeekdays } from '../gux-calendar.service';

describe('calendar.service', () => {
  describe('firstDateInMonth', () => {
    [
      {
        year: 2022,
        month: 0,
        startDayOfWeek: 0,
        expectedOutput: new Date('2021-12-26T01:00:00.000Z')
      },
      {
        year: 2022,
        month: 0,
        startDayOfWeek: 1,
        expectedOutput: new Date('2021-12-27T01:00:00.000Z')
      },
      {
        year: 2022,
        month: 0,
        startDayOfWeek: 6,
        expectedOutput: new Date('2022-01-01T01:00:00.000Z')
      },
      {
        year: 2022,
        month: 0,
        startDayOfWeek: 7,
        expectedOutput: new Date('2021-12-26T01:00:00.000Z')
      }
    ].forEach(({ year, month, startDayOfWeek, expectedOutput }) => {
      it(`should work as expected for ${year}, ${month} and ${startDayOfWeek}`, () => {
        expect(firstDateInMonth(month, year, startDayOfWeek)).toEqual(
          expectedOutput
        );
      });
    });
  });

  describe('getWeekdays', () => {
    [
      {
        local: 'en',
        startDayOfWeek: 0,
        expectedOutput: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      },
      {
        local: 'en',
        startDayOfWeek: 1,
        expectedOutput: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
      },
      {
        local: 'en',
        startDayOfWeek: 6,
        expectedOutput: ['S', 'S', 'M', 'T', 'W', 'T', 'F']
      },
      {
        local: 'en',
        startDayOfWeek: 7,
        expectedOutput: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      }
    ].forEach(({ local, startDayOfWeek, expectedOutput }) => {
      it(`should work as expected for ${local} and ${startDayOfWeek}`, () => {
        expect(getWeekdays(local, startDayOfWeek)).toEqual(expectedOutput);
      });
    });
  });
});
