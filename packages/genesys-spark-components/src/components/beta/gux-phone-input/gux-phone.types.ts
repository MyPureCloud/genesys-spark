import { regionCountryCodeMap } from './services/RegionCountryCodeMap';

export type Alpha2Code = keyof typeof regionCountryCodeMap;

export interface Region {
  /** ISO 3166-1 Alpha 2 Code https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 */
  alpha2Code: Alpha2Code;
  /** Country/region dial/calling code https://en.wikipedia.org/wiki/List_of_country_calling_codes */
  dialCode: string;
}

export interface RegionObject extends Region {
  name: string;
}
