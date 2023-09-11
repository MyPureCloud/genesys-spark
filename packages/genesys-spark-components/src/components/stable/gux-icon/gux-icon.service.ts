import { getAssetPath } from '@stencil/core';

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

export async function getBaseSvgHtml(
  iconName: string = 'unknown'
): Promise<string> {
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
