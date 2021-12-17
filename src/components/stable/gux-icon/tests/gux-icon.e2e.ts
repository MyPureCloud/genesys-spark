import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-icon', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-icon decorative="true"></gux-icon>`
    });

    const element = await page.find('gux-icon');
    await a11yCheck(page);

    expect(element).toHaveClass('hydrated');
  });
});
