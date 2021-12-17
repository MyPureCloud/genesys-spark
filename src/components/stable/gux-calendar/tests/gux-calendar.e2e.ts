import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-calendar', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: '<gux-calendar lang="en"></gux-calendar>'
    });
    const element = await page.find('gux-calendar');
    await a11yCheck(page);

    expect(element).toHaveClass('hydrated');
  });
});
