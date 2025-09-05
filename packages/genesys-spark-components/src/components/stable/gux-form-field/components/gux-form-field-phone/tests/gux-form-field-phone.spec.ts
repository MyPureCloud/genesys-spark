import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldPhone } from '../gux-form-field-phone';
import { renderConfigs } from './gux-form-field-phone.common';

const components = [GuxFormFieldPhone];
const language = 'en';

describe('gux-form-field-phone', () => {
  it('should build', async () => {
    const html = `
      <gux-form-field-phone>
        <gux-phone-input-beta></gux-phone-input-beta>
        <label slot="label">Label</label>
      </gux-form-field-phone>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldPhone);
  });

  describe('#render', () => {
    renderConfigs.forEach(({ description, html }, index) => {
      it(`${description} (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
