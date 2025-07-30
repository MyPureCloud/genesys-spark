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
    const onpromptinputgenerate = await page.spyOnEvent(
      'onpromptinputgenerate'
    );
    const generateButton = component.getByTestId('generate-button');

    await expect(generateButton).toBeVisible();
    // expect(stopButton).not.toBeVisible();

    // eslint-disable-next-line playwright/no-force-option
    await generateButton.click({ force: true });

    await page.waitForChanges();

    // const stopButton = component.getByTestId('stop-generation');

    // expect(generateButton).not.toBeVisible();
    // expect(stopButton).toBeVisible();

    expect(onpromptinputgenerate).toHaveReceivedEvent();
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

    await expect(generateButton).toBeVisible();
    // expect(stopButton).not.toBeVisible();

    // eslint-disable-next-line playwright/no-force-option
    await generateButton.click({ force: true });

    await page.waitForChanges();

    const stopButton = component.getByTestId('stop-generation');

    // eslint-disable-next-line playwright/no-force-option
    await stopButton.click({ force: true });

    // expect(generateButton).not.toBeVisible();
    // expect(stopButton).toBeVisible();

    await expect(generateButton).toBeVisible();
    await expect(stopButton).toBeHidden();

    expect(onpromptinputstopgeneration).toHaveReceivedEvent();
  });
});
