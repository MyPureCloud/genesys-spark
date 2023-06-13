import {
  firstDateInMonth,
  getWeekdays,
  getOffsetMonthDate,
  getDateMonthAndYearString
} from '../gux-calendar.service';

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
        locale: 'en',
        startDayOfWeek: 0,
        expectedOutput: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      },
      {
        locale: 'en',
        startDayOfWeek: 1,
        expectedOutput: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
      },
      {
        locale: 'en',
        startDayOfWeek: 6,
        expectedOutput: ['S', 'S', 'M', 'T', 'W', 'T', 'F']
      },
      {
        locale: 'en',
        startDayOfWeek: 7,
        expectedOutput: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      },
      {
        locale: 'en',
        startDayOfWeek: 21,
        expectedOutput: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      }
    ].forEach(({ locale, startDayOfWeek, expectedOutput }) => {
      it(`should work as expected for ${locale} and ${startDayOfWeek}`, () => {
        expect(getWeekdays(locale, startDayOfWeek)).toEqual(expectedOutput);
      });
    });
  });

  describe('getOffsetMonthDate', () => {
    [
      {
        baseDate: new Date(2022, 0, 1),
        monthDelta: 0,
        expectedOutput: new Date(2022, 0, 1)
      },
      {
        baseDate: new Date(2022, 0, 1),
        monthDelta: 1,
        expectedOutput: new Date(2022, 1, 1)
      },
      {
        baseDate: new Date(2022, 0, 1),
        monthDelta: 2,
        expectedOutput: new Date(2022, 2, 1)
      },
      {
        baseDate: new Date(2022, 1, 1),
        monthDelta: 0,
        expectedOutput: new Date(2022, 1, 1)
      },
      {
        baseDate: new Date(2022, 0, 30),
        monthDelta: 0,
        expectedOutput: new Date(2022, 0, 1)
      },
      {
        baseDate: new Date(2022, 0, 30),
        monthDelta: 1,
        expectedOutput: new Date(2022, 1, 1)
      },
      {
        baseDate: new Date(2022, 0, 30),
        monthDelta: 2,
        expectedOutput: new Date(2022, 2, 1)
      },
      {
        baseDate: new Date(2022, 11, 1),
        monthDelta: 0,
        expectedOutput: new Date(2022, 11, 1)
      },
      {
        baseDate: new Date(2022, 11, 1),
        monthDelta: 1,
        expectedOutput: new Date(2023, 0, 1)
      },
      {
        baseDate: new Date(2022, 11, 1),
        monthDelta: 2,
        expectedOutput: new Date(2023, 1, 1)
      }
    ].forEach(({ baseDate, monthDelta, expectedOutput }) => {
      it(`should work as expected for ${baseDate.toISOString()} and monthDelta ${monthDelta}`, () => {
        expect(getOffsetMonthDate(baseDate, monthDelta)).toEqual(
          expectedOutput
        );
      });
    });
  });

  describe('getDateMonthAndYearString', () => {
    [
      { locale: 'ar', expectedOutput: 'ديسمبر ٢٠٢٢' },
      { locale: 'cs', expectedOutput: 'Prosinec 2022' },
      { locale: 'da', expectedOutput: 'December 2022' },
      { locale: 'de', expectedOutput: 'Dezember 2022' },
      { locale: 'en', expectedOutput: 'December 2022' },
      { locale: 'es', expectedOutput: 'Diciembre de 2022' },
      { locale: 'es-es', expectedOutput: 'Diciembre de 2022' },
      { locale: 'fi', expectedOutput: 'Joulukuu 2022' },
      { locale: 'fr', expectedOutput: 'Décembre 2022' },
      { locale: 'fr-ca', expectedOutput: 'Décembre 2022' },
      { locale: 'he', expectedOutput: 'דצמבר 2022' },
      { locale: 'it', expectedOutput: 'Dicembre 2022' },
      { locale: 'ja', expectedOutput: '2022年12月' },
      { locale: 'ko', expectedOutput: '2022년 12월' },
      { locale: 'nl', expectedOutput: 'December 2022' },
      { locale: 'no', expectedOutput: 'Desember 2022' },
      { locale: 'pl', expectedOutput: 'Grudzień 2022' },
      { locale: 'pt-br', expectedOutput: 'Dezembro de 2022' },
      { locale: 'pt-pt', expectedOutput: 'Dezembro de 2022' },
      { locale: 'ru', expectedOutput: 'Декабрь 2022 г.' },
      { locale: 'sv', expectedOutput: 'December 2022' },
      { locale: 'th', expectedOutput: 'ธันวาคม 2565' },
      { locale: 'tr', expectedOutput: 'Aralık 2022' },
      { locale: 'uk', expectedOutput: 'Грудень 2022 р.' },
      { locale: 'zh-cn', expectedOutput: '2022年12月' },
      { locale: 'zh-tw', expectedOutput: '2022年12月' }
    ].forEach(({ locale, expectedOutput }) => {
      it(`should work as expected for ${locale}`, () => {
        expect(
          getDateMonthAndYearString(new Date(2022, 11, 31), locale)
        ).toEqual(expectedOutput);
      });
    });
  });
});
