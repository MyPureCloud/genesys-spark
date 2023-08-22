import { GuxTimeZoneIdentifier } from '../../i18n/time-zone/types';
import { timeZoneIdentifiers } from '../../i18n/time-zone/identifiers';

export function getValidTimezone(
  input: GuxTimeZoneIdentifier,
  fallback?: GuxTimeZoneIdentifier
): GuxTimeZoneIdentifier {
  if (timeZoneIdentifiers.includes(input)) {
    return input;
  }

  return fallback;
}
