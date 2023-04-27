import { regionCountryCodeMap } from './RegionCountryCodeMap';
export function getRegionObjects(locale, i18n, phoneUtil) {
  let regionObjects = [];
  for (const [key, val] of Object.entries(regionCountryCodeMap)) {
    regionObjects.push({
      code: key,
      name: i18n(key),
      countryCode: val
    });
  }
  regionObjects = regionObjects.filter(r => phoneUtil.getSupportedRegions().includes(r.code));
  regionObjects.sort((a, b) => a.name.localeCompare(b.name, locale));
  return regionObjects;
}
