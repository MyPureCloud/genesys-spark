import { matchesFuzzy } from '../search';

describe('search', () => {
  describe('matches fuzzy', () => {
    it('should not match irrelevant strings', async () => {
      expect(matchesFuzzy('foo', 'bar')).toBe(false);
    });

    it('should match exact strings', async () => {
      expect(matchesFuzzy('foo', 'foo')).toBe(true);
    });

    it('should match contains', async () => {
      expect(matchesFuzzy('oba', 'foobar')).toBe(true);
    });

    it('should match starts with', async () => {
      expect(matchesFuzzy('foo', 'foobar')).toBe(true);
    });

    it('should match ends with', async () => {
      expect(matchesFuzzy('bar', 'foobar')).toBe(true);
    });

    it('should match multiple partial words', async () => {
      expect(matchesFuzzy('dial ph', 'Dial Home Phone')).toBe(true);
    });

    it('should match multiple partial words using +', async () => {
      expect(matchesFuzzy('dial+ph', 'Dial Home Phone')).toBe(true);
    });
  });
});
