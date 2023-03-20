import {
  asIsoDate,
  asIsoDateRange,
  fromIsoDate,
  fromIsoDateRange
} from './iso-dates';

describe('ISO Date', () => {
  describe('#asIsoDate', () => {
    [
      { input: new Date(2020, 0, 1), expectedOutput: '2020-01-01' },
      { input: new Date(2020, 1, 1), expectedOutput: '2020-02-01' },
      { input: new Date(2020, 2, 1), expectedOutput: '2020-03-01' },
      { input: new Date(2020, 3, 1), expectedOutput: '2020-04-01' },
      { input: new Date(2020, 4, 1), expectedOutput: '2020-05-01' },
      { input: new Date(2020, 5, 1), expectedOutput: '2020-06-01' },
      { input: new Date(2020, 6, 1), expectedOutput: '2020-07-01' },
      { input: new Date(2020, 7, 1), expectedOutput: '2020-08-01' },
      { input: new Date(2020, 8, 1), expectedOutput: '2020-09-01' },
      { input: new Date(2020, 9, 1), expectedOutput: '2020-10-01' },
      { input: new Date(2020, 10, 1), expectedOutput: '2020-11-01' },
      { input: new Date(2020, 11, 1), expectedOutput: '2020-12-01' }
    ].forEach(({ input, expectedOutput }, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = asIsoDate(input);

        expect(output).toBe(expectedOutput);
      });
    });
  });

  describe('#asIsoDateRange', () => {
    [
      {
        input: [new Date(2020, 0, 1), new Date(2020, 1, 15)],
        expectedOutput: '2020-01-01/2020-02-15'
      },
      {
        input: [new Date(2020, 1, 1), new Date(2020, 2, 15)],
        expectedOutput: '2020-02-01/2020-03-15'
      },
      {
        input: [new Date(2020, 2, 1), new Date(2020, 3, 15)],
        expectedOutput: '2020-03-01/2020-04-15'
      },
      {
        input: [new Date(2020, 3, 1), new Date(2020, 4, 15)],
        expectedOutput: '2020-04-01/2020-05-15'
      },
      {
        input: [new Date(2020, 4, 1), new Date(2020, 5, 15)],
        expectedOutput: '2020-05-01/2020-06-15'
      },
      {
        input: [new Date(2020, 5, 1), new Date(2020, 6, 15)],
        expectedOutput: '2020-06-01/2020-07-15'
      },
      {
        input: [new Date(2020, 6, 1), new Date(2020, 7, 15)],
        expectedOutput: '2020-07-01/2020-08-15'
      },
      {
        input: [new Date(2020, 7, 1), new Date(2020, 8, 15)],
        expectedOutput: '2020-08-01/2020-09-15'
      },
      {
        input: [new Date(2020, 8, 1), new Date(2020, 9, 15)],
        expectedOutput: '2020-09-01/2020-10-15'
      },
      {
        input: [new Date(2020, 9, 1), new Date(2020, 10, 15)],
        expectedOutput: '2020-10-01/2020-11-15'
      },
      {
        input: [new Date(2020, 10, 1), new Date(2020, 11, 15)],
        expectedOutput: '2020-11-01/2020-12-15'
      },
      {
        input: [new Date(2020, 11, 1), new Date(2021, 0, 15)],
        expectedOutput: '2020-12-01/2021-01-15'
      }
    ].forEach(({ input, expectedOutput }, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = asIsoDateRange(input[0], input[1]);

        expect(output).toBe(expectedOutput);
      });
    });

    it('should handle a start date after an end date', () => {
      const output = asIsoDateRange(new Date(2020, 1, 1), new Date(2020, 0, 1));

      expect(output).toBe('2020-01-01/2020-02-01');
    });
  });

  describe('#fromIsoDate', () => {
    [
      { input: '2020-01-01', expectedOutput: new Date(2020, 0, 1) },
      { input: '2020-02-01', expectedOutput: new Date(2020, 1, 1) },
      { input: '2020-03-01', expectedOutput: new Date(2020, 2, 1) },
      { input: '2020-04-01', expectedOutput: new Date(2020, 3, 1) },
      { input: '2020-05-01', expectedOutput: new Date(2020, 4, 1) },
      { input: '2020-06-01', expectedOutput: new Date(2020, 5, 1) },
      { input: '2020-07-01', expectedOutput: new Date(2020, 6, 1) },
      { input: '2020-08-01', expectedOutput: new Date(2020, 7, 1) },
      { input: '2020-09-01', expectedOutput: new Date(2020, 8, 1) },
      { input: '2020-10-01', expectedOutput: new Date(2020, 9, 1) },
      { input: '2020-11-01', expectedOutput: new Date(2020, 10, 1) },
      { input: '2020-12-01', expectedOutput: new Date(2020, 11, 1) }
    ].forEach(({ input, expectedOutput }, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = fromIsoDate(input);

        expect(output).toStrictEqual(expectedOutput);
      });
    });
  });

  describe('#fromIsoDateRange', () => {
    [
      {
        input: '2020-01-01/2020-02-15',
        expectedOutput: [new Date(2020, 0, 1), new Date(2020, 1, 15)]
      },
      {
        input: '2020-02-01/2020-03-15',
        expectedOutput: [new Date(2020, 1, 1), new Date(2020, 2, 15)]
      },
      {
        input: '2020-03-01/2020-04-15',
        expectedOutput: [new Date(2020, 2, 1), new Date(2020, 3, 15)]
      },
      {
        input: '2020-04-01/2020-05-15',
        expectedOutput: [new Date(2020, 3, 1), new Date(2020, 4, 15)]
      },
      {
        input: '2020-05-01/2020-06-15',
        expectedOutput: [new Date(2020, 4, 1), new Date(2020, 5, 15)]
      },
      {
        input: '2020-06-01/2020-07-15',
        expectedOutput: [new Date(2020, 5, 1), new Date(2020, 6, 15)]
      },
      {
        input: '2020-07-01/2020-08-15',
        expectedOutput: [new Date(2020, 6, 1), new Date(2020, 7, 15)]
      },
      {
        input: '2020-08-01/2020-09-15',
        expectedOutput: [new Date(2020, 7, 1), new Date(2020, 8, 15)]
      },
      {
        input: '2020-09-01/2020-10-15',
        expectedOutput: [new Date(2020, 8, 1), new Date(2020, 9, 15)]
      },
      {
        input: '2020-10-01/2020-11-15',
        expectedOutput: [new Date(2020, 9, 1), new Date(2020, 10, 15)]
      },
      {
        input: '2020-11-01/2020-12-15',
        expectedOutput: [new Date(2020, 10, 1), new Date(2020, 11, 15)]
      },
      {
        input: '2020-12-01/2021-01-15',
        expectedOutput: [new Date(2020, 11, 1), new Date(2021, 0, 15)]
      }
    ].forEach(({ input, expectedOutput }, index) => {
      it(`should work as expected (${index + 1})`, () => {
        const output = fromIsoDateRange(input);

        expect(output).toStrictEqual(expectedOutput);
      });
    });

    it('should handle missing zero padding', () => {
      const output = fromIsoDateRange('2020-1-1/2020-2-15');

      expect(output).toStrictEqual([
        new Date(2020, 0, 1),
        new Date(2020, 1, 15)
      ]);
    });
  });
});
