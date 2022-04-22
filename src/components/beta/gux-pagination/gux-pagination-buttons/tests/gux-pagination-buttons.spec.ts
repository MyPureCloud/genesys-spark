import { newSpecPage } from './node_modules/@stencil/core/testing';
import MutationObserver from './node_modules/mutation-observer';

import { GuxPaginationButtonsBeta } from '../gux-pagination-buttons';
import { GuxButton } from '../../../../stable/gux-button/gux-button';
import { GuxInputTextLike } from '../../../../stable/gux-form-field/components/gux-input-text-like/gux-input-text-like';

const components = [GuxPaginationButtonsBeta, GuxButton, GuxInputTextLike];
const language = 'en';

describe('gux-pagination-item-counts', () => {
  beforeEach(() => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });

  describe('#render', () => {
    [
      { totalPages: 0, currentPage: 0, layout: 'advanced' },
      { totalPages: 10, currentPage: 1, layout: 'advanced' },
      { totalPages: 10, currentPage: 5, layout: 'advanced' },
      { totalPages: 0, currentPage: 0, layout: 'simple' },
      { totalPages: 10, currentPage: 1, layout: 'simple' },
      { totalPages: 10, currentPage: 5, layout: 'simple' }
    ].forEach(({ totalPages, currentPage, layout }, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination-buttons-beta
            total-pages="${totalPages}"
            current-page="${currentPage}"
            layout="${layout}"
          >
          </gux-pagination-buttons-beta>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationButtonsBeta);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
