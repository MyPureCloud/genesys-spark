import {
  asIsoDateRange,
  asIsoDateString,
  fromIsoDateRange,
  fromIsoDateString,
  whenEventIsFrom
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

  describe('whenEventIsFrom() helper', () => {
    const currentTarget = {
      matches: selector => {
        return selector === '.currentTarget';
      }
    };
    const parentElement = {
      matches: selector => {
        return selector === '.parent';
      }
    };
    const targetElement = {
      matches: selector => {
        return selector === '.target';
      },
      parentElement
    };
    const dummyEvent = {
      target: targetElement
    };

    it('runs the handler when the event target matches the selector', () => {
      const mockHandler = jest.fn();
      whenEventIsFrom('.target', dummyEvent, mockHandler);
      expect(mockHandler.mock.calls[0][0]).toBe(targetElement);
    });

    it('runs the handler when a target ancestor matches the selector', () => {
      const mockHandler = jest.fn();
      whenEventIsFrom('.parent', dummyEvent, mockHandler);
      expect(mockHandler.mock.calls[0][0]).toBe(parentElement);
    });

    it('does not run the handler when no ancestor matches the selector', () => {
      const mockHandler = jest.fn();
      whenEventIsFrom('.nothing', dummyEvent, mockHandler);
      expect(mockHandler.mock.calls.length).toBe(0);
    });

    it('does not run the handler when the current target element matches the selector', () => {
      const mockHandler = jest.fn();
      whenEventIsFrom('.currentTarget', dummyEvent, mockHandler);
      expect(mockHandler.mock.calls.length).toBe(0);
    });
  });
});
