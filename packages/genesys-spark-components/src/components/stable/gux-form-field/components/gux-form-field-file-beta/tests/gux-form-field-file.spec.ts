import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldFileBeta } from '../gux-form-field-file';
import { renderConfigs } from './gux-form-field-file.common';

const components = [GuxFormFieldFileBeta];
const language = 'en';

describe('gux-form-field-file-beta', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }, index) => {
      it(`${description} (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
