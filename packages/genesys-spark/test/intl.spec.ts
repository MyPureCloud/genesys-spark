import {
  determineDisplayLocale,
  dateTimeFormat,
  relativeTimeFormat
} from '../src/intl';

describe('The intl module', () => {
  beforeEach(() => {
    // Reset the Dom
    document.documentElement.innerHTML = '<head></head><body></body>';
    // Remove language attribute from <html>
    document.documentElement.removeAttribute('lang');
    // Reset/set navigator.language to a known value
    Object.defineProperty(window.navigator, 'language', {
      value: 'yy-YY',
      configurable: true
    });
  });

  describe('When determining what locale to use', () => {
    test('It will determine the display locale from <body> if no locale is provided', () => {
      document.body.setAttribute('lang', 'xx-XX');
      expect(determineDisplayLocale()).toBe('xx-XX');
    });
    test('It will determine the display locale from <html> if no locale is provided', () => {
      document.documentElement.setAttribute('lang', 'xx-XX');
      expect(determineDisplayLocale()).toBe('xx-XX');
    });
    test('Given an element with a language attribute, it will determine the locale from that tag', () => {
      const target = document.createElement('div');
      target.setAttribute('lang', 'xx-XX');
      expect(determineDisplayLocale(target)).toBe('xx-XX');
    });
    test("Given an element without a language attribute, it will check the element's ancestors for a language attribute", () => {
      const localeOwner = document.createElement('div');
      localeOwner.setAttribute('lang', 'xx-XX');
      localeOwner.innerHTML =
        '<div><div><span class="target"></span></div></div>';
      const target =
        localeOwner.querySelector<HTMLElement>('.target') || undefined;
      expect(target).not.toBeUndefined();
      expect(determineDisplayLocale(target)).toBe('xx-XX');
    });
    test("If no language tag is found, uses the browser's language", () => {
      expect(determineDisplayLocale()).toBe('yy-YY');
    });
    test('If given a partial match to the browser language, it will pull the region from the browser', () => {
      document.body.setAttribute('lang', 'yy');
      expect(determineDisplayLocale()).toBe('yy-YY');
    });
  });

  describe('When creating a DateTimeFormat', () => {
    const formatOptions: Intl.DateTimeFormatOptions = {};
    beforeEach(() => {
      jest.resetAllMocks();
      jest.spyOn(Intl, 'DateTimeFormat');
    });
    it('Calls through to the browser implementation', () => {
      dateTimeFormat('xx-XX', formatOptions);
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith('xx-XX', formatOptions);
    });
    it('The locale is optional and will defer to `determineDisplayLocale`', () => {
      document.body.setAttribute('lang', 'xx-XX');
      dateTimeFormat(formatOptions);
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith('xx-XX', formatOptions);
    });
    it('Maintains optional format options', () => {
      dateTimeFormat('en-US');
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith('en-US', undefined);
    });
  });

  describe('When creating a RelativeTimeFormat', () => {
    const formatOptions: Intl.RelativeTimeFormatOptions = {};
    beforeEach(() => {
      jest.resetAllMocks();
      // This has to be different than the DateTimeFormat mock - probably because of some ES6 class
      // thing that I can't be bothered to figure out.
      Object.defineProperty(Intl, 'RelativeTimeFormat', {
        value: jest.fn()
      });
    });
    it('Calls through to the browser implementation', () => {
      relativeTimeFormat('xx-XX', formatOptions);
      expect(Intl.RelativeTimeFormat).toHaveBeenCalledWith(
        'xx-XX',
        formatOptions
      );
    });
    it('The locale is optional and will defer to `determineDisplayLocale`', () => {
      document.body.setAttribute('lang', 'xx-XX');
      relativeTimeFormat(formatOptions);
      expect(Intl.RelativeTimeFormat).toHaveBeenCalledWith(
        'xx-XX',
        formatOptions
      );
    });
    it('Maintains optional format options', () => {
      relativeTimeFormat('en-US');
      expect(Intl.RelativeTimeFormat).toHaveBeenCalledWith('en-US', undefined);
    });
  });
});
