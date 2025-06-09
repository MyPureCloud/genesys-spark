declare global {
  // IS_DEV_MODE is rewritten by @rollup/plugin-replace. This definition lets
  // our typescript file typecheck.
  var IS_DEV_MODE: boolean; // eslint-disable-line no-var
}

const DOMAIN_LIST = [
  '.inindca.com',
  '.dev-pure.cloud',

  '.inintca.com',
  '.test-pure.cloud',

  '.mypurecloud.com',
  '.mypurecloud.com.au',
  '.mypurecloud.de',
  '.mypurecloud.ie',
  '.mypurecloud.jp',

  '.pure.cloud',
  '.maximus-pure.cloud'
  // 'use2.us-gov-pure.cloud', Assets are not currently deployed to FedRAMP and should fallback to the default domain
];

/**
 * Returns the origin that web component assets should be loaded from.
 * Will use the domain of the current window if it matches a Genesys domain.
 */
export function getComponentAssetsOrigin(): string {
  if (IS_DEV_MODE == true) {
    // This conditional is optimized out in production due to @rollup/plugin-replace
    // and rollup's dead code elimination
    return `http://${window.location.hostname}:3733`;
  }

  return getAssetsOrigin();
}

export function getChartComponentAssetsOrigin(): string {
  if (IS_DEV_MODE == true) {
    // This conditional is optimized out in production due to @rollup/plugin-replace
    // and rollup's dead code elimination
    return `http://${window.location.hostname}:3734`;
  }

  return getAssetsOrigin();
}

export function getAssetsOrigin(): string {
  const regionDomain = getRegionDomain();
  return `https://${regionDomain}`;
}

export function getFontOrigin(): string {
  if (IS_DEV_MODE == true) {
    // Fonts aren't locally hosted during dev mode
    return 'http://app.inindca.com';
  }
  return getComponentAssetsOrigin();
}

/**
 * Returns the domain that web component assets should be loaded from.
 * Will use the domain of the current window if it matches a Genesys domain.
 */
function getRegionDomain() {
  const hostname = window.location.hostname;
  const matchedDomain = DOMAIN_LIST.some(regionDomain =>
    hostname.endsWith(regionDomain)
  );

  if (matchedDomain) {
    if (hostname.startsWith('app.') || hostname.startsWith('app-regional.')) {
      return hostname;
    }

    return hostname.replace(/^([^.]+)/, 'app');
  }

  return 'app.mypurecloud.com';
}
