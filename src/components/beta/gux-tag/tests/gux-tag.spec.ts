import { newSpecPage } from '@stencil/core/testing';
import { GuxTag } from '../gux-tag';

const components = [GuxTag];
const language = 'en';

describe('gux-tag-beta', () => {
  describe('#render', () => {
    [
      '<gux-tag-beta>default</gux-tag-beta>',
      '<gux-tag-beta color="default">default (explicit)</gux-tag-beta>',
      '<gux-tag-beta color="navy">navy</gux-tag-beta>',
      '<gux-tag-beta icon="bolt" color="navy">navy</gux-tag-beta>',
      '<gux-tag-beta icon="bolt" color="navy" value="3" removable>navy</gux-tag-beta>',
      '<gux-tag-beta icon="bolt" color="navy" value="3" removable disabled>navy</gux-tag-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
