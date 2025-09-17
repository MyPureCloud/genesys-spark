import { getAssetPath } from '@stencil/core';

const svgHTMLCache: Map<string, Promise<string>> = new Map();

function getBackgroundShape(shapeName: string): string {
  return shapeName.includes('narrow') ? 'narrow' : 'wide';
}

function getIllustrationPath(
  illustrationName: string,
  type: 'variants' | 'status' | 'background-shapes'
): string {
  if (type === 'background-shapes') {
    const shapeType = getBackgroundShape(illustrationName);
    return `./illustrations/${type}/${shapeType}.svg`;
  }
  return `./illustrations/${type}/${illustrationName}.svg`;
}

async function fetchIllustration(
  illustrationName: string,
  type: 'variants' | 'status' | 'background-shapes'
): Promise<string> {
  const illustrationResponse = await fetch(
    getAssetPath(getIllustrationPath(illustrationName, type))
  );

  if (illustrationResponse.status === 200) {
    return illustrationResponse.text();
  }

  throw new Error(
    `[gux-illustration] fetching failed for illustration "${illustrationName}" with status "${illustrationResponse.statusText} (${illustrationResponse.status})".`
  );
}

function illustrationInfoToId(illustrationName: string, type: string): string {
  return `${type}-${illustrationName}`;
}

export async function getBaseSvgHtml(
  illustrationName: string,
  type: 'variants' | 'status' | 'background-shapes'
): Promise<string> {
  const id = illustrationInfoToId(illustrationName, type);

  if (svgHTMLCache.has(id)) {
    return svgHTMLCache.get(id);
  }

  const svgHtml = fetchIllustration(illustrationName, type)
    .then(svgText => svgText)
    .catch(err => {
      setTimeout(() => {
        throw err;
      }, 0);

      const defaultIllustrations = {
        variants: 'add',
        status: 'success',
        'background-shapes': 'solid-wide'
      };

      return getBaseSvgHtml(defaultIllustrations[type], type);
    });

  svgHTMLCache.set(id, svgHtml);

  return svgHtml;
}
