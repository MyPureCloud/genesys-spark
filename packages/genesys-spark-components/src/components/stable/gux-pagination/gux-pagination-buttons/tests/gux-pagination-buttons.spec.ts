import { newSpecPage } from '@test/specTestUtils';

import { GuxPaginationButtons } from '../gux-pagination-buttons';
import { GuxButton } from '../../../gux-button/gux-button';
import { GuxFormFieldTextLike } from '../../../gux-form-field/components/gux-form-field-text-like/gux-form-field-text-like';

const components = [GuxPaginationButtons, GuxButton, GuxFormFieldTextLike];
const language = 'en';

describe('gux-pagination-item-counts', () => {
  describe('#render', () => {
    [
      { totalPages: 0, currentPage: 0, layout: 'advanced' },
      { totalPages: 10, currentPage: 1, layout: 'advanced' },
      { totalPages: 10, currentPage: 5, layout: 'advanced' },
      { totalPages: 10, currentPage: 5, layout: 'advanced', disabled: true },
      { totalPages: 0, currentPage: 0, layout: 'simple' },
      { totalPages: 10, currentPage: 1, layout: 'simple' },
      { totalPages: 10, currentPage: 5, layout: 'simple' },
      { totalPages: 10, currentPage: 5, layout: 'simple', disabled: true }
    ].forEach(
      ({ totalPages, currentPage, layout, disabled = false }, index) => {
        it(`should render as expected (${index + 1})`, async () => {
          const html = `
          <gux-pagination-buttons
            total-pages="${totalPages}"
            current-page="${currentPage}"
            layout="${layout}"
            disabled="${disabled}"
          >
          </gux-pagination-buttons>
        `;
          const page = await newSpecPage({ components, html, language });

          expect(page.rootInstance).toBeInstanceOf(GuxPaginationButtons);

          expect(page.root).toMatchSnapshot();
        });
      }
    );
  });
});
