import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [];

describe('gux-icon', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-icon decorative="true"></gux-icon>`
    });

    const element = await page.find('gux-icon');
    await a11yCheck(page, axeExclusions);

    expect(element).toHaveClass('hydrated');
  });
});
