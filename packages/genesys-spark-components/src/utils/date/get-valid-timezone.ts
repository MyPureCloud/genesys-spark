// import { timeZoneIdentifiers } from '../../i18n/time-zone/identifiers';

// function normalizeTimezone(timezone) {
//   try {
//     const normalizedTimezone = Intl.DateTimeFormat('en-US', { timeZone: timezone }).resolvedOptions().timeZone;
//     return normalizedTimezone
//    } catch(err) {
//       console.error(err);
//     }
// }

export function getValidTimezone(input: string, fallback?: string): string {
  try {
    const normalizedTimezone = Intl.DateTimeFormat('en-US', {
      timeZone: input
    }).resolvedOptions().timeZone;
    return normalizedTimezone;
  } catch (err) {
    console.error(err);
    return fallback;
  }
  // if (timeZoneIdentifiers.includes(input)) {
  //   return input;
  // }
  // else if (Intl.DateTimeFormat('en-US', { timeZone: input }).resolvedOptions().timeZone) {
  //   return Intl.DateTimeFormat('en-US', { timeZone: input }).resolvedOptions().timeZone as GuxTimeZoneIdentifier
  // }

  // return fallback;
}
