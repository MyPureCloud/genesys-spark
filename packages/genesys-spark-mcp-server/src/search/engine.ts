/**
 * Search Engine
 *
 * This module provides search functionality for Genesys Spark components.
 */

import { allComponents } from '../components/json-docs-registry';

// Define types for search options and results
export interface SearchOptions {
  query: string;
  category?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
  fuzzyMatch?: boolean;
  fuzzyThreshold?: number;
  filters?: Record<string, any>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  id: string;
  name: string;
  category: string;
  description: string;
  relevance: number;
  matchedFields: string[];
  tags: string[];
  version: string;
  isExperimental: boolean;
}

export interface SearchResults {
  results: SearchResult[];
  totalResults: number;
  query: string;
  category?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}

/**
 * Search for components
 * @param options - Search options
 * @returns Search results
 */
export function searchComponents(options: SearchOptions): SearchResults {
  const {
    query,
    category,
    tags,
    limit = 10,
    offset = 0,
    fuzzyMatch = true,
    fuzzyThreshold = 0.5, // Lowered for better fuzzy matching
    filters = {},
    sortBy = 'relevance',
    sortOrder = 'desc'
  } = options;

  // Filter components
  let results = Object.values(allComponents)
    .filter((component: any) => {
      let shouldInclude = true;
      const matchedFields: string[] = [];

      // Filter by category
      if (category && component.category !== category) {
        shouldInclude = false;
      }

      // Filter by tags
      if (tags && tags.length > 0 && shouldInclude) {
        const componentTags = component.tags || [];
        if (!componentTags.some((tag: string) => tags.includes(tag))) {
          shouldInclude = false;
        }
      }

      // Filter by custom filters
      if (shouldInclude) {
        for (const [key, value] of Object.entries(filters)) {
          if ((component as any)[key] !== value) {
            shouldInclude = false;
            break;
          }
        }
      }

      // Search by query
      if (query && shouldInclude) {
        const searchFields = [
          { field: 'id', value: component.id || '' },
          { field: 'name', value: component.name || '' },
          { field: 'description', value: component.description || '' },
          { field: 'tags', value: (component.tags || []).join(' ') }
        ];

        let hasMatch = false;
        let matchScore = 0;

        // Split query into terms for multi-word support
        const queryTerms = query.toLowerCase().trim().split(/\s+/);
        const isMultiWord = queryTerms.length > 1;

        // Check for exact phrase match first (highest priority)
        for (const { field, value } of searchFields) {
          if (typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())) {
            matchedFields.push(field);
            hasMatch = true;
            matchScore += 10; // High score for exact phrase match
          }
        }

        // For multi-word queries, also check if all terms are present
        if (isMultiWord) {
          for (const { field, value } of searchFields) {
            if (typeof value === 'string') {
              const fieldValueLower = value.toLowerCase();
              const matchingTerms = queryTerms.filter(term => fieldValueLower.includes(term));

              if (matchingTerms.length > 0) {
                if (!matchedFields.includes(field)) {
                  matchedFields.push(field);
                }
                hasMatch = true;

                // Score based on how many terms match
                const termRatio = matchingTerms.length / queryTerms.length;
                matchScore += termRatio * 5; // Medium score for partial term matches

                // Bonus if all terms match
                if (matchingTerms.length === queryTerms.length) {
                  matchScore += 3; // Bonus for all terms matching
                }
              }
            }
          }
        }

        // If fuzzy matching is enabled and no match found yet
        if (fuzzyMatch && !hasMatch) {
          // Try fuzzy matching on the full query first
          for (const { field, value } of searchFields) {
            if (typeof value === 'string') {
              const similarity = calculateSimilarity(value.toLowerCase(), query.toLowerCase());
              if (similarity >= fuzzyThreshold) {
                matchedFields.push(field);
                hasMatch = true;
                matchScore += similarity * 3; // Score based on similarity
              }
            }
          }

          // For multi-word queries, also try fuzzy matching individual terms
          if (isMultiWord && !hasMatch) {
            for (const { field, value } of searchFields) {
              if (typeof value === 'string') {
                const fieldValueLower = value.toLowerCase();
                let fuzzyMatches = 0;

                for (const term of queryTerms) {
                  // Check exact term match first
                  if (fieldValueLower.includes(term)) {
                    fuzzyMatches++;
                  } else {
                    // Try fuzzy match for this term
                    const termSimilarity = calculateSimilarity(fieldValueLower, term);
                    if (termSimilarity >= fuzzyThreshold) {
                      fuzzyMatches++;
                    }
                  }
                }

                if (fuzzyMatches > 0) {
                  if (!matchedFields.includes(field)) {
                    matchedFields.push(field);
                  }
                  hasMatch = true;
                  matchScore += (fuzzyMatches / queryTerms.length) * 2; // Lower score for fuzzy term matches
                }
              }
            }
          }
        }

        if (!hasMatch) {
          shouldInclude = false;
        } else {
          // Store the match score for relevance calculation
          (component as any).matchScore = matchScore;
        }
      }

      // Add metadata for sorting
      if (shouldInclude) {
        (component as any).matchedFields = matchedFields;
        (component as any).relevance = calculateRelevance(component, query, matchedFields);
      }

      return shouldInclude;
    });

  // Sort results
  results.sort((a: any, b: any) => {
    if (sortBy === 'relevance') {
      return sortOrder === 'asc'
        ? a.relevance - b.relevance
        : b.relevance - a.relevance;
    } else {
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    }
  });

  // Apply pagination
  const paginatedResults = results.slice(offset, offset + limit);

  // Map results to search results
  const searchResults = paginatedResults.map((component: any) => ({
    id: component.id || '',
    name: component.name || '',
    category: component.category || 'other',
    description: component.description || '',
    relevance: component.relevance || 1,
    matchedFields: component.matchedFields || [],
    tags: component.tags || [],
    version: component.version || '4.157.4',
    isExperimental: component.isExperimental || false
  }));

  return {
    results: searchResults,
    totalResults: results.length,
    query,
    category,
    tags,
    limit,
    offset
  };
}

