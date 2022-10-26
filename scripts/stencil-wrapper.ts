/**
 * This module defines a wrapper around stencil's custom element setup that incorporates
 * a CDN url for resource loading at build time. Because it depends on code generated
 * by stencil, it's built in a second pass after the stencil components.  It's normal
 * to see some errors here before building anything
 */
import { defineCustomElements } from '../dist/loader';

// Value templated out during build process (see scripts/wrap-stencil.js)
export const CDN_URL = '{{cdn_url}}';

export async function registerElements() {
  if (CDN_URL) {
    await defineCustomElements(window, { resourcesUrl: CDN_URL });
  } else {
    await defineCustomElements();
  }
}
