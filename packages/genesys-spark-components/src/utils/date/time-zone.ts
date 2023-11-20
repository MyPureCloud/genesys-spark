import { getTimeZones } from '@vvo/tzdb';
import { GuxTimeZoneListing } from '../../components/beta/gux-time-zone-picker/gux-time-zone-picker.types';

/**
 * @desc create a formatted offset string
 * @param {number} offset timezone offset in minutes
 * @returns {string} formatted offset string
 * @example '+HH:mm' or '-HH:mm'
 */
export function formatOffset(offset?: number) {
  const isValidOffset = typeof offset === 'number';

  if (!isValidOffset) {
    return '';
  }

  const mins = Math.abs(offset) % 60;
  const stringMins = mins.toString().padStart(2, '0');

  const hrs = Math.floor(Math.abs(offset) / 60);
  const stringHrs = hrs.toString().padStart(2, '0');

  if (offset >= 0) {
    return `+${stringHrs}:${stringMins}`;
  }

  return `-${stringHrs}:${stringMins}`;
}

export function getTimeZoneList() {
  const moduleTimeZones = getTimeZones();
  const additionalGroupZones = getGroupZones(moduleTimeZones);

  // Generic time zones not included in @vvo/tzdb that we want to support
  const genericTimeZones: GuxTimeZoneListing[] = [
    { name: 'Etc/GMT', offset: 0 },
    { name: 'Etc/GMT+0', offset: 0 },
    { name: 'Etc/GMT+1', offset: -60 },
    { name: 'Etc/GMT+2', offset: -120 },
    { name: 'Etc/GMT+3', offset: -180 },
    { name: 'Etc/GMT+4', offset: -240 },
    { name: 'Etc/GMT+5', offset: -300 },
    { name: 'Etc/GMT+6', offset: -360 },
    { name: 'Etc/GMT+7', offset: -420 },
    { name: 'Etc/GMT+8', offset: -480 },
    { name: 'Etc/GMT+9', offset: -540 },
    { name: 'Etc/GMT+10', offset: -600 },
    { name: 'Etc/GMT+11', offset: -660 },
    { name: 'Etc/GMT+12', offset: -720 },
    { name: 'Etc/GMT-0', offset: +0 },
    { name: 'Etc/GMT-1', offset: +60 },
    { name: 'Etc/GMT-2', offset: +120 },
    { name: 'Etc/GMT-3', offset: +180 },
    { name: 'Etc/GMT-4', offset: +240 },
    { name: 'Etc/GMT-5', offset: +300 },
    { name: 'Etc/GMT-6', offset: +360 },
    { name: 'Etc/GMT-7', offset: +420 },
    { name: 'Etc/GMT-8', offset: +480 },
    { name: 'Etc/GMT-9', offset: +540 },
    { name: 'Etc/GMT-10', offset: +600 },
    { name: 'Etc/GMT-11', offset: +660 },
    { name: 'Etc/GMT-12', offset: +720 },
    { name: 'Etc/GMT-13', offset: +780 },
    { name: 'Etc/GMT-14', offset: +840 }
  ].map(x => {
    const listing: GuxTimeZoneListing = {
      name: x.name,
      alternativeName: '',
      group: [],
      continentCode: '',
      continentName: '',
      countryName: '',
      countryCode: '',
      rawOffsetInMinutes: x.offset,
      abbreviation: x.name,
      rawFormat: '',
      currentTimeOffsetInMinutes: x.offset,
      currentTimeFormat: '',
      mainCities: []
    };
    return listing;
  });

  const allTimeZones = [
    ...genericTimeZones,
    ...moduleTimeZones,
    ...additionalGroupZones
  ];

  return allTimeZones;
}
/**
 * @desc Returns 'group' zones that are the same as other zones to the top-level list.
 * @param GuxTimeZoneListing[] timeZoneList base list of timezones. Group zones found in this list will be returned
 */
function getGroupZones(timeZoneList: GuxTimeZoneListing[]) {
  const groupZones: GuxTimeZoneListing[] = [];
  timeZoneList.forEach(zone => {
    zone.group.forEach(groupZone => {
      const existing = timeZoneList.find(zone => zone.name === groupZone);
      if (!existing && groupZone !== zone.name) {
        const groupZoneItem = Object.assign({}, zone);
        groupZoneItem.name = groupZone;
        groupZones.push(groupZoneItem);
      }
    });
  });
  return groupZones;
}
