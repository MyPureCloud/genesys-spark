import { newSpecPage } from '@test/specTestUtils';
import { GuxAlert } from '../gux-inline-alert';

const components = [GuxAlert];
const language = 'en';

describe('gux-alert-beta', () => {
  describe('#render', () => {
    [
      `<gux-alert-beta accent="info">Note: This is an information alert.</gux-alert-beta>`,
      ` <gux-alert-beta accent="success">Note: This is a success alert.</gux-alert-beta>`,
      `<gux-alert-beta accent="warning-octogon"
      >Note: This is a warning alert.</gux-alert-beta
    >`,
      `<gux-alert-beta accent="warning-triangle"
    >Note: This is a warning alert.</gux-alert-beta
  >`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
