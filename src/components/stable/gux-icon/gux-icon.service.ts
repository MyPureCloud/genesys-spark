import { getAssetPath } from '@stencil/core';

import { logError } from 'utils/error/log-error';

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

function iconInfoToId(iconName: string): string {
  return iconName.replace('/', '-');
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

export async function getBaseSvgHtml(iconName: string): Promise<string> {
  const id = iconInfoToId(iconName);
  const cachedSvgElement = await svgHTMLCache.get(id);

  if (cachedSvgElement) {
    return cachedSvgElement;
  }

  const svgHtml = fetchIcon(iconName)
    .then(svgText => svgText)
    .catch(err => {
      setTimeout(() => {
        throw err;
      }, 0);

      return getBaseSvgHtml('unknown');
    });

  svgHTMLCache.set(id, svgHtml);

  return svgHtml;
}

export function validateProps(
  decorative: boolean,
  screenreaderText: string
): void {
  if (!decorative && !screenreaderText) {
    logError(
      'gux-icon',
      'No screenreader-text provided. Either provide a localized screenreader-text property or set `decorative` to true.'
    );
  }
}
