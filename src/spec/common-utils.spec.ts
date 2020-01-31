import {
  asIsoDateRange,
  asIsoDateString,
  fromIsoDateRange,
  fromIsoDateString
} from '../common-utils';

describe('common-utils', () => {
  const startDate = new Date(2020, 0, 15);
  const endDate = new Date(2020, 0, 20);
  const startIsoStr = '2020-01-15';
  const isoRange = '2020-01-15/2020-01-20';

  describe('ISO date formatting', () => {
    it('can convert a single date', () => {
      const isoStr = asIsoDateString(startDate);
      expect(isoStr).toBe(startIsoStr);
    });

    it('can convert a date range', () => {
      const isoStr = asIsoDateRange(startDate, endDate);
      expect(isoStr).toBe(isoRange);
    });

    it('always converts date ranges in the correct order', () => {
      const isoStr = asIsoDateRange(endDate, startDate);
      expect(isoStr).toBe(isoRange);
    });
  });

  describe('ISO date parsing', () => {
    it('can parse a date', () => {
      const date = fromIsoDateString(startIsoStr);
      expect(date).toEqual(startDate);
    });

    it('can parse a date range', () => {
      const [start, end] = fromIsoDateRange(isoRange);
      expect(start).toEqual(startDate);
      expect(end).toEqual(endDate);
    });
  });
});
