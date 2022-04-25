import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../../tests/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'label',
    target: 'input',
    exclusionReason:
      'gux-input-range is used within the gux-form-field component which provides a label'
  }
];

describe('gux-input-radio', () => {
  it('renders', async () => {
    const html = `
      <gux-input-radio>
        <input type="range" slot="input"/>
      </gux-input-radio>
    `;
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-input-radio');
    await a11yCheck(page, axeExclusions);

    expect(element).toHaveAttribute('hydrated');
  });
});
