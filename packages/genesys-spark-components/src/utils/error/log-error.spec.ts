import { logError, logWarn } from './log-error';

describe('log-error', () => {
  let mockElement: HTMLElement;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    mockElement = { tagName: 'GUX-BUTTON' } as HTMLElement;
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe('logError', () => {
    it('should log error with component tag name and message', () => {
      logError(mockElement, 'Test error message');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[gux-button] Test error message',
        mockElement
      );
    });
  });

  describe('logWarn', () => {
    it('should log warning with component tag name and message', () => {
      logWarn(mockElement, 'Test warning message');

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[gux-button] Test warning message',
        mockElement
      );
    });
  });
});
