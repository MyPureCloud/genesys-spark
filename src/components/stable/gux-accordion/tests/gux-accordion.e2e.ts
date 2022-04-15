import { E2EPage } from '@stencil/core/testing';

import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-accordion', () => {
  const html = `
  <gux-accordion lang="en" text="Primary" accent="primary">
    <gux-accordion>
    <gux-accordion-section>
      <h2 slot="header">First Section</h2>
      <div slot="content">Sample Content</div>
    </gux-accordion-section>
    <gux-accordion-section>
      <h2 slot="header">Second Section</h2>
      <div slot="content">Sample Content</div>
    </gux-accordion-section>
    <gux-accordion-section>
      <h2 slot="header">Third Section</h2>
      <div slot="content">Sample Content</div>
    </gux-accordion-section>
  </gux-accordion>
  `;

  it('renders', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-accordion');

    await a11yCheck(page);

    expect(element.outerHTML).toMatchSnapshot();
  });
});
