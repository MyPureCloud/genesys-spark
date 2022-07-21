import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { GuxDate } from '../gux-date';

const components = [GuxDate];
const language = 'en';
const date = new Date(2022, 6, 7, 9, 35, 30, 100);

describe('#render different datetime formats eg(short,medium,full,long)', () => {
  [
    () => (<gux-date-beta date={date} format="short"></gux-date-beta>),
    () => (<gux-date-beta date={date} format="medium"></gux-date-beta>),
    () => (<gux-date-beta date={date} format="full"></gux-date-beta>),
    () => (<gux-date-beta date={date} format="long"></gux-date-beta>)
  ].forEach((template, index) => {
    it(`should render component as expected (${index + 1})`, async () => {
      const page = await newSpecPage({ components, template, language });

      expect(page.root).toMatchSnapshot();
    });
  });
});
