import {
  a11yCheck,
  newSparkE2EPage,
  waitForTimeout
} from '../../../../test/e2eTestUtils';
import { renderConfig } from './gux-copy-to-clipboard.common';

describe('gux-copy-to-clipboard', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({ html: renderConfig.html });
    const element = await page.find('gux-copy-to-clipboard');
    await a11yCheck(page);
    expect(element).toHaveAttribute('hydrated');
  });

  it('renders tooltip on hover', async () => {
    const page = await newSparkE2EPage({ html: renderConfig.html });
    const element = await page.find('gux-copy-to-clipboard');

    await element.hover();
    await waitForTimeout(2000);

    const tooltip = await element.find('pierce/gux-tooltip');
    await a11yCheck(page);
    expect(tooltip.textContent).toEqual('Click to Copy');
  });
});
