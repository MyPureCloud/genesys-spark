import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-copy-to-clipboard-beta', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-copy-to-clipboard-beta>
        <span>Test</span>
      </gux-copy-to-clipboard-beta>
      `
    });

    const element = await page.find('gux-copy-to-clipboard-beta');
    await a11yCheck(page);
    expect(element).toHaveAttribute('hydrated');
  });
});
