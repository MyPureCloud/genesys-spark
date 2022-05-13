import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../../tests/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'label',
    target: 'textarea',
    exclusionReason:
      'gux-input-textarea is used within the gux-form-field component which provides a label'
  }
];

describe('gux-input-textarea', () => {
  it('renders', async () => {
    const html = `
      <gux-input-textarea lang="en">
        <textarea slot="input" type="test"></textarea>
      </gux-input-textarea>
    `;
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-input-textarea');

    expect(element).toHaveAttribute('hydrated');
  });

  describe('#render', () => {
    [
      '<gux-input-textarea><textarea type="text" slot="input"/></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="none"><textarea type="text" slot="input"/></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="manual"><textarea type="text" slot="input"/></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="auto"><textarea type="text" slot="input"/></textarea></gux-input-textarea>',
      '<gux-input-textarea resize="auto"><textarea type="text" slot="input"/>Test</textarea></gux-input-textarea>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-input-textarea');
        await a11yCheck(page, axeExclusions);

        expect(element.innerHTML).toMatchSnapshot();
      });
    });
  });
});
