import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'label',
    target: 'input',
    exclusionReason:
      'gux-input-text-like is used within the gux-form-field component which provides a label'
  }
];

describe('gux-input-text-like', () => {
  it('renders', async () => {
    const html = `
      <gux-input-text-like lang="en">
        <input slot="input" type="test">
      </gux-input-text-like>
    `;
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-input-text-like');
    await a11yCheck(page, axeExclusions);

    expect(element).toHaveAttribute('hydrated');
  });
});
