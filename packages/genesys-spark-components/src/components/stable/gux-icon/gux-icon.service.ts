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

  if (svgHTMLCache.has(id)) {
    return svgHTMLCache.get(id);
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
