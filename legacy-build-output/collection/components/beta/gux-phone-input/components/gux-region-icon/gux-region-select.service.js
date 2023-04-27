import { getAssetPath } from '@stencil/core';
const imgSrcCache = new Map();
async function fetchImage(imgName) {
  const imgResponse = await fetch(getAssetPath(`./assets/region-flags/${imgName}.png`));
  if (imgResponse.status === 200) {
    return imgResponse.url;
  }
  throw new Error(`[gux-region-select] fetching failed for icon "${imgName}" with status "${imgResponse.statusText} (${imgResponse.status})".`);
}
export async function getImgSource(imgName) {
  const cachedImageSrc = await imgSrcCache.get(imgName);
  if (cachedImageSrc) {
    return cachedImageSrc;
  }
  const imgSrcUrl = fetchImage(imgName)
    .then(imgSrc => imgSrc)
    .catch(err => {
    setTimeout(() => {
      throw err;
    }, 0);
    return '';
  });
  imgSrcCache.set(imgName, imgSrcUrl);
  return imgSrcUrl;
}
