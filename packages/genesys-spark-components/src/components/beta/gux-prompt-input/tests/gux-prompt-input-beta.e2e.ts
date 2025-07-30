import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-prompt-input-beta.e2e.common';

describe('gux-prompt-input-beta', () => {
  const axeExclusions = [
    {
      issueId: 'color-contrast',
      exclusionReason:
        'COMUI-4091: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds for the CTA button (probably just the disabled button state colors need to be changed)'
    }
  ];

  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-prompt-input-beta');

        await a11yCheck(page, axeExclusions);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
