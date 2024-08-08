import { newSpecPage } from '@test/specTestUtils';
import { GuxTimeZonePickerBeta } from '../gux-time-zone-picker';

const components = [GuxTimeZonePickerBeta];

describe('#render ', () => {
  [
    `<gux-time-zone-picker-beta><gux-time-zone-picker-beta>`,
    `<gux-time-zone-picker-beta value="Etc/GMT+1"><gux-time-zone-picker-beta>`,
    `<gux-time-zone-picker-beta value="Etc/GMT+1" custom-default="America/Detroit" custom-default-label="Business Timezone"><gux-time-zone-picker-beta>`
  ].forEach((html, index) => {
    // COMUI-2173update node version for latest time zones
    it.skip(`should render component as expected (${index + 1})`, async () => {
      const page = await newSpecPage({ components, html });

      expect(page.root).toMatchSnapshot();
    });
  });
});
