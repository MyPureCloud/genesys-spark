import { newSpecPage } from '@test/specTestUtils';
import { GuxAlert } from '../gux-inline-alert';

const components = [GuxAlert];
const language = 'en';

describe('gux-inline-alert', () => {
  describe('#render', () => {
    [
      `<gux-inline-alert accent="info">Note: This is an information alert.</gux-inline-alert>`,
      `<gux-inline-alert accent="success">Note: This is a success alert.</gux-inline-alert>`,
      `<gux-inline-alert accent="warning">Note: This is a warning alert.</gux-inline-alert>`,
      `<gux-inline-alert accent="error">Note: This is a warning alert.</gux-inline-alert>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
