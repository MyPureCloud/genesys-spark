import { newSpecPage } from '@stencil/core/testing';
import { GuxDateTime } from '../gux-date-time';

const components = [GuxDateTime];
const language = 'en';
const date = '2022-07-07T13:35:30.100Z';

describe('#render different datetime formats eg(short,medium,full,long)', () => {
  [
    `<gux-date-time-beta datetime=${date} format="short"></gux-date-time-beta>`,
    `<gux-date-time-beta datetime=${date} format="medium"></gux-date-time-beta>`,
    `<gux-date-time-beta datetime=${date} format="full"></gux-date-time-beta>`,
    `<gux-date-time-beta datetime=${date} format="long"></gux-date-time-beta>`
  ].forEach((html, index) => {
    it(`should render component as expected (${index + 1})`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });
  });
});
