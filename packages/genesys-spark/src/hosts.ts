declare global {
  // IS_DEV_MODE is rewritten by @rollup/plugin-replace. This definition lets
  // our typescript file typecheck.
  var IS_DEV_MODE: boolean; // eslint-disable-line no-var
}

// Default domain to load assets from
const DEFAULT_DOMAIN = 'mypurecloud.com';

// List of Genesys UI domains that do not follow the ${region}.pure.cloud format
const NON_STANDARD_DOMAINS = [
  'inindca.com',
  'inintca.com',
  'mypurecloud.com.au',
  'mypurecloud.com',
  'mypurecloud.de',
  'mypurecloud.ie',
  'mypurecloud.jp'
  // 'use2.us-gov-pure.cloud', Assets are not currently deployed to FedRAMP. It should fall back to the default domain.
];

/**
 * Returns the origin that web component assets should be loaded from.
 * Will use the domain of the current window if it matches a Genesys domain.
 */
export function getComponentAssetsOrigin(): string {
  if (IS_DEV_MODE == true) {
    // This conditional is optimized out in production due to @rollup/plugin-replace
    // and rollup's dead code elimination
    return 'http://localhost:3733';
  }

  return getAssetsOrigin();
}

export function getChartComponentAssetsOrigin(): string {
  if (IS_DEV_MODE == true) {
    // This conditional is optimized out in production due to @rollup/plugin-replace
    // and rollup's dead code elimination
    return 'http://localhost:3734';
  }

  return getAssetsOrigin();
}

export function getAssetsOrigin(): string {
  const matchedDomain = getRegionDomain();
  return `https://app.${matchedDomain || DEFAULT_DOMAIN}`;
}

export function getFontOrigin(): string {
  if (IS_DEV_MODE == true) {
    // Fonts aren't locally hosted during dev mode
    return 'http://app.inindca.com';
  }
  return getComponentAssetsOrigin();
}

function getRegionDomain() {
  const pageHost = window.location.hostname;

  // We can automatically handle the standard domain format: ${region}.pure.cloud
  if (pageHost.endsWith('.pure.cloud')) {
    return pageHost.split('.').slice(-3).join('.');
  }

  // For older domains, we have to do a lookup
  return NON_STANDARD_DOMAINS.find(regionDomain =>
    pageHost.endsWith(regionDomain)
  );
}
