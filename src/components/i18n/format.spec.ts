import { formatString } from './format';

describe('i18n/format/format()', () => {
  it('should not alter the empty string', () => {
    expect(formatString('')).toBe('');
  });

  it('should just return a string if it doesnt contain format values', () => {
    expect(formatString('test string')).toBe('test string');
  });

  it('should be able to replace string values', () => {
    expect(formatString('My {0} are on fire', 'pants')).toBe(
      'My pants are on fire'
    );
  });

  it('should be able to replace multiple string values', () => {
    expect(formatString('My {0} are {1}', 'pants', 'on fire')).toBe(
      'My pants are on fire'
    );
  });

  it('should be able to replace string values out of order', () => {
    expect(formatString('My {1} are {0}', 'on fire', 'pants')).toBe(
      'My pants are on fire'
    );
  });

  it('should be able to replace the same string value multiple times', () => {
    expect(formatString('My {0} are {0}', 'pants')).toBe('My pants are pants');
  });
});
