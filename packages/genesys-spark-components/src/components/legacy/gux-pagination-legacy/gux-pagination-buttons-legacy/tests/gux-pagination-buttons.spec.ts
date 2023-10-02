import { newSpecPage } from '@test/specTestUtils';

import { GuxPaginationButtonsLegacy } from '../gux-pagination-buttons';
import { GuxButton } from '../../../../stable/gux-button/gux-button';
import { GuxFormFieldTextLike } from '../../../../stable/gux-form-field/components/gux-form-field-text-like/gux-form-field-text-like';

const components = [
  GuxPaginationButtonsLegacy,
  GuxButton,
  GuxFormFieldTextLike
];
const language = 'en';

describe('gux-pagination-item-counts-legacy', () => {
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
          <gux-pagination-buttons-legacy
            total-pages="${totalPages}"
            current-page="${currentPage}"
            layout="${layout}"
          >
          </gux-pagination-buttons-legacy>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationButtonsLegacy);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
