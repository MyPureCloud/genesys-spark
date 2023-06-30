import { newSpecPage } from '@stencil/core/testing';
import { GuxTimeZonePickerBeta } from '../gux-time-zone-picker';

const components = [GuxTimeZonePickerBeta];

describe('#render ', () => {
  [
    `<gux-time-zone-picker-beta><gux-time-zone-picker-beta>`,
    `<gux-time-zone-picker-beta value="Etc/GMT+1"><gux-time-zone-picker-beta>`
  ].forEach((html, index) => {
    it(`should render component as expected (${index + 1})`, async () => {
      const page = await newSpecPage({ components, html });

      expect(page.root).toMatchSnapshot();
    });
  });
});
