import { timeZoneIdentifiers } from '../../../../i18n/time-zone/identifiers';

export const renderConfigs = ['short', 'medium', 'full', 'long'].map(
  (format: string) => ({
    description: `should render as expected for "${format}" format`,
    html: `<gux-date-beta datetime="2022-07-07T12:00:00.000Z" format="${format}"></gux-date-beta>`
  })
);

export const timezoneRenderConfigs = timeZoneIdentifiers.map(
  (timeZone: string) => ({
    description: `should render as expected for "${timeZone}" timezone`,
    html: `<gux-date-beta time-zone=${timeZone} datetime="2022-07-07T12:00:00.000Z" format="full"></gux-date-beta>`
  })
);
