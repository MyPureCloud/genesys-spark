import {
  determineFullResourceName,
  sanitizeResource,
  fetchResource
} from './fetchResource';

describe('i18n/fetchResource', () => {
  describe('determineFullResourceName()', () => {
    it('should properly build the resource path', () => {
      expect(determineFullResourceName('my-resource', 'en')).toBe(
        '/i18n/my-resource.i18n.en.json'
      );
    });

    it('should default to english', () => {
      expect(determineFullResourceName('my-resource')).toBe(
        '/i18n/my-resource.i18n.en.json'
      );
    });

    it('should support different locales', () => {
      expect(determineFullResourceName('my-resource', 'de')).toBe(
        '/i18n/my-resource.i18n.de.json'
      );
    });

    it('should support resource names', () => {
      expect(determineFullResourceName('my-other-resource', 'en')).toBe(
        '/i18n/my-other-resource.i18n.en.json'
      );
    });
  });

  describe('sanitizeResource()', () => {
    it('should default to an empty string map', () => {
      const sanitized = sanitizeResource(undefined);
      expect(sanitized).toBeDefined();
      expect(sanitized.size).toBe(0);
    });

    it('should handle a simple object with one key', () => {
      const sanitized = sanitizeResource({
        testKey: 'test value'
      });

      expect(sanitized.size).toBe(1);
      expect(sanitized.get('testKey')).toBe('test value');
    });

    it('should handle a simple object with multiple keys', () => {
      const sanitized = sanitizeResource({
        otherKey: 'other value',
        testKey: 'test value'
      });

      expect(sanitized.size).toBe(2);
      expect(sanitized.get('testKey')).toBe('test value');
      expect(sanitized.get('otherKey')).toBe('other value');
    });

    it('should handle non-objects gracefully', () => {
      const sanitized = sanitizeResource(5);

      expect(sanitized).toBeDefined();
      expect(sanitized.size).toBe(0);
    });

    it('should handle nested properties gracefully', () => {
      const sanitized = sanitizeResource({
        nested: { hello: 'test' },
        testKey: 'test value'
      });

      expect(sanitized).toBeDefined();
      expect(sanitized.size).toBe(1);
      expect(sanitized.get('testKey')).toBe('test value');
    });
  });

  describe('fetchResource()', () => {
    let fetchMock: jest.Mock;
    let fetchMockResolve: (val: any) => void;
    let fetchMockReject: (err: any) => void;

    function resolveMockResponse(body, ok = true) {
      if (!fetchMockResolve) {
        return;
      }

      fetchMockResolve({
        json: () => body,
        ok
      });
    }

    beforeEach(() => {
      fetchMockResolve = null;
      fetchMockReject = null;

      fetchMock = jest.fn().mockImplementation(() => {
        return new Promise((res, rej) => {
          fetchMockResolve = res;
          fetchMockReject = rej;
        });
      });

      window.fetch = fetchMock;
    });

    describe('when fetching works properly', () => {
      let promise: Promise<Map<string, string>>;

      beforeEach(() => {
        promise = fetchResource('my-component', 'en');
        resolveMockResponse({ testKey: 'test value' });
      });

      it('should fetch and sanitize the resource', async () => {
        const resource = await promise;
        expect(resource.size).toBe(1);
        expect(resource.get('testKey')).toBe('test value');
      });
    });

    describe('when fetching errors', () => {
      let promise: Promise<Map<string, string>>;

      beforeEach(() => {
        promise = fetchResource('my-component', 'de');
        resolveMockResponse(undefined, false);
      });

      it('should reject the promise', async () => {
        expect(promise).rejects.toThrow(/\/i18n\/my-component.i18n.de.json/);
      });
    });
  });
});
