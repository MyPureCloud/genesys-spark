// Import CLDR data for supported locales at build time
import enTerritories from 'cldr-localenames-full/main/en/territories.json' with { type: 'json' };
import frTerritories from 'cldr-localenames-full/main/fr/territories.json' with { type: 'json' };
import esTerritories from 'cldr-localenames-full/main/es/territories.json' with { type: 'json' };
import arTerritories from 'cldr-localenames-full/main/ar/territories.json' with { type: 'json' };
import csTerritories from 'cldr-localenames-full/main/cs/territories.json' with { type: 'json' };
import daTerritories from 'cldr-localenames-full/main/da/territories.json' with { type: 'json' };
import deTerritories from 'cldr-localenames-full/main/de/territories.json' with { type: 'json' };
import fiTerritories from 'cldr-localenames-full/main/fi/territories.json' with { type: 'json' };
import heTerritories from 'cldr-localenames-full/main/he/territories.json' with { type: 'json' };
import hiTerritories from 'cldr-localenames-full/main/hi/territories.json' with { type: 'json' };
import itTerritories from 'cldr-localenames-full/main/it/territories.json' with { type: 'json' };
import jaTerritories from 'cldr-localenames-full/main/ja/territories.json' with { type: 'json' };
import koTerritories from 'cldr-localenames-full/main/ko/territories.json' with { type: 'json' };
import nlTerritories from 'cldr-localenames-full/main/nl/territories.json' with { type: 'json' };
import noTerritories from 'cldr-localenames-full/main/no/territories.json' with { type: 'json' };
import plTerritories from 'cldr-localenames-full/main/pl/territories.json' with { type: 'json' };
import ptTerritories from 'cldr-localenames-full/main/pt/territories.json' with { type: 'json' };
import ruTerritories from 'cldr-localenames-full/main/ru/territories.json' with { type: 'json' };
import svTerritories from 'cldr-localenames-full/main/sv/territories.json' with { type: 'json' };
import thTerritories from 'cldr-localenames-full/main/th/territories.json' with { type: 'json' };
import trTerritories from 'cldr-localenames-full/main/tr/territories.json' with { type: 'json' };
import ukTerritories from 'cldr-localenames-full/main/uk/territories.json' with { type: 'json' };
import zhTerritories from 'cldr-localenames-full/main/zh/territories.json' with { type: 'json' };

// TypeScript interface for CLDR territory data
interface CldrTerritoryData {
  [territoryCode: string]: string;
}

const CLDR_DATA: { [locale: string]: CldrTerritoryData } = {
  en: enTerritories.main.en.localeDisplayNames.territories,
  fr: frTerritories.main.fr.localeDisplayNames.territories,
  es: esTerritories.main.es.localeDisplayNames.territories,
  ar: arTerritories.main.ar.localeDisplayNames.territories,
  cs: csTerritories.main.cs.localeDisplayNames.territories,
  da: daTerritories.main.da.localeDisplayNames.territories,
  de: deTerritories.main.de.localeDisplayNames.territories,
  fi: fiTerritories.main.fi.localeDisplayNames.territories,
  he: heTerritories.main.he.localeDisplayNames.territories,
  hi: hiTerritories.main.hi.localeDisplayNames.territories,
  it: itTerritories.main.it.localeDisplayNames.territories,
  ja: jaTerritories.main.ja.localeDisplayNames.territories,
  ko: koTerritories.main.ko.localeDisplayNames.territories,
  nl: nlTerritories.main.nl.localeDisplayNames.territories,
  no: noTerritories.main.no.localeDisplayNames.territories,
  pl: plTerritories.main.pl.localeDisplayNames.territories,
  pt: ptTerritories.main.pt.localeDisplayNames.territories,
  ru: ruTerritories.main.ru.localeDisplayNames.territories,
  sv: svTerritories.main.sv.localeDisplayNames.territories,
  th: thTerritories.main.th.localeDisplayNames.territories,
  tr: trTerritories.main.tr.localeDisplayNames.territories,
  uk: ukTerritories.main.uk.localeDisplayNames.territories,
  zh: zhTerritories.main.zh.localeDisplayNames.territories,
};

function getCldrTerritoryData(locale: string): CldrTerritoryData | undefined {
  // TODO: deal with regional mapping or Genesys-specific locale mappings... this requires exact
  if (CLDR_DATA[locale]) {
    return CLDR_DATA[locale];
  }
  return undefined;
}

/**
 * Options for territory name retrieval
 */
export interface TerritoryNameOptions {
  preferShort?: boolean;
  preferVariant?: boolean;
}

/**
 * Returns the localized region or country name for a given territory code and locale.
 * Territory codes are defined in BCP47, and are typically either ISO3166 country codes
 * (e.g. "US" or "FR" for "United States" or "France") or UN M49 supranational region codes
 * (e.g. "003" for "North America", "150" for "Europe", etc.).
 * @param territoryCode - An ISO3166 country code (e.g., 'US', 'GB', 'FR') or UN M49 code (e.g., '840', '826', '250')
 * @param locale - The IETF language tag locale identifier (e.g., 'en', 'fr', 'es')
 * @param options - Optional object with preferShort and preferVariant boolean flags
 * @returns The localized country name or undefined if not found
 */
export function getCldrTerritoryName(
  territoryCode: string, 
  locale: string = 'en', 
  options: TerritoryNameOptions = {}
): string | undefined {
  const { preferShort = false, preferVariant = false } = options;
      const shortKey = `${territoryCode}-alt-short`;
      const variantKey = `${territoryCode}-alt-variant`;
  const territoryData = getCldrTerritoryData(locale);
  
  if (territoryData) {
    // If preferShort is true, look for the short alternative first
    if (preferShort && territoryData[shortKey]) {
        return territoryData[shortKey];
    }
    
    // If preferVariant is true, look for the variant alternative
    if (preferVariant && territoryData[variantKey]) {
        return territoryData[variantKey];
    }
    
    // Return the standard name
    const territoryName = territoryData[territoryCode];
    if (territoryName) {
      return territoryName;
    } else {
      console.warn(`No CLDR territory data for country code ${territoryCode} in locale ${locale}`);
    }
  } else {
    console.warn(`No CLDR territory data for locale: ${locale}`);
  }
  return undefined;
}
