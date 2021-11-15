import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../../tests/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'select-name',
    target: 'select',
    exclusionReason:
      'gux-input-select is used within the gux-form-field component which provides a label'
  }
];

describe('gux-input-select', () => {
  it('renders', async () => {
    const html = `
      <gux-input-select>
        <select slot="input">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </<gux-input-select>
    `;
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-input-select');
    await a11yCheck(page, axeExclusions);

    expect(element).toHaveClass('hydrated');
  });
});
