import { getBaseSvgHtml } from '../gux-illustration.service';

describe('illustration.service', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    const svgResponse = new Response(
      '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16Z"/></svg>'
    );
    fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue(svgResponse);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getBaseSvgHtml', () => {
    it.skip('should only fetch once if the same illustration is requested multiple times', () => {
      return Promise.all([
        getBaseSvgHtml('add', 'variants'),
        getBaseSvgHtml('add', 'variants'),
        getBaseSvgHtml('add', 'variants')
      ]).finally(() => {
        expect(fetchSpy).toHaveBeenCalledTimes(1);
      });
    });

    it.skip('should fetch separately for different types', () => {
      return Promise.all([
        getBaseSvgHtml('success', 'variants'),
        getBaseSvgHtml('success', 'status'),
        getBaseSvgHtml('solid-narrow', 'background-shapes')
      ]).finally(() => {
        expect(fetchSpy).toHaveBeenCalledTimes(3);
      });
    });
  });
});
