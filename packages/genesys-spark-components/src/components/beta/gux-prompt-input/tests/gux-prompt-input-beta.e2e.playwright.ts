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

  test('should trigger onpromptinputgenerate event on generate button click', async ({
    page
  }) => {
    await setContent(
      page,
      `<gux-prompt-input-beta placeholder="Ask Genesys AI"></gux-prompt-input-beta>`
    );

    const component = page.locator('gux-prompt-input-beta');
    const onpromptinputstopgeneration = await page.spyOnEvent(
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

    expect(onpromptinputstopgeneration).toHaveReceivedEventDetail({
      inputText
    });
  });

  test('should trigger onpromptinputstopgeneration event on stop generation button click', async ({
    page
  }) => {
    await setContent(
      page,
      `<gux-prompt-input-beta placeholder="Ask Genesys AI"></gux-prompt-input-beta>`
    );

    const component = page.locator('gux-prompt-input-beta');
    const onpromptinputstopgeneration = await page.spyOnEvent(
      'onpromptinputstopgeneration'
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

    expect(onpromptinputstopgeneration).toHaveReceivedEvent();
  });
});
