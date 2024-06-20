import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldsetHeading } from '../gux-form-fieldset-heading';

const components = [GuxFormFieldsetHeading];
const language = 'en';

describe('gux-form-fieldset-heading', () => {
  it('should build', async () => {
    const html = `<gux-form-fieldset-heading><h2 slot="heading">Form Fieldset Header</h2></gux-form-fieldset-heading>`;

    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldsetHeading);
  });
});
