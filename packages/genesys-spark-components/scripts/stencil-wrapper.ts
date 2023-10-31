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

// Default domain to load assets from
const DEFAULT_DOMAIN = 'app.mypurecloud.com';

// List of Genesys UI domains
const DOMAIN_LIST = [
  'apne2.pure.cloud',
  'apne3.pure.cloud',
  'aps1.pure.cloud',
  'cac1.pure.cloud',
  'euc2.pure.cloud',
  'euw2.pure.cloud',
  'inindca.com',
  'inintca.com',
  'mec1.pure.cloud',
  'mypurecloud.com',
  'mypurecloud.com.au',
  'mypurecloud.de',
  'mypurecloud.ie',
  'mypurecloud.jp',
  'sae1.pure.cloud',
  'use2.maximus-pure.cloud',
  // 'use2.us-gov-pure.cloud', Assets are not currently deployed to FedRAMP and should fallback to the default domain
  'usw2.pure.cloud'
];

export function registerElements() {
  if (COMPONENT_ASSETS_PATH) {
    defineCustomElements(window, {
      resourcesUrl: `https://${getDomain() + COMPONENT_ASSETS_PATH}`
    });
  } else {
    defineCustomElements();
  }
}

/**
 * Returns the domain that web component assets should be loaded from.
 * Will use the domain of the current window if it matches a Genesys domain.
 */
function getDomain(): string {
  const hostname = window.location.hostname;
  const matchedDomain = DOMAIN_LIST.find(regionDomain =>
    hostname.endsWith(regionDomain)
  );

  if (matchedDomain) {
    return `app.${matchedDomain}`;
  }

  if (hostname.endsWith('.pure.cloud')) {
    return `app.${hostname.split('.').slice(-3).join('.')}`;
  }

  return DEFAULT_DOMAIN;
}
