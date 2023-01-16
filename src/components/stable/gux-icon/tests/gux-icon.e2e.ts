import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-icon', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-icon decorative="true"></gux-icon>`
    });

    const element = await page.find('gux-icon');
    await a11yCheck(page);

    expect(element).toHaveAttribute('hydrated');
  });
});
