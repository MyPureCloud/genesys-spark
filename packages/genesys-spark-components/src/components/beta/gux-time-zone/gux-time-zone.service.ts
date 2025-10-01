import { getTimeZoneList, formatOffset } from '../../../utils/date/time-zone';
import { GuxTimeZoneListing } from '../gux-time-zone-picker/gux-time-zone-picker.types';

export function shortenZone(zone: string): string {
  const sections = zone.split('/');
  return sections?.pop() || zone;
}

export function getLocalizedOffset(
  localizedUTC: string,
  timeZoneId: string
): string {
  const zoneList: GuxTimeZoneListing[] = getTimeZoneList();
  const timeZone = zoneList.find(zone => zone.name === timeZoneId);

  const formattedOffset = formatOffset(timeZone?.currentTimeOffsetInMinutes);
  return `${localizedUTC}${formattedOffset}`;
}
