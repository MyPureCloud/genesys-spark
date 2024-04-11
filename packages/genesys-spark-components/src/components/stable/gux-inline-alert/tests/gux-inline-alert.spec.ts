import { newSpecPage } from '@test/specTestUtils';
import { GuxAlert } from '../gux-inline-alert';

const components = [GuxAlert];
const language = 'en';

describe('gux-inline-alert', () => {
  describe('#render', () => {
    [
      `<gux-inline-alert accent="info"><div slot="message">Note: This is an information alert.</div></gux-inline-alert>`,
      `<gux-inline-alert accent="success"><div slot="message">Note: This is a success alert.</div></gux-inline-alert>`,
      `<gux-inline-alert accent="warning"><div slot="message">Note: This is a warning alert.</div></gux-inline-alert>`,
      `<gux-inline-alert accent="error"><div slot="message">Note: This is a warning alert.</div></gux-inline-alert>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
