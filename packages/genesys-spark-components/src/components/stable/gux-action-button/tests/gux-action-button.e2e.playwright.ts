import {
  checkRenders,
  expect,
  E2EPage,
  setContent,
  test
} from '@test/playwrightTestUtils';

test.describe('gux-action-button', () => {
  const html = `
  <gux-action-button lang="en" accent="primary">
    <div slot="title">Primary</div>
    <gux-list-item onclick="notify(event)">Test 1</gux-list-item>
    <gux-list-item onclick="notify(event)">Test 2</gux-list-item>
    <gux-list-item onclick="notify(event)">Test 3</gux-list-item>
    <gux-list-divider></gux-list-divider>
    <gux-list-item onclick="notify(event)">Test 4</gux-list-item>
  </gux-action-button>
  `;

  const disabledHtml = `
  <gux-action-button lang="en" accent="primary" disabled>
    <div slot="title">Primary</div>
    <gux-list-item onclick="notify(event)">Test 1</gux-list-item>
    <gux-list-item onclick="notify(event)">Test 2</gux-list-item>
    <gux-list-item onclick="notify(event)">Test 3</gux-list-item>
    <gux-list-divider></gux-list-divider>
    <gux-list-item onclick="notify(event)">Test 4</gux-list-item>
  </gux-action-button>
  `;

  async function clickActionButton(page: E2EPage): Promise<void> {
    // eslint-disable-next-line playwright/no-force-option
    await page.getByTestId('action-button').click({ force: true }); // https://github.com/microsoft/playwright/issues/13576
  }

  async function clickDropdownButton(page: E2EPage): Promise<void> {
    // eslint-disable-next-line playwright/no-force-option
    await page.getByTestId('dropdown-button').click({ force: true }); // https://github.com/microsoft/playwright/issues/13576
  }

  async function keypressOnDropdownButton(
    page: E2EPage,
    keypress: string
  ): Promise<void> {
    await page.getByTestId('dropdown-button').press(keypress);
  }

  async function keypressOnListItemButton(
    page: E2EPage,
    keypress: string
  ): Promise<void> {
    await page
      .locator('gux-list-item')
      .first()
      .getByTestId('list-item-button')
      .press(keypress);
  }

  checkRenders({
    renderConfigs: [{ html: html }, { html: disabledHtml }],
    element: 'gux-action-button'
  });

  test('should fire actionClick event if not disabled', async ({ page }) => {
    await setContent(page, html);

    const onActionClick = await page.spyOnEvent('actionClick');

    await clickActionButton(page);

    expect(onActionClick).toHaveReceivedEventTimes(1);
  });

  test('should not fire actionClick event if disabled', async ({ page }) => {
    await setContent(page, disabledHtml);

    const onActionClick = await page.spyOnEvent('actionClick');

    await clickActionButton(page);

    expect(onActionClick).toHaveReceivedEventTimes(0);
  });

  test('should fire open and close events if not disabled on click', async ({
    page
  }) => {
    await setContent(page, html);

    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');

    await clickDropdownButton(page);
    await clickDropdownButton(page);

    expect(onOpen).toHaveReceivedEventTimes(1);
    expect(onClose).toHaveReceivedEventTimes(1);
  });

  test('should fire open and close events if not disabled using the keyboard', async ({
    page
  }) => {
    await setContent(page, html);

    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');

    await keypressOnDropdownButton(page, 'ArrowDown');
    await keypressOnListItemButton(page, 'Escape');

    expect(onOpen).toHaveReceivedEventTimes(1);
    expect(onClose).toHaveReceivedEventTimes(1);
  });

  test('should not fire open event if disabled on click', async ({ page }) => {
    await setContent(page, disabledHtml);

    const onOpen = await page.spyOnEvent('open');

    await clickDropdownButton(page);

    expect(onOpen).toHaveReceivedEventTimes(0);
  });

  test('should not fire open event if disabled using the keyboard', async ({
    page
  }) => {
    await setContent(page, disabledHtml);

    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');

    await clickActionButton(page);

    await keypressOnDropdownButton(page, 'ArrowDown');

    expect(onOpen).toHaveReceivedEventTimes(0);
    expect(onClose).toHaveReceivedEventTimes(0);
  });
});
