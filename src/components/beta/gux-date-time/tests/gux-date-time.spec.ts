import { newSpecPage } from '@stencil/core/testing';
import { GuxDateTime } from '../gux-date-time';

const components = [GuxDateTime];
const language = 'en';
const date = new Date(2022, 6, 7, 9, 35, 30, 100).valueOf();

describe('#render different datetime formats eg(short,medium,full,long)', () => {
    [
      `<gux-date-time-beta locale="en" date=${date} format="short"></gux-date-time-beta>`,
      `<gux-date-time-beta locale="en" date=${date} format="medium"></gux-date-time-beta>`,
      `<gux-date-time-beta locale="en" date=${date} format="long"></gux-date-time-beta>`,
      `<gux-date-time-beta locale="en" date=${date} format="full"></gux-date-time-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {

        const page = await newSpecPage({ components, html, language });
  
        expect(page.root).toMatchSnapshot();
      });
    });
  });
