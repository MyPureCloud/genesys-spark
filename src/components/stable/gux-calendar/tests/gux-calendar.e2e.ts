import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'color-contrast',
    exclusionReason:
      'Will consult UX for guidance regarding the color contrast violations in the calendar element'
  }
];

describe('gux-calendar', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: '<gux-calendar lang="en"></gux-calendar>'
    });
    const element = await page.find('gux-calendar');
    await a11yCheck(page, axeExclusions);

    expect(element).toHaveClass('hydrated');
  });
});
