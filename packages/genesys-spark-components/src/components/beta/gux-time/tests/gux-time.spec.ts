import { newSpecPage } from '@stencil/core/testing';
import { GuxTime } from '../gux-time';
import { timeZoneIdentifiers } from '../../../../i18n/time-zone/identifiers';

const components = [GuxTime];
const language = 'en';
const date = '2022-07-07T13:35:30.100Z';

describe('gux-time', () => {
  describe('#render different time formats eg(short,medium,full,long)', () => {
    [
      `<gux-time-beta datetime=${date} format="short"></gux-time-beta>`,
      `<gux-time-beta datetime=${date} format="medium"></gux-time-beta>`,
      `<gux-time-beta datetime=${date} format="full"></gux-time-beta>`,
      `<gux-time-beta datetime=${date} format="long"></gux-time-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#render different time zones', () => {
    timeZoneIdentifiers.forEach((timeZone: string) => {
      it(`should work as expected for "${timeZone}"`, async () => {
        const html = `<gux-time-beta time-zone=${timeZone} datetime="2022-07-07T12:00:00.000Z" format="full"></gux-time-beta>`;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
