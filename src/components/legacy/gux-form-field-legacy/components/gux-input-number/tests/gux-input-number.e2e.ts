import { newSparkE2EPage, a11yCheck } from 'test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'label',
    target: 'input',
    exclusionReason:
      'gux-input-number is used within the gux-form-field component which provides a label'
  }
];

describe('gux-input-number', () => {
  it('renders', async () => {
    const html = `
      <gux-input-number lang="en">
        <input slot="input" type="number">
      </gux-input-number>
    `;
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-input-number');
    await a11yCheck(page, axeExclusions);

    expect(element).toHaveAttribute('hydrated');
  });
});
