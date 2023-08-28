import { RegionCode } from './services/RegionCountryCodeMap';

export interface Region {
  alphaCode: RegionCode;
  dialCode: string;
}
