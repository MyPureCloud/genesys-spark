import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const html = `
  <gux-copy-to-clipboard-beta lang="en">
    <div slot="content>Test</div>
  </gux-copy-to-clipboard-beta>
`;

describe('gux-copy-to-clipboard-beta', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-copy-to-clipboard-beta');
    await a11yCheck(page);
    expect(element).toHaveAttribute('hydrated');
  });

  it('renders tooltip on hover', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-copy-to-clipboard-beta');

    await element.hover();
    await page.waitForChanges();

    const tooltip = await element.find('pierce/gux-tooltip');
    await a11yCheck(page);
    expect(tooltip.textContent).toEqual('Click to Copy');
  });
});
