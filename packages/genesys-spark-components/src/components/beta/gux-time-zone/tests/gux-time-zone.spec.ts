import { newSpecPage } from '@stencil/core/testing';
import { GuxTimeZoneBeta } from '../gux-time-zone';

const components = [GuxTimeZoneBeta];

describe('#render ', () => {
  [
    `<gux-time-zone-beta value="Etc/GMT+1"><gux-time-zone-beta>`,
    `<gux-time-zone-beta value="Etc/GMT+1" show-offset="true"><gux-time-zone-beta>`,
    `<gux-time-zone-beta time-zone-id="Antarctica/Vostok" show-offset="true" parentheses-location="offset"></gux-time-zone-beta>`,
    `<gux-time-zone-beta time-zone-id="Antarctica/Vostok" show-offset="true" parentheses-location="all"></gux-time-zone-beta>`,
    `<gux-time-zone-beta time-zone-id="Antarctica/Vostok" shorten="true"></gux-time-zone-beta>`
  ].forEach((html, index) => {
    it(`should render component as expected (${index + 1})`, async () => {
      const page = await newSpecPage({ components, html });

      expect(page.root).toMatchSnapshot();
    });
  });
});
