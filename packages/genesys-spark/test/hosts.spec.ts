import {
  getComponentAssetsOrigin,
  getChartComponentAssetsOrigin,
  getFontOrigin
} from '../src/hosts';

const NON_STANDARD_DOMAINS = [
  'inindca.com',
  'inintca.com',
  'mypurecloud.com.au',
  'mypurecloud.com',
  'mypurecloud.de',
  'mypurecloud.ie',
  'mypurecloud.jp'
];

describe.skip('The hosts module', () => {
  beforeEach(() => {
    window.IS_DEV_MODE = false;
  });

  describe('when determining component asset domains', () => {
    it('Will return the correct domain for pages in a `pure.cloud` region', () => {
      setLocation('https://uis.region.pure.cloud/page');
      expect(getComponentAssetsOrigin()).toBe('https://app.region.pure.cloud');
    });

    it('Will return a default domain for non-genesys hosted pages', () => {
      setLocation('https://www.example.com/page');
      expect(getComponentAssetsOrigin()).toBe('https://app.mypurecloud.com');
    });

    NON_STANDARD_DOMAINS.forEach(domain => {
      const withSubDomain = `https://dummySubdomain.${domain}/page`;
      it(`Will recognize ${withSubDomain} as a Genesys domain`, () => {
        setLocation(withSubDomain);
        expect(getComponentAssetsOrigin()).toBe(`https://app.${domain}`);
      });
    });
  });

  describe('when determining chart component asset domains', () => {
    it('Will return the correct domain for pages in a `pure.cloud` region', () => {
      setLocation('https://uis.region.pure.cloud/page');
      expect(getChartComponentAssetsOrigin()).toBe(
        'https://app.region.pure.cloud'
      );
    });

    it('Will return a default domain for non-genesys hosted pages', () => {
      setLocation('https://www.example.com/page');
      expect(getChartComponentAssetsOrigin()).toBe(
        'https://app.mypurecloud.com'
      );
    });

    NON_STANDARD_DOMAINS.forEach(domain => {
      const withSubDomain = `https://dummySubdomain.${domain}/page`;
      it(`Will recognize ${withSubDomain} as a Genesys domain`, () => {
        setLocation(withSubDomain);
        expect(getChartComponentAssetsOrigin()).toBe(`https://app.${domain}`);
      });
    });
  });

  describe('when determining font domains', () => {
    it('Will return the correct domain for pages in a `pure.cloud` region', () => {
      setLocation('https://uis.region.pure.cloud/page');
      expect(getFontOrigin()).toBe('https://app.region.pure.cloud');
    });

    it('Will return a default domain for non-genesys hosted pages', () => {
      setLocation('https://www.example.com/page');
      expect(getFontOrigin()).toBe('https://app.mypurecloud.com');
    });

    NON_STANDARD_DOMAINS.forEach(domain => {
      const withSubDomain = `https://dummySubdomain.${domain}/page`;
      it(`Will recognize ${withSubDomain} as a Genesys domain`, () => {
        setLocation(withSubDomain);
        expect(getFontOrigin()).toBe(`https://app.${domain}`);
      });
    });
  });
});

/**
 * This is an absolutely disgusting abdication of the type system, but it's a
 * damn sight simpler than most ways to get dynamic per-test location updates.
 * See: https://github.com/jestjs/jest/issues/5124
 */
function setLocation(location: string) {
  //@ts-expect-error - needed to be able to stub out location API
  delete window.location;
  //@ts-expect-error - needed to be able to stub out location API
  window.location = new URL(location);
}
