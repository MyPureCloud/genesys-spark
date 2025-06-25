import { getCldrCanonicalIanaId, getCldrTimezoneId } from './bcp47timezone';

describe('bcp47timezone', () => {
  beforeEach(() => {
    // Clear any cached data before each test
    jest.resetModules();
  });

  describe('getCldrCanonicalIanaId', () => {
    it('should return the canonical IANA ID for a primary timezone', () => {
      expect(getCldrCanonicalIanaId('America/New_York')).toBe('America/New_York');
      expect(getCldrCanonicalIanaId('Europe/London')).toBe('Europe/London');
      expect(getCldrCanonicalIanaId('Etc/UTC')).toBe('Etc/UTC');
    });

    it('should return the canonical IANA ID for an alias timezone', () => {
      expect(getCldrCanonicalIanaId('America/Indiana/Indianapolis')).toBe('America/Indianapolis');
      expect(getCldrCanonicalIanaId('America/Yellowknife')).toBe('America/Edmonton');
      expect(getCldrCanonicalIanaId('UTC')).toBe('Etc/UTC');
    });

    it('should return the input ID for unknown timezones', () => {
      expect(getCldrCanonicalIanaId('Unknown/Timezone')).toBe('Unknown/Timezone');
      expect(getCldrCanonicalIanaId('')).toBe('');
    });
  });

  describe('getCldrTimezoneId', () => {
    it('should return the BCP47 timezone ID for a primary timezone', () => {
      expect(getCldrTimezoneId('America/New_York')).toBe('usnyc');
      expect(getCldrTimezoneId('Europe/London')).toBe('gblon');
      expect(getCldrTimezoneId('UTC')).toBe('utc');
    });

    it('should return the BCP47 timezone ID for an alias timezone', () => {
      expect(getCldrTimezoneId('EST5EDT')).toBe('usnyc');
      expect(getCldrTimezoneId('Europe/Belfast')).toBe('gblon');
      expect(getCldrTimezoneId('Etc/Zulu')).toBe('utc');
    });

    it('should return undefined for unknown timezones', () => {
      expect(getCldrTimezoneId('Unknown/Timezone')).toBeUndefined();
      expect(getCldrTimezoneId('')).toBeUndefined();
    });
  });

  describe('deprecated timezone handling', () => {
    it('should handle deprecated timezones correctly', () => {
      expect(getCldrTimezoneId('deprecated/timezone')).toBeUndefined();
    });
  });
}); 