/**
 * Calculate similarity between two strings using Levenshtein distance
 * @param str1 - First string
 * @param str2 - Second string
 * @returns Similarity score between 0 and 1
 */
function calculateSimilarity(str1: string, str2: string): number {
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1;

  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLength;
}

/**
 * Calculate Levenshtein distance between two strings
 * @param str1 - First string
 * @param str2 - Second string
 * @returns Levenshtein distance
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Calculate the relevance score for a component
 * @param component - Component metadata
 * @param query - Search query
 * @param matchedFields - Fields that matched the query
 * @returns Relevance score
 */
function calculateRelevance(
  component: any,
  query: string,
  matchedFields: string[]
): number {
  let relevance = 0;

  // Start with the match score if available (from multi-word matching)
  const baseMatchScore = component.matchScore || 0;
  relevance += baseMatchScore;

  // Assign weights to different fields
  const fieldWeights: Record<string, number> = {
    id: 5,
    name: 4,
    description: 3,
    tags: 2
  };

  // Calculate relevance based on matched fields
  for (const field of matchedFields) {
    relevance += fieldWeights[field] || 1;
  }

  // Boost relevance for exact matches
  if (query) {
    for (const field of matchedFields) {
      const fieldValue = (component as any)[field];

      if (typeof fieldValue === 'string' && fieldValue.toLowerCase() === query.toLowerCase()) {
        relevance *= 2;
        break;
      } else if (Array.isArray(fieldValue)) {
        for (const value of fieldValue) {
          if (typeof value === 'string' && value.toLowerCase() === query.toLowerCase()) {
            relevance *= 2;
            break;
          }
        }
      }
    }
  }

  return relevance;
}

export default {
  searchComponents,
};
