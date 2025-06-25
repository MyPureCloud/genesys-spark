import { getCldrCanonicalIanaId } from './bcp47timezone';

// Import CLDR data for supported locales at build time
import enTimeZoneNames from 'cldr-dates-full/main/en/timeZoneNames.json' with { type: 'json' };
import frTimeZoneNames from 'cldr-dates-full/main/fr/timeZoneNames.json' with { type: 'json' };
import esTimeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json' with { type: 'json' };
import arTimeZoneNames from 'cldr-dates-full/main/ar/timeZoneNames.json' with { type: 'json' };
import csTimeZoneNames from 'cldr-dates-full/main/cs/timeZoneNames.json' with { type: 'json' };
import daTimeZoneNames from 'cldr-dates-full/main/da/timeZoneNames.json' with { type: 'json' };
import deTimeZoneNames from 'cldr-dates-full/main/de/timeZoneNames.json' with { type: 'json' };
import fiTimeZoneNames from 'cldr-dates-full/main/fi/timeZoneNames.json' with { type: 'json' };
import heTimeZoneNames from 'cldr-dates-full/main/he/timeZoneNames.json' with { type: 'json' };
import hiTimeZoneNames from 'cldr-dates-full/main/hi/timeZoneNames.json' with { type: 'json' };
import itTimeZoneNames from 'cldr-dates-full/main/it/timeZoneNames.json' with { type: 'json' };
import jaTimeZoneNames from 'cldr-dates-full/main/ja/timeZoneNames.json' with { type: 'json' };
import koTimeZoneNames from 'cldr-dates-full/main/ko/timeZoneNames.json' with { type: 'json' };
import nlTimeZoneNames from 'cldr-dates-full/main/nl/timeZoneNames.json' with { type: 'json' };
import noTimeZoneNames from 'cldr-dates-full/main/no/timeZoneNames.json' with { type: 'json' };
import plTimeZoneNames from 'cldr-dates-full/main/pl/timeZoneNames.json' with { type: 'json' };
import ptTimeZoneNames from 'cldr-dates-full/main/pt/timeZoneNames.json' with { type: 'json' };
import ruTimeZoneNames from 'cldr-dates-full/main/ru/timeZoneNames.json' with { type: 'json' };
import svTimeZoneNames from 'cldr-dates-full/main/sv/timeZoneNames.json' with { type: 'json' };
import thTimeZoneNames from 'cldr-dates-full/main/th/timeZoneNames.json' with { type: 'json' };
import trTimeZoneNames from 'cldr-dates-full/main/tr/timeZoneNames.json' with { type: 'json' };
import ukTimeZoneNames from 'cldr-dates-full/main/uk/timeZoneNames.json' with { type: 'json' };
import zhTimeZoneNames from 'cldr-dates-full/main/zh/timeZoneNames.json' with { type: 'json' };

// TypeScript interfaces for CLDR data structures

/**
 * Interface for CLDR timezone name format variants
 */
interface CldrTimezoneFormat {
  generic: string | undefined;
  standard: string | undefined;
  daylight: string | undefined;
}

/**
 * Interface for CLDR timezone zone data
 */
interface CldrTimezoneLocalNames {
  _type: string;
  exemplarCity: string | undefined;
  long: CldrTimezoneFormat | undefined;
  short: CldrTimezoneFormat | undefined;
}

function normalizeCldrTimezoneZones(cldrZoneInfo: unknown): Map<string, CldrTimezoneLocalNames> {
  const normalizedZones = new Map<string, CldrTimezoneLocalNames>();

  function addNormalizedZones(map: Map<string, CldrTimezoneLocalNames>, prefix: string, zoneInfo: unknown) {
    if (!zoneInfo || typeof zoneInfo !== 'object') {
      return;
    }
    const entries = Object.entries(zoneInfo);
    for (const [key, data] of entries) {
      if (!data || typeof data !== 'object') {
        continue;
      }
      const id = prefix ? `${prefix}/${key}` : key;
      if ('_type' in data && data._type === 'zone') {
        map.set(id, data as CldrTimezoneLocalNames);
      } else {
        addNormalizedZones(map, id, data);
      }
    }
  }
  addNormalizedZones(normalizedZones, '', cldrZoneInfo);
  return normalizedZones;
}

