import { newSpecPage } from '@stencil/core/testing';
import { GuxTime } from '../gux-time';

const components = [GuxTime];
const language = 'en';
const date = new Date(2022, 6, 7, 9, 35, 30, 100).toISOString();

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
