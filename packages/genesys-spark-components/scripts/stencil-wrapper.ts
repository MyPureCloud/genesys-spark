/* eslint @typescript-eslint/no-unsafe-call: 0 */

/**
 * This module defines a wrapper around stencil's custom element setup that incorporates
 * a CDN url for resource loading at build time. Because it depends on code generated
 * by stencil, it's built in a second pass after the stencil components.  It's normal
 * to see some errors here before building anything
 */
import { defineCustomElements } from '../dist/loader';

// Value templated out during build process (see scripts/wrap-stencil.js)
export const COMPONENT_ASSETS_PATH = '{{component_assets_path}}';

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
  // '.use2.us-gov-pure.cloud', Assets are not currently deployed to FedRAMP and should fallback to the default domain
];

export function registerElements() {
  if (COMPONENT_ASSETS_PATH) {
    defineCustomElements(window, {
      resourcesUrl: `https://${getRegionDomain() + COMPONENT_ASSETS_PATH}`
    });
  } else {
    defineCustomElements();
  }
}

/**
 * Returns the domain that web component assets should be loaded from.
 * Will use the domain of the current window if it matches a Genesys domain.
 */
function getRegionDomain(): string {
  const hostname = window.location.hostname;
  const matchedDomain = DOMAIN_LIST.some(regionDomain =>
    hostname.endsWith(regionDomain)
  );

  if (matchedDomain) {
    if (hostname.startsWith('app.') || hostname.startsWith('app-regional.')) {
      return hostname;
    } else {
      return hostname.replace(/^([^.]+)/, 'app');
    }
  } else {
    return 'app.mypurecloud.com';
  }
}
