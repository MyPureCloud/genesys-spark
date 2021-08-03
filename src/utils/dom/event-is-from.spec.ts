import { eventIsFrom } from './event-is-from';

describe('#eventIsFrom', () => {
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
  } as unknown as Event;

  it('returns true when the event target matches the selector', () => {
    expect(eventIsFrom('.target', dummyEvent)).toBe(true);
  });

  it('returns true when a target ancestor matches the selector', () => {
    expect(eventIsFrom('.parent', dummyEvent)).toBe(true);
  });

  it('returns false when no ancestor matches the selector', () => {
    expect(eventIsFrom('.nothing', dummyEvent)).toBe(false);
  });

  it('returns false when the current target element matches the selector', () => {
    expect(eventIsFrom('.currentTarget', dummyEvent)).toBe(false);
  });
});
