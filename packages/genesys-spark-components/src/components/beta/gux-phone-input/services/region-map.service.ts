import { regionCountryCodeMap } from './RegionCountryCodeMap';
import { GetI18nValue } from '../../../../i18n';
import libphonenumber from 'google-libphonenumber';
import { Alpha2Code, RegionObject } from '../gux-phone.types';

export function getRegionObjects(
  locale: string,
  i18n: GetI18nValue,
  phoneUtil: libphonenumber.PhoneNumberUtil
): RegionObject[] {
  let regionObjects: RegionObject[] = [];
  for (const [key, val] of Object.entries(regionCountryCodeMap)) {
    regionObjects.push({
      alpha2Code: key as Alpha2Code,
      name: i18n(key),
      dialCode: val
    });
  }
  regionObjects = regionObjects.filter(r =>
    phoneUtil.getSupportedRegions().includes(r.alpha2Code)
  );
  regionObjects.sort((a, b) => a.name.localeCompare(b.name, locale));

  return regionObjects;
}
