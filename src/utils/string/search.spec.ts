import { getFuzzyReplacements, matchesFuzzy } from './search';

describe('search', () => {
  describe('matches fuzzy', () => {
    it('should not match irrelevant strings', () => {
      expect(matchesFuzzy('foo', 'bar')).toBe(false);
    });

    it('should match exact strings', () => {
      expect(matchesFuzzy('foo', 'foo')).toBe(true);
    });

    it('should match contains', () => {
      expect(matchesFuzzy('oba', 'foobar')).toBe(true);
    });

    it('should match starts with', () => {
      expect(matchesFuzzy('foo', 'foobar')).toBe(true);
    });

    it('should match ends with', () => {
      expect(matchesFuzzy('bar', 'foobar')).toBe(true);
    });

    it('should match multiple partial words', () => {
      expect(matchesFuzzy('dial ph', 'Dial Home Phone')).toBe(true);
    });

    it('should match multiple partial words using +', () => {
      expect(matchesFuzzy('dial+ph', 'Dial Home Phone')).toBe(true);
    });

    it('should match strings that contain special regex characters', () => {
      expect(matchesFuzzy('foo[bar', 'foo[bar[baz')).toBe(true);
    });
  });

  describe('getFuzzyReplacements', () => {
    it('returns matchers for each word', () => {
      expect(getFuzzyReplacements('foo bar')).toEqual([/foo/i, /bar/i]);
    });

    it('returns matches for words split by +', () => {
      expect(getFuzzyReplacements('foo+bar')).toEqual([/foo/i, /bar/i]);
    });

    it('can return matches for word with special regex characters', () => {
      expect(getFuzzyReplacements('foo[bar')).toEqual([/foo\[bar/i]);
    });
  });
});
