import { newSpecPage } from '@stencil/core/testing';
import { GuxDate } from '../gux-date';

const components = [GuxDate];
const language = 'en';
const date = '2022-07-07T13:35:30.100Z';

describe('#render different datetime formats eg(short,medium,full,long)', () => {
  [
    `<gux-date-beta datetime=${date} format="short"></gux-date-beta>`,
    `<gux-date-beta datetime=${date} format="medium"></gux-date-beta>`,
    `<gux-date-beta datetime=${date} format="full"></gux-date-beta>`,
    `<gux-date-beta datetime=${date} format="long"></gux-date-beta>`
  ].forEach((html, index) => {
    it(`should render component as expected (${index + 1})`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });
  });
});