const CLDR_DATA: { [locale: string]: Map<string, CldrTimezoneLocalNames> } = {
  en: normalizeCldrTimezoneZones(enTimeZoneNames.main.en.dates.timeZoneNames.zone),
  fr: normalizeCldrTimezoneZones(frTimeZoneNames.main.fr.dates.timeZoneNames.zone),
  es: normalizeCldrTimezoneZones(esTimeZoneNames.main.es.dates.timeZoneNames.zone),
  ar: normalizeCldrTimezoneZones(arTimeZoneNames.main.ar.dates.timeZoneNames.zone),
  cs: normalizeCldrTimezoneZones(csTimeZoneNames.main.cs.dates.timeZoneNames.zone),
  da: normalizeCldrTimezoneZones(daTimeZoneNames.main.da.dates.timeZoneNames.zone),
  de: normalizeCldrTimezoneZones(deTimeZoneNames.main.de.dates.timeZoneNames.zone),
  fi: normalizeCldrTimezoneZones(fiTimeZoneNames.main.fi.dates.timeZoneNames.zone),
  he: normalizeCldrTimezoneZones(heTimeZoneNames.main.he.dates.timeZoneNames.zone),
  hi: normalizeCldrTimezoneZones(hiTimeZoneNames.main.hi.dates.timeZoneNames.zone),
  it: normalizeCldrTimezoneZones(itTimeZoneNames.main.it.dates.timeZoneNames.zone),
  ja: normalizeCldrTimezoneZones(jaTimeZoneNames.main.ja.dates.timeZoneNames.zone),
  ko: normalizeCldrTimezoneZones(koTimeZoneNames.main.ko.dates.timeZoneNames.zone),
  nl: normalizeCldrTimezoneZones(nlTimeZoneNames.main.nl.dates.timeZoneNames.zone),
  no: normalizeCldrTimezoneZones(noTimeZoneNames.main.no.dates.timeZoneNames.zone),
  pl: normalizeCldrTimezoneZones(plTimeZoneNames.main.pl.dates.timeZoneNames.zone),
  pt: normalizeCldrTimezoneZones(ptTimeZoneNames.main.pt.dates.timeZoneNames.zone),
  ru: normalizeCldrTimezoneZones(ruTimeZoneNames.main.ru.dates.timeZoneNames.zone),
  sv: normalizeCldrTimezoneZones(svTimeZoneNames.main.sv.dates.timeZoneNames.zone),
  th: normalizeCldrTimezoneZones(thTimeZoneNames.main.th.dates.timeZoneNames.zone),
  tr: normalizeCldrTimezoneZones(trTimeZoneNames.main.tr.dates.timeZoneNames.zone),
  uk: normalizeCldrTimezoneZones(ukTimeZoneNames.main.uk.dates.timeZoneNames.zone),
  zh: normalizeCldrTimezoneZones(zhTimeZoneNames.main.zh.dates.timeZoneNames.zone),
};

function getCldrTimezoneLocalNames(locale: string): Map<string, CldrTimezoneLocalNames> | undefined {
  // TODO: deal with regional mapping or Genesys-specific locale mappings... this requires exact
  if (CLDR_DATA[locale]) {
    return CLDR_DATA[locale];
  }
  return undefined;
}

export function getCldrTimezoneExemplarCity(ianaTzId: string, locale: string = 'en'): string | undefined {
  const timezoneData = getCldrTimezoneLocalNames(locale);
  const cldrCanonicalIanaId = getCldrCanonicalIanaId(ianaTzId);
  if (ianaTzId !== cldrCanonicalIanaId) {
    console.warn(`${ianaTzId} is not a canonical CLDR IANA timezone ID, using ${cldrCanonicalIanaId} instead`);
  }
  if (timezoneData) {
    const zoneNames = timezoneData.get(cldrCanonicalIanaId);
    if (zoneNames) {
      if (zoneNames.exemplarCity) {
        return zoneNames.exemplarCity;
      } else {
        console.warn(`No exemplar city name for ${cldrCanonicalIanaId} in locale: ${locale}`);
      }
    } else {
      console.warn(`No CLDR timezone data for ${cldrCanonicalIanaId} in locale: ${locale}`);
    }
  } else {
    console.warn(`No CLDR timezone data for locale: ${locale}`);
  }
  // Fallback to last segment of original timezone ID with underscores replaced by spaces
  return cldrCanonicalIanaId.split('/').pop()?.replace(/_/g, ' ');
}