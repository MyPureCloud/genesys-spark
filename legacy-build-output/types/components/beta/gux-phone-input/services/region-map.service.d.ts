import { GetI18nValue } from '../../../../i18n';
import libphonenumber from 'google-libphonenumber';
export declare function getRegionObjects(locale: string, i18n: GetI18nValue, phoneUtil: libphonenumber.PhoneNumberUtil): RegionObject[];
export interface RegionObject {
  code: string;
  name: string;
  countryCode: string;
}
