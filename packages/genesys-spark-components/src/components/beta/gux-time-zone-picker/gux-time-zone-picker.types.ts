export interface GuxTimeZoneListing {
  name: string;
  alternativeName: string;
  abbreviation: string;
  group: string[];
  countryName: string;
  countryCode: string;
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
  localizedGroupName: string;
  formattedOffset: string;
  displayTextNameFormatted: string;
  displayTextOffset: string;
  baseDisplayOffsetText: string;
  countryName: string;
  defaultZone: string;
  priority: number;
}
