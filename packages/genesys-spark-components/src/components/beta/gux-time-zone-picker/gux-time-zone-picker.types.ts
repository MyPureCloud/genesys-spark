export interface GuxTimeZoneListing {
  name: string;
  alternativeName: string;
  abbreviation: string;
  group: string[];
  countryName: string;
  continentCode: string;
  continentName: string;
  mainCities: string[];
  rawOffsetInMinutes: number;
  rawFormat: string;
  currentTimeOffsetInMinutes: number;
  currentTimeFormat: string;
}

export interface GuxTimeZoneOption {
  value: string;
  localizedName: string;
  formattedOffset: string;
  displayText: string;
}
