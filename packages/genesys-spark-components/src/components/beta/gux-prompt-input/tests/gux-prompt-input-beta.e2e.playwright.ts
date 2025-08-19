import {
  checkRenders,
  test,
  setContent,
  expect
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-prompt-input-beta.e2e.common';

test.describe('gux-prompt-input-beta', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-prompt-input-beta',
    performA11yCheck: false
  });

  test('should trigger onpromptinputgenerate event correctly on generate button click', async ({
    page
  }) => {
    await setContent(
      page,
      `<gux-prompt-input-beta placeholder="Ask Genesys AI"></gux-prompt-input-beta>`
    );

    const component = page.locator('gux-prompt-input-beta');
    const onpromptinputgenerate = await page.spyOnEvent(
      'onpromptinputgenerate'
    );
    const input = component.getByTestId('prompt-input');
    const generateButton = component.getByTestId('generate-button');
    const inputText = 'test-text123';

    await input.click();

    await page.keyboard.type(inputText);

    await page.waitForChanges();

    // eslint-disable-next-line playwright/no-force-option
    await generateButton.click({ force: true });

    await expect(generateButton).toBeHidden();

    expect(onpromptinputgenerate).toHaveReceivedEventDetail({
      inputText: inputText,
      isGenerating: true
    });
  });

  test('should trigger onpromptinputgenerate event correctly on stop generation button click', async ({
    page
  }) => {
    await setContent(
      page,
      `<gux-prompt-input-beta placeholder="Ask Genesys AI"></gux-prompt-input-beta>`
    );

    const component = page.locator('gux-prompt-input-beta');
    const onpromptinputgenerate = await page.spyOnEvent(
      'onpromptinputgenerate'
    );
    const generateButton = component.getByTestId('generate-button');
    const input = component.getByTestId('prompt-input');
    const inputText = 'test-text123';

    await input.click();

    await page.keyboard.type(inputText);

    await page.waitForChanges();

    // eslint-disable-next-line playwright/no-force-option
    await generateButton.click({ force: true });

    await expect(generateButton).toBeHidden();

    const stopButton = component.getByTestId('stop-generation');

    await expect(stopButton).toBeVisible();

    // eslint-disable-next-line playwright/no-force-option
    await stopButton.click({ force: true });

    await page.waitForChanges();

    await expect(stopButton).toBeHidden();
    await expect(generateButton).toBeVisible();

    expect(onpromptinputgenerate).toHaveReceivedEventDetail({
      inputText: inputText,
      isGenerating: false
    });
  });
});
