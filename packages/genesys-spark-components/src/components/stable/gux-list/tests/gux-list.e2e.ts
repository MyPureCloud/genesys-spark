import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfig } from './gux-list.common';

describe('gux-list', () => {
  it(renderConfig.description, async () => {
    const page = await newSparkE2EPage({ html: renderConfig.html });
    const element = await page.find('gux-list');
    await a11yCheck(page);

    expect(element.outerHTML).toMatchSnapshot();
  });
});
