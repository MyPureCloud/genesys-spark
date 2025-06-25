import { getCldrTerritoryName } from './territories';

describe('getCldrTerritoryName', () => {
  const validCountryCases: [string, string, string][] = [
    // English locale tests
    ['en', 'US', 'United States'],
    ['en', 'GB', 'United Kingdom'],
    ['en', 'FR', 'France'],
    ['en', 'DE', 'Germany'],
    ['en', 'JP', 'Japan'],
    ['en', 'CA', 'Canada'],
    ['en', 'AU', 'Australia'],
    ['en', 'IT', 'Italy'],
    ['en', 'ES', 'Spain'],
    ['en', 'BR', 'Brazil'],
    
    // French locale tests
    ['fr', 'US', 'États-Unis'],
    ['fr', 'GB', 'Royaume-Uni'],
    ['fr', 'FR', 'France'],
    ['fr', 'DE', 'Allemagne'],
    ['fr', 'JP', 'Japon'],
    ['fr', 'CA', 'Canada'],
    ['fr', 'AU', 'Australie'],
    ['fr', 'IT', 'Italie'],
    ['fr', 'ES', 'Espagne'],
    ['fr', 'BR', 'Brésil'],
    
    // Spanish locale tests
    ['es', 'US', 'Estados Unidos'],
    ['es', 'GB', 'Reino Unido'],
    ['es', 'FR', 'Francia'],
    ['es', 'DE', 'Alemania'],
    ['es', 'JP', 'Japón'],
    ['es', 'CA', 'Canadá'],
    ['es', 'AU', 'Australia'],
    ['es', 'IT', 'Italia'],
    ['es', 'ES', 'España'],
    ['es', 'BR', 'Brasil'],
    
    // German locale tests
    ['de', 'US', 'Vereinigte Staaten'],
    ['de', 'GB', 'Vereinigtes Königreich'],
    ['de', 'FR', 'Frankreich'],
    ['de', 'DE', 'Deutschland'],
    ['de', 'JP', 'Japan'],
    ['de', 'CA', 'Kanada'],
    ['de', 'AU', 'Australien'],
    ['de', 'IT', 'Italien'],
    ['de', 'ES', 'Spanien'],
    ['de', 'BR', 'Brasilien'],
  ];

  const territoryCases: [string, string, string][] = [
    ['en', 'HK', 'Hong Kong SAR China'],
    ['en', 'MO', 'Macao SAR China'],
    ['en', 'TW', 'Taiwan'],
    ['en', 'PR', 'Puerto Rico'],
    ['en', 'GU', 'Guam'],
    ['en', 'VI', 'U.S. Virgin Islands'],
    ['en', 'AS', 'American Samoa'],
    ['en', 'MP', 'Northern Mariana Islands'],
    ['fr', 'HK', 'R.A.S. chinoise de Hong Kong'],
    ['fr', 'MO', 'R.A.S. chinoise de Macao'],
    ['fr', 'TW', 'Taïwan'],
    ['fr', 'PR', 'Porto Rico'],
    ['fr', 'GU', 'Guam'],
  ];

  const invalidCountryCases: [string, string][] = [
    ['en', 'XX'],
    ['en', 'INVALID'],
    ['en', ''],
    ['fr', 'XX'],
    ['fr', 'INVALID'],
    ['fr', ''],
  ];

  const unsupportedLocaleCases: [string, string][] = [
    ['xx', 'US'],
    ['invalid-locale', 'US'],
    ['zz', 'GB'],
    ['test', 'FR'],
  ];

  const defaultLocaleCases: [string, string][] = [
    ['US', 'United States'],
    ['GB', 'United Kingdom'],
    ['FR', 'France'],
    ['DE', 'Germany'],
    ['JP', 'Japan'],
  ];

  const preferShortCases: [string, string, string][] = [
    ['en', 'HK', 'Hong Kong'],
    ['en', 'MO', 'Macao'],
    ['en', 'BA', 'Bosnia'],
    ['en', 'US', 'US'],
    ['en', 'GB', 'UK'],
    ['en', 'CC', 'Cocos Islands'],
    ['en', 'MM', 'Myanmar'],
    ['en', 'PN', 'Pitcairn'],
    ['en', 'PS', 'Palestine'],
    ['fr', 'HK', 'Hong Kong'],
    ['fr', 'MO', 'Macao'],
  ];

  const preferVariantCases: [string, string, string][] = [
    ['en', 'CD', 'Congo (DRC)'],
    ['en', 'CG', 'Congo (Republic)'],
    ['en', 'CI', 'Ivory Coast'],
    ['en', 'CV', 'Cabo Verde'],
    ['en', 'CZ', 'Czech Republic'],
    ['en', 'FK', 'Falkland Islands (Islas Malvinas)'],
    ['en', 'NZ', 'Aotearoa New Zealand'],
    ['en', 'SZ', 'Swaziland'],
    ['en', 'TL', 'East Timor'],
    ['en', 'TR', 'Turkey'],
  ];

  const bothOptionsCases: [string, string, string][] = [
    // When both preferShort and preferVariant are true, preferShort should take precedence
    ['en', 'HK', 'Hong Kong'], // preferShort over standard "Hong Kong SAR China"
    ['en', 'MO', 'Macao'],     // preferShort over standard "Macao SAR China"
    ['en', 'BA', 'Bosnia'],    // preferShort over standard "Bosnia & Herzegovina"
    ['en', 'US', 'US'],        // preferShort over standard "United States"
    ['en', 'GB', 'UK'],        // preferShort over standard "United Kingdom"
  ];

  const noAlternativeCases: [string, string, string][] = [
    // Countries that don't have short or variant alternatives should return standard names
    ['en', 'FR', 'France'],
    ['en', 'DE', 'Germany'],
    ['en', 'JP', 'Japan'],
    ['en', 'CA', 'Canada'],
    ['en', 'AU', 'Australia'],
  ];

  test.each(validCountryCases)('[%s] %s -> %s', (locale, countryCode, expected) => {
    const result = getCldrTerritoryName(countryCode, locale);
    expect(result).toBe(expected);
  });

  test.each(territoryCases)('[%s] Territory %s -> %s', (locale, countryCode, expected) => {
    const result = getCldrTerritoryName(countryCode, locale);
    expect(result).toBe(expected);
  });

  test.each(invalidCountryCases)('[%s] Invalid country code %s -> undefined', (locale, countryCode) => {
    const result = getCldrTerritoryName(countryCode, locale);
    expect(result).toBeUndefined();
  });

  test.each(unsupportedLocaleCases)('[%s] Unsupported locale %s -> undefined', (locale, countryCode) => {
    const result = getCldrTerritoryName(countryCode, locale);
    expect(result).toBeUndefined();
  });

  test.each(defaultLocaleCases)('Default locale %s -> %s', (countryCode, expected) => {
    const result = getCldrTerritoryName(countryCode);
    expect(result).toBe(expected);
  });

  test.each(preferShortCases)('[%s] %s with preferShort -> %s', (locale, countryCode, expected) => {
    const result = getCldrTerritoryName(countryCode, locale, { preferShort: true });
    expect(result).toBe(expected);
  });

  test.each(preferVariantCases)('[%s] %s with preferVariant -> %s', (locale, countryCode, expected) => {
    const result = getCldrTerritoryName(countryCode, locale, { preferVariant: true });
    expect(result).toBe(expected);
  });

  test.each(bothOptionsCases)('[%s] %s with both options (preferShort precedence) -> %s', (locale, countryCode, expected) => {
    const result = getCldrTerritoryName(countryCode, locale, { preferShort: true, preferVariant: true });
    expect(result).toBe(expected);
  });

  test.each(noAlternativeCases)('[%s] %s with preferShort (no alternative) -> %s', (locale, countryCode, expected) => {
    const result = getCldrTerritoryName(countryCode, locale, { preferShort: true });
    expect(result).toBe(expected);
  });

  test.each(noAlternativeCases)('[%s] %s with preferVariant (no alternative) -> %s', (locale, countryCode, expected) => {
    const result = getCldrTerritoryName(countryCode, locale, { preferVariant: true });
    expect(result).toBe(expected);
  });
}); 