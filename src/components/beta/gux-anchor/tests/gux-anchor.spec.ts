import { newSpecPage } from '@stencil/core/testing';
import { GuxAnchor } from '../gux-anchor';

const components = [GuxAnchor];
const language = 'en';

describe('gux-anchor-beta', () => {
  describe('#render', () => {
    [
      '<gux-anchor-beta><a href="#">Default Link</a></gux-anchor-beta>',
      '<gux-anchor-beta><a href="#" target="_blank">Open in new tab</a></gux-anchor-beta>',
      '<gux-anchor-beta><a href="https://spark.genesys.com/" target="_blank">External Link</a></gux-anchor-beta>',
      '<gux-anchor-beta table="true"><a href="#">Tabel Cell Link</a></gux-anchor-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
