import { getAssetPath } from '@stencil/core';
import { logError } from '../../../utils/error/log-error';
import { iconNameMap } from './icon-name-map';
import { legacyIconNames } from './legacy-icon-names';
const svgHTMLCache = new Map();
async function fetchIcon(iconName) {
  const iconResponse = await fetch(getAssetPath(`./icons/${iconName}.svg`));
  if (iconResponse.status === 200) {
    return iconResponse.text();
  }
  throw new Error(`[gux-icon] fetching failed for icon "${iconName}" with status "${iconResponse.statusText} (${iconResponse.status})".`);
}
function iconInfoToId(iconName) {
  return iconName.replace('/', '-');
}
export function getRootIconName(iconName) {
  if (iconNameMap[iconName]) {
    return iconNameMap[iconName];
  }
  if (legacyIconNames.includes(iconName)) {
    return `legacy/${iconName}`;
  }
  return iconName;
}
export async function getBaseSvgHtml(iconName) {
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
export function validateProps(decorative, screenreaderText) {
  if (!decorative && !screenreaderText) {
    logError('gux-icon', 'No screenreader-text provided. Either provide a localized screenreader-text property or set `decorative` to true.');
  }
}
