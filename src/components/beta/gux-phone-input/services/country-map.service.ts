import { countryCodeMap } from './CountryCodeMap';
import { GetI18nValue } from '../../../../i18n';
import libphonenumber from 'google-libphonenumber';

export function getCountryObjects(
  locale: string,
  i18n: GetI18nValue,
  phoneUtil: libphonenumber.PhoneNumberUtil
): CountryObject[] {
  const countryObjects: CountryObject[] = [];
  for (const [key, val] of Object.entries(countryCodeMap)) {
    if (phoneUtil.getSupportedRegions().includes(key)) {
      countryObjects.push({
        key,
        name: i18n(key),
        code: val
      });
    }
  }

  countryObjects.sort((a, b) => a.name.localeCompare(b.name, locale));

  return countryObjects;
}

export interface CountryObject {
  key: string;
  name: string;
  code: string;
}
