import { newSpecPage } from '@stencil/core/testing';
import { GuxLink } from '../gux-link';

const components = [GuxLink];
const language = 'en';

describe('gux-link-beta', () => {
  describe('#render', () => {
    [
      '<gux-link-beta href="#" link-text="Enabled Link"></gux-link-beta>',
      '<gux-link-beta href="#" link-text="Open in new tab" target="_blank"></gux-link-beta>',
      '<gux-link-beta href="#" link-text="External Link" is-external-link="true" target="_blank"></gux-link-beta>',
      '<gux-link-beta href="#" link-text="Table Cell Link" table-cell-link="true"></gux-link-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
