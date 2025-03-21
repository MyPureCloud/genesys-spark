import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'button-name',
    target: 'gux-copy-to-clipboard,button',
    exclusionReason:
      'Description is provided by tooltip which is not detected by Axe as it has display: none set. Manually confirmed to work on VoiceOver & NVDA.'
  }
];

const html = `
  <gux-copy-to-clipboard lang="en">
    <div slot="content>Test</div>
  </gux-copy-to-clipboard>
`;

describe('gux-copy-to-clipboard', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-copy-to-clipboard');
    await a11yCheck(page, axeExclusions);
    expect(element).toHaveAttribute('hydrated');
  });

  it('renders tooltip on hover', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-copy-to-clipboard');

    await element.hover();
    await page.waitForTimeout(2000);

    const tooltip = await element.find('pierce/gux-tooltip');
    await a11yCheck(page, axeExclusions);
    expect(tooltip.textContent).toEqual('Click to Copy');
  });
});
