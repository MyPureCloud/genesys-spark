import { whenEventIsFrom } from './when-event-is-from';

describe('#whenEventIsFrom', () => {
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
