import { newSpecPage } from '@test/specTestUtils';

import { GuxFormHeading } from '../gux-form-heading';

const components = [GuxFormHeading];
const language = 'en';

describe('gux-form-heading', () => {
  it('should build', async () => {
    const html = `<gux-form-heading><h1>Form Heading</h1></gux-form-heading>`;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormHeading);
  });
});
