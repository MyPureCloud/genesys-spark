import { readRegionalDatesCookie } from './read-regional-dates-cookie';
import { readRegionalDatesVar } from './read-regional-dates-var';

// Remove with this ticket https://inindca.atlassian.net/browse/COMUI-2598
export function useRegionalDates() {
  return !!readRegionalDatesCookie() || !!readRegionalDatesVar();
  // return true
};
