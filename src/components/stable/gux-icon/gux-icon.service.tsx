import { getAssetPath } from '@stencil/core';

import { iconNameMap } from './icon-name-map';
import { legacyIconNames } from './legacy-icon-names';

const svgHTMLCache: Map<string, Promise<string>> = new Map();

async function fetchIcon(iconName: string): Promise<string> {
  const iconResponse = await fetch(getAssetPath(`./icons/${iconName}.svg`));

  if (iconResponse.status === 200) {
    return iconResponse.text();
  }

  throw new Error(
    `[gux-icon] fetching failed for icon "${iconName}" with status "${iconResponse.statusText} (${iconResponse.status})".`
  );
}

function iconinfoToId(
  iconName: string,
  decorative: boolean,
  screenreaderText: string
): string {
  return `${iconName.replace('/', '-')}-${decorative}-${screenreaderText}`;
}

export function getRootIconName(iconName: string): string {
  if (iconNameMap[iconName]) {
    return iconNameMap[iconName];
  }

  if (legacyIconNames.includes(iconName)) {
    return `legacy/${iconName}`;
  }

  return iconName;
}

export function getSvgHtml(
  iconName: string,
  decorative: boolean,
  screenreaderText: string
): Promise<string> {
  const id = iconinfoToId(iconName, decorative, screenreaderText);
  const cachedSvgElement = svgHTMLCache.get(id);

  if (cachedSvgElement) {
    return cachedSvgElement;
  }

  const svgHtml = fetchIcon(iconName)
    .then(svgText => {
      const svgElement = new DOMParser().parseFromString(
        svgText,
        'image/svg+xml'
      ).firstChild as SVGElement;
      if (decorative) {
        svgElement.setAttribute('aria-hidden', String(decorative));
      }

      if (screenreaderText) {
        svgElement.setAttribute('aria-label', screenreaderText);
      }

      return svgElement.outerHTML;
    })
    .catch(err => {
      setTimeout(() => {
        throw err;
      }, 0);

      return getSvgHtml('unknown', decorative, screenreaderText);
    });

  svgHTMLCache.set(id, svgHtml);

  return svgHtml;
}
