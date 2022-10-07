import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxPaginationButtons } from '../gux-pagination-buttons';
import { GuxButton } from 'components/stable/gux-button/gux-button';
import { GuxInputTextLike } from 'components/legacy/gux-form-field-legacy/components/gux-input-text-like/gux-input-text-like';

const components = [GuxPaginationButtons, GuxButton, GuxInputTextLike];
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
      { totalPages: 0, currentPage: 0, layout: 'full' },
      { totalPages: 10, currentPage: 1, layout: 'full' },
      { totalPages: 10, currentPage: 5, layout: 'full' },
      { totalPages: 0, currentPage: 0, layout: 'small' },
      { totalPages: 10, currentPage: 1, layout: 'small' },
      { totalPages: 10, currentPage: 5, layout: 'small' },
      { totalPages: 0, currentPage: 0, layout: 'expanded' },
      { totalPages: 10, currentPage: 1, layout: 'expanded' },
      { totalPages: 10, currentPage: 5, layout: 'expanded' }
    ].forEach(({ totalPages, currentPage, layout }, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination-buttons
            total-pages="${totalPages}"
            current-page="${currentPage}"
            layout="${layout}"
          >
          </gux-pagination-buttons>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationButtons);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
