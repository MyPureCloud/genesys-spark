declare global {
  // IS_DEV_MODE is rewritten by @rollup/plugin-replace. This definition lets
  // our typescript file typecheck.
  var IS_DEV_MODE: boolean;
}

// Default domain to load assets from
const DEFAULT_DOMAIN = 'mypurecloud.com';

// List of Genesys UI domains
const DOMAIN_LIST = [
  'apne2.pure.cloud',
  'aps1.pure.cloud',
  'cac1.pure.cloud',
  'euw2.pure.cloud',
  'inindca.com',
  'inintca.com',
  'mypurecloud.com.au',
  'mypurecloud.com',
  'mypurecloud.de',
  'mypurecloud.ie',
  'mypurecloud.jp',
  'sae1.pure.cloud',
  'use2.maximus-pure.cloud',
  // 'use2.us-gov-pure.cloud', Assets are not currently deployed to FedRAMP and should fallback to the default domain
  'usw2.pure.cloud'
];

/**
 * Returns the origin that web component assets should be loaded from.
 * Will use the domain of the current window if it matches a Genesys domain.
 */
export function getAssetsOrigin(): string {
  if (IS_DEV_MODE == true) {
    // This conditional is optimized out in production due to @rollup/plugin-replace
    // and rollup's dead code elimination
    return 'http://localhost:3333';
  }

  const matchedDomain = getRegionDomain();
  return `https://app.${matchedDomain || DEFAULT_DOMAIN}`;
}

export function getFontOrigin(): string {
  if (IS_DEV_MODE == true) {
    // Fonts aren't locally hosted during dev mode
    return 'http://app.inindca.com';
  }
  return getAssetsOrigin();
}

function getRegionDomain() {
  const pageHost = window.location.hostname;
  return DOMAIN_LIST.find(regionDomain => pageHost.endsWith(regionDomain));
}
