import {
  GuxISOYearMonth,
  getISOYearMonth,
  getYearMonthObject
} from './year-month-values';

describe('Year Month Values', () => {
  describe('#getISOYearMonth', () => {
    [
      { year: 2022, month: '01', expectedOutput: '2022-01' },
      { year: 2022, month: '02', expectedOutput: '2022-02' },
      { year: 2022, month: '03', expectedOutput: '2022-03' },
      { year: 2022, month: '04', expectedOutput: '2022-04' },
      { year: 2022, month: '05', expectedOutput: '2022-05' },
      { year: 2022, month: '06', expectedOutput: '2022-06' },
      { year: 2022, month: '07', expectedOutput: '2022-07' },
      { year: 2022, month: '08', expectedOutput: '2022-08' },
      { year: 2022, month: '09', expectedOutput: '2022-09' },
      { year: '2022', month: 10, expectedOutput: '2022-10' },
      { year: '2022', month: 11, expectedOutput: '2022-11' },
      { year: '2022', month: 12, expectedOutput: '2022-12' }
    ].forEach(({ year, month, expectedOutput }, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = getISOYearMonth(year, month);

        expect(output).toBe(expectedOutput);
      });
    });
  });

  describe('#getYearMonthObject', () => {
    [
      {
        ISOYearMonth: '2022-01',
        expectedOutput: { year: '2022', month: '01' }
      },
      {
        ISOYearMonth: '2022-02',
        expectedOutput: { year: '2022', month: '02' }
      },
      {
        ISOYearMonth: '2022-03',
        expectedOutput: { year: '2022', month: '03' }
      },
      {
        ISOYearMonth: '2022-04',
        expectedOutput: { year: '2022', month: '04' }
      },
      {
        ISOYearMonth: '2022-05',
        expectedOutput: { year: '2022', month: '05' }
      },
      {
        ISOYearMonth: '2022-06',
        expectedOutput: { year: '2022', month: '06' }
      },
      {
        ISOYearMonth: '2022-07',
        expectedOutput: { year: '2022', month: '07' }
      },
      {
        ISOYearMonth: '2022-08',
        expectedOutput: { year: '2022', month: '08' }
      },
      {
        ISOYearMonth: '2022-09',
        expectedOutput: { year: '2022', month: '09' }
      },
      {
        ISOYearMonth: '2022-10',
        expectedOutput: { year: '2022', month: '10' }
      },
      {
        ISOYearMonth: '2022-11',
        expectedOutput: { year: '2022', month: '11' }
      },
      {
        ISOYearMonth: '2022-12',
        expectedOutput: { year: '2022', month: '12' }
      }
    ].forEach(({ ISOYearMonth, expectedOutput }, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = getYearMonthObject(ISOYearMonth as GuxISOYearMonth);

        expect(output).toStrictEqual(expectedOutput);
      });
    });
  });
});
