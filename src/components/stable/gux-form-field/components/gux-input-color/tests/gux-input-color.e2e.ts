import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../../tests/e2eTestUtils';

const axeExclusions = [];

describe('gux-input-color', () => {
  it('renders', async () => {
    const html =
      '<gux-input-color lang="en"><input slot="input" type="color" value="#75A8FF"></gux-input-color>';
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-input-color');

    expect(element).toHaveClass('hydrated');
  });

  it('Opens and closes the color picker popup on click', async () => {
    const html =
      '<gux-input-color lang="en"><input slot="input" type="color" value="#75A8FF"></gux-input-color>';
    const page = await newSparkE2EPage({ html });

    const inputColorPopup = await page.find('gux-color-select');
    const inputColorButton = await page.find('.gux-input-color-main-element');

    await inputColorButton.click();
    await page.waitForChanges();
    await a11yCheck(page, axeExclusions, 'When input color popup is expanded');

    expect(inputColorPopup).toHaveClass('gux-opened');

    await inputColorButton.click();
    await page.waitForChanges();
    await a11yCheck(page, axeExclusions, 'When input color popup is collapsed');

    expect(inputColorPopup).not.toHaveClass('gux-opened');
  });
});
