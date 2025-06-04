import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfig } from './gux-popover-list.common';

describe('gux-popover-list', () => {
  it(renderConfig.description, async () => {
    const page = await newSparkE2EPage({
      html: renderConfig.html
    });
    const element = await page.find('gux-popover-list');
    await a11yCheck(page);
    expect(element).toHaveAttribute('hydrated');
  });
});
