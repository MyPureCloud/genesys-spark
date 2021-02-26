import {
  incrementDay,
  incrementMonth,
  incrementYear
} from '../gux-datepicker.service';

describe('datepicker.service', () => {
  describe('incrementDay', () => {
    [
      {
        increment: 1,
        inputDate: new Date(2021, 0, 1),
        expectedOutput: new Date(2021, 0, 2)
      },
      {
        increment: -1,
        inputDate: new Date(2021, 0, 1),
        expectedOutput: new Date(2021, 0, 31)
      },
      {
        increment: 1,
        inputDate: new Date(2021, 0, 31),
        expectedOutput: new Date(2021, 0, 1)
      },
      {
        increment: -1,
        inputDate: new Date(2021, 0, 31),
        expectedOutput: new Date(2021, 0, 30)
      }
    ].forEach(({ increment, inputDate, expectedOutput }) => {
      it(`should output ${expectedOutput} for ${inputDate} and an increment of ${increment}`, () => {
        expect(incrementDay(increment, inputDate)).toEqual(expectedOutput);
      });
    });
  });

  describe('incrementMonth', () => {
    [
      {
        increment: 1,
        inputDate: new Date(2021, 0, 1),
        expectedOutput: new Date(2021, 1, 1)
      },
      {
        increment: -1,
        inputDate: new Date(2021, 0, 1),
        expectedOutput: new Date(2021, 11, 1)
      },
      {
        increment: 1,
        inputDate: new Date(2021, 11, 1),
        expectedOutput: new Date(2021, 0, 1)
      },
      {
        increment: -1,
        inputDate: new Date(2021, 11, 1),
        expectedOutput: new Date(2021, 10, 1)
      }
    ].forEach(({ increment, inputDate, expectedOutput }) => {
      it(`should output ${expectedOutput} for ${inputDate} and an increment of ${increment}`, () => {
        expect(incrementMonth(increment, inputDate)).toEqual(expectedOutput);
      });
    });
  });

  describe('incrementYear', () => {
    [
      {
        increment: 1,
        inputDate: new Date(2021, 0, 1),
        expectedOutput: new Date(2022, 0, 1)
      },
      {
        increment: -1,
        inputDate: new Date(2021, 0, 1),
        expectedOutput: new Date(2020, 0, 1)
      }
    ].forEach(({ increment, inputDate, expectedOutput }) => {
      it(`should output ${expectedOutput} for ${inputDate} and an increment of ${increment}`, () => {
        expect(incrementYear(increment, inputDate)).toEqual(expectedOutput);
      });
    });
  });
});
