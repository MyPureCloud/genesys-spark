import { regionCountryCodeMap } from './RegionCountryCodeMap';
import { GetI18nValue } from '../../../../i18n';
import libphonenumber from 'google-libphonenumber';

export function getRegionObjects(
  locale: string,
  i18n: GetI18nValue,
  phoneUtil: libphonenumber.PhoneNumberUtil
): RegionObject[] {
  let regionObjects: RegionObject[] = [];
  for (const [key, val] of Object.entries(regionCountryCodeMap)) {
    regionObjects.push({
      code: key,
      name: i18n(key),
      countryCode: val
    });
  }
  regionObjects = regionObjects.filter(r =>
    phoneUtil.getSupportedRegions().includes(r.code)
  );
  regionObjects.sort((a, b) => a.name.localeCompare(b.name, locale));

  return regionObjects;
}

export interface RegionObject {
  code: string;
  name: string;
  countryCode: string;
}
