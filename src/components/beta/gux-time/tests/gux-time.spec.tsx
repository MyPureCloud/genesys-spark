import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { GuxTime } from '../gux-time';

const components = [GuxTime];
const language = 'en';
const date = new Date(2022, 6, 7, 9, 35, 30, 100);

describe('#render different time formats eg(short,medium,full,long)', () => {
  [
    () => (<gux-time-beta date={date} format="short"></gux-time-beta>),
    () => (<gux-time-beta date={date} format="medium"></gux-time-beta>),
    () => (<gux-time-beta date={date} format="full"></gux-time-beta>),
    () => (<gux-time-beta date={date} format="long"></gux-time-beta>)
  ].forEach((template, index) => {
    it(`should render component as expected (${index + 1})`, async () => {
      const page = await newSpecPage({ components, template, language });

      expect(page.root).toMatchSnapshot();
    });
  });
});
