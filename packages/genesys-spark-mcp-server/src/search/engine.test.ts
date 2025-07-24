import { searchComponents } from './engine';
import { allComponents } from '../components/json-docs-registry';

describe('Search Engine', () => {
  const performSearch = (options: any) => searchComponents({ limit: 10, ...options });

  const expectValidResults = (result: any, minResults = 1) => {
    expect(result.totalResults).toBeGreaterThanOrEqual(minResults);
    expect(result.results.length).toBeGreaterThanOrEqual(Math.min(minResults, 1));
    expect(result.results.length).toBeLessThanOrEqual(result.totalResults);
  };

  const expectValidResultStructure = (results: any[]) => {
    results.forEach(component => {
      expect(component).toHaveProperty('id');
      expect(component).toHaveProperty('name');
      expect(component).toHaveProperty('description');
      expect(component).toHaveProperty('category');
      expect(component).toHaveProperty('relevance');
      expect(typeof component.relevance).toBe('number');
      expect(component.relevance).toBeGreaterThan(0);
    });
  };

  const expectRelevanceMatch = (results: any[], searchTerms: string[]) => {
    const hasMatch = results.some(r =>
      searchTerms.some(term =>
        r.id.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term)
      )
    );
    expect(hasMatch).toBe(true);
  };

  const findComponentsByPattern = (pattern: string) =>
    Object.values(allComponents).filter((c: any) =>
      c.id.includes(pattern) || c.description.toLowerCase().includes(pattern)
    );

  describe('searchComponents', () => {
    describe('Single Word Search', () => {
      it('should find components by exact ID match', () => {
        const buttonComponents = findComponentsByPattern('button');

        if (buttonComponents.length > 0) {
          const testComponent = buttonComponents[0] as any;
          const result = performSearch({ query: testComponent.id });

          expectValidResults(result);
          expect(result.results[0].id).toBe(testComponent.id);
        } else {
          const anyComponent = Object.values(allComponents)[0] as any;
          const result = performSearch({ query: anyComponent.id });
          expectValidResults(result);
        }
      });

      // Parameterized tests for different search types
      const searchTestCases = [
        { query: 'button', expectedTerms: ['button'] },
        { query: 'form', expectedTerms: ['form'] },
        { query: 'dropdown', expectedTerms: ['dropdown'] }
      ];

      searchTestCases.forEach(({ query, expectedTerms }) => {
        it(`should find components matching "${query}"`, () => {
          const result = performSearch({ query });
          expectValidResults(result);
          expectRelevanceMatch(result.results, expectedTerms);
          expectValidResultStructure(result.results);
        });
      });
    });

    describe('Multi-Word Search', () => {
      const multiWordTestCases = [
        { query: 'form field', expectedTerms: ['form', 'field'] },
        { query: 'text input', expectedTerms: ['text', 'input'] },
        { query: 'dropdown field', expectedTerms: ['dropdown', 'field'] }
      ];

      multiWordTestCases.forEach(({ query, expectedTerms }) => {
        it(`should find components with multi-word query "${query}"`, () => {
          const result = performSearch({ query });
          expectValidResults(result);
          expectRelevanceMatch(result.results, expectedTerms);
        });
      });

      it('should handle multi-word search with proper relevance scoring', () => {
        const result = performSearch({ query: 'button action' });
        expectValidResults(result);

        // Verify relevance scores are in descending order
        for (let i = 0; i < result.results.length - 1; i++) {
          expect(result.results[i].relevance).toBeGreaterThanOrEqual(result.results[i + 1].relevance);
        }

        expectRelevanceMatch(result.results, ['button', 'action']);
      });
    });

    describe('Fuzzy Search', () => {
      const fuzzyTestCases = [
        { query: 'buttton', description: 'typo: extra t', expectedTerms: ['button'] },
        { query: 'buton', description: 'typo: missing t', expectedTerms: ['button'] }
      ];

      fuzzyTestCases.forEach(({ query, description, expectedTerms }) => {
        it(`should find components with ${description} when fuzzy search is enabled`, () => {
          const result = performSearch({
            query,
            fuzzyMatch: true,
            fuzzyThreshold: 0.5
          });
          expectValidResults(result);
          expectRelevanceMatch(result.results, expectedTerms);
        });
      });

      it('should not find components with typos when fuzzy search is disabled', () => {
        const result = performSearch({ query: 'buttton', fuzzyMatch: false });
        expect(result.totalResults).toBe(0);
      });

      it('should respect fuzzy threshold settings', () => {
        const strictResult = performSearch({
          query: 'buttton',
          fuzzyMatch: true,
          fuzzyThreshold: 0.9
        });
        const lenientResult = performSearch({
          query: 'buttton',
          fuzzyMatch: true,
          fuzzyThreshold: 0.3
        });

        expect(lenientResult.totalResults).toBeGreaterThanOrEqual(strictResult.totalResults);
      });
    });

    describe('Category Filtering', () => {
      it('should filter components by category', () => {
        const categories = [...new Set(Object.values(allComponents).map((c: any) => c.category))];
        const testCategory = categories[0];

        const result = performSearch({ query: '', category: testCategory });
        expectValidResults(result);

        result.results.forEach(component => {
          expect(component.category).toBe(testCategory);
        });
      });

      it('should combine category filter with search query', () => {
        const buttonComponents = findComponentsByPattern('button');

        if (buttonComponents.length > 0) {
          const testCategory = (buttonComponents[0] as any).category;
          const result = performSearch({ query: 'button', category: testCategory });
          expectValidResults(result);

          result.results.forEach(component => {
            expect(component.category).toBe(testCategory);
            const isButtonRelated = component.id.includes('button') ||
                                  component.description.toLowerCase().includes('button');
            expect(isButtonRelated).toBe(true);
          });
        } else {
          const result = performSearch({ query: '', category: 'Actions' });
          expect(result.totalResults).toBeGreaterThanOrEqual(0);
        }
      });
    });

    describe('Tag Filtering', () => {
      it('should filter components by tags', () => {
        const allTags = Object.values(allComponents).flatMap((c: any) => c.tags || []);
        const uniqueTags = [...new Set(allTags)];

        if (uniqueTags.length > 0) {
          const testTag = uniqueTags[0];
          const result = performSearch({ query: '', tags: [testTag] });
          expectValidResults(result);

          result.results.forEach(component => {
            expect(component.tags).toContain(testTag);
          });
        } else {
          expect(true).toBe(true); // Skip if no tags available
        }
      });

      it('should filter components by multiple tags', () => {
        const componentsWithTags = Object.values(allComponents).filter((c: any) =>
          c.tags && c.tags.length >= 2
        );

        if (componentsWithTags.length > 0) {
          const testComponent = componentsWithTags[0] as any;
          const testTags = testComponent.tags.slice(0, 2);

          const result = performSearch({ query: '', tags: testTags });
          expectValidResults(result);

          result.results.forEach(component => {
            expect(component.tags.some(tag => testTags.includes(tag))).toBe(true);
          });
        } else {
          expect(true).toBe(true); // Skip if no components with multiple tags
        }
      });
    });

    describe('Pagination', () => {
      it('should respect limit parameter', () => {
        const result = performSearch({ query: '', limit: 3 });
        expectValidResults(result, 0);
        expect(result.results.length).toBeLessThanOrEqual(3);
      });

      it('should respect offset parameter', () => {
        const firstResult = performSearch({ query: '', limit: 5, offset: 0 });
        const secondResult = performSearch({ query: '', limit: 5, offset: 2 });

        expectValidResults(firstResult);
        expectValidResults(secondResult);
        expect(firstResult.results[2].id).toBe(secondResult.results[0].id);
      });
    });

    describe('Sorting', () => {
      it('should sort by relevance by default in descending order', () => {
        const result = performSearch({ query: 'button' });
        expectValidResults(result);

        for (let i = 0; i < result.results.length - 1; i++) {
          expect(result.results[i].relevance).toBeGreaterThanOrEqual(result.results[i + 1].relevance);
        }
      });

      it('should sort by name when specified', () => {
        const result = performSearch({ query: '', sortBy: 'name', sortOrder: 'asc', limit: 5 });
        expectValidResults(result);

        for (let i = 0; i < result.results.length - 1; i++) {
          expect(result.results[i].name.localeCompare(result.results[i + 1].name)).toBeLessThanOrEqual(0);
        }
      });
    });

    describe('Edge Cases', () => {
             const edgeCaseTests = [
         {
           name: 'empty query',
           query: '',
           expectResults: 175, // Total component count
           expectMaxResults: 10
         },
        {
          name: 'queries with only whitespace',
          query: '   ',
          expectResults: (result) => result > 0,
          expectMaxResults: 10
        },
        {
          name: 'non-existent queries gracefully',
          query: 'nonexistentcomponent12345',
          expectResults: 0,
          expectMaxResults: 0
        }
      ];

      edgeCaseTests.forEach(({ name, query, expectResults, expectMaxResults }) => {
        it(`should handle ${name}`, () => {
          const result = performSearch({ query });

          if (typeof expectResults === 'number') {
            expect(result.totalResults).toBe(expectResults);
          } else {
            expect(expectResults(result.totalResults)).toBe(true);
          }

          expect(result.results.length).toBeLessThanOrEqual(expectMaxResults);
        });
      });

      it('should handle queries with special characters', () => {
        const componentWithHyphen = Object.values(allComponents).find((c: any) =>
          c.id && c.id.includes('-')
        ) as any;

        if (componentWithHyphen) {
          const result = performSearch({ query: componentWithHyphen.id });
          expectValidResults(result);
          expect(result.results[0].id).toBe(componentWithHyphen.id);
        } else {
          const result = performSearch({ query: 'gux-' });
          expect(result.totalResults).toBeGreaterThanOrEqual(0);
        }
      });

      it('should handle case-insensitive search', () => {
        const lowerResult = performSearch({ query: 'button' });
        const upperResult = performSearch({ query: 'BUTTON' });
        expect(lowerResult.totalResults).toBe(upperResult.totalResults);
      });
    });

    describe('Return Value Structure', () => {
      it('should return properly structured search results', () => {
        const result = performSearch({ query: 'button' });

        expect(result).toHaveProperty('results');
        expect(result).toHaveProperty('totalResults');
        expect(result).toHaveProperty('query');
        expect(result).toHaveProperty('category');
        expect(result).toHaveProperty('tags');
        expect(result).toHaveProperty('limit');
        expect(result).toHaveProperty('offset');

        expectValidResultStructure(result.results);
      });
    });
  });

  describe('Performance', () => {
    it('should complete searches in reasonable time', () => {
      const startTime = Date.now();
      const result = performSearch({ query: 'form' });
      const duration = Date.now() - startTime;

      expectValidResults(result);
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should handle large result sets efficiently', () => {
      const result = performSearch({ query: '', limit: 200 });
      expectValidResults(result, 50); // Expect many results for empty query
      expect(result.results.length).toBeLessThanOrEqual(200);
    });

    it('should handle multiple concurrent searches', async () => {
      const queries = ['button', 'form', 'dropdown', 'table', 'list'];
      const promises = queries.map(query =>
        Promise.resolve(performSearch({ query }))
      );

      const results = await Promise.all(promises);

      results.forEach((result, index) => {
        expectValidResults(result);
        expect(result.query).toBe(queries[index]);
      });
    });
  });
});