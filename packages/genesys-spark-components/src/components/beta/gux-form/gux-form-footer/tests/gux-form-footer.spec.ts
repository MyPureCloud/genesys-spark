import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFooter } from '../gux-form-footer';

const components = [GuxFormFooter];
const language = 'en';

describe('gux-form-footer', () => {
  it('should build', async () => {
    const html = `
    <gux-form-footer placement="page-desktop">
    <footer>
      <gux-button accent="primary">Primary</gux-button>
      <gux-button accent="secondary">Secondary</gux-button>
    </footer>
    </gux-form-footer>`;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFooter);
  });
});
