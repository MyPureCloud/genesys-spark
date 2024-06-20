import { newSpecPage } from '@test/specTestUtils';

import { GuxFormDescription } from '../gux-form-description';

const components = [GuxFormDescription];
const language = 'en';

describe('gux-form-description', () => {
  it('should build', async () => {
    const html = `
    <gux-form-description><p slot="description">This is a simple paragraph to accompany the form header.</p></gux-form-description>`;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormDescription);
  });
});
