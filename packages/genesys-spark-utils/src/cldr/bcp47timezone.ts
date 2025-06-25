// Import CLDR BCP47 time zone data which maps a CLDR identifier to IANA identifiers
import cldrBcp47Timezones from 'cldr-bcp47/bcp47/timezone.json' with { type: 'json' };

/**
 * Interface for CLDR BCP47 timezone data entry
 */
interface CldrBcp47TimezoneEntry {
  _description?: string;
  _alias?: string;
  _deprecated?: true;
  _preferred?: string;
}

/**
 * Interface for CLDR BCP47 timezone data structure
 */
interface CldrBcp47TimezoneData {
  version?: { _number: string };
  keyword: {
    u: {
      tz: Record<string, CldrBcp47TimezoneEntry>;
    };
  };
}

interface Bcp47Timezone {
  bcp47TzId: string;
  description: string;
}

interface Bcp47TimezoneActive extends Bcp47Timezone {
  cldrCanonicalIanaId: string | undefined;
  ianaAliases: string[];
}

interface Bcp47TimezoneDeprecated extends Bcp47Timezone {
  deprecated: true;
  preferredBcp47TzId: string | undefined;
}

type Bcp47TimezoneEntry = Bcp47TimezoneActive | Bcp47TimezoneDeprecated;

// Cache of BCP47 timezone data
let bcp47TimezoneMap: Map<string, Bcp47TimezoneEntry> | null = null;
let ianaToBcp47IdMap: Map<string, string> | null = null;
let cldrCanonicalIanaIdMap: Map<string, string> | null = null;
let cldrDataPopulated = false;

// Build timezone aliases mapping IANA variants to CLDR BCP47 canonical ID
function populateBcp47TimezoneData(bcp47Timezones: CldrBcp47TimezoneData): void {
  bcp47TimezoneMap = new Map();
  ianaToBcp47IdMap = new Map();
  cldrCanonicalIanaIdMap = new Map();

  const tzData = bcp47Timezones.keyword.u.tz;
  
  for (const [bcp47TzId, bcp47TzEntry] of Object.entries(tzData)) {
    if (bcp47TzEntry && typeof bcp47TzEntry === 'object') {
        const description = bcp47TzEntry._description ?? '';
        if (bcp47TzEntry._deprecated) {
            const deprecatedEntry: Bcp47TimezoneDeprecated = {
                bcp47TzId,
                description,
                deprecated: true,
                preferredBcp47TzId: bcp47TzEntry._preferred ?? ''
            };
            bcp47TimezoneMap.set(bcp47TzId, deprecatedEntry);
        } else if (bcp47TzEntry._alias) {
            const ianaAliases: string[] = bcp47TzEntry._alias?.split(' ') ?? [];
            const cldrCanonicalIanaId = ianaAliases.length > 0 ? ianaAliases.shift() : undefined;
            const activeEntry: Bcp47TimezoneActive = {
                bcp47TzId,
                description,
                cldrCanonicalIanaId,
                ianaAliases,
            };
            bcp47TimezoneMap.set(bcp47TzId, activeEntry);
            if (cldrCanonicalIanaId) {
                ianaToBcp47IdMap.set(cldrCanonicalIanaId, bcp47TzId);
            }
            for (const alias of ianaAliases) {
                ianaToBcp47IdMap.set(alias, bcp47TzId);
                if (cldrCanonicalIanaId) {
                    cldrCanonicalIanaIdMap.set(alias, cldrCanonicalIanaId);
                }
            }
        }
    }
  }
  cldrDataPopulated = true;
}

export function getCldrCanonicalIanaId(ianaTzId: string): string {
  if (!cldrDataPopulated) {
    populateBcp47TimezoneData(cldrBcp47Timezones as CldrBcp47TimezoneData);
  }
  return cldrCanonicalIanaIdMap?.get(ianaTzId) ?? ianaTzId;
}

export function getCldrTimezoneId(ianaTzId: string): string | undefined {
    if (!cldrDataPopulated) {
        populateBcp47TimezoneData(cldrBcp47Timezones as CldrBcp47TimezoneData);
    }
    return ianaToBcp47IdMap?.get(ianaTzId) ?? undefined;
}