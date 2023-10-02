import { E2EPage } from '@stencil/core/testing';

import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

async function clickActionButton(page: E2EPage): Promise<void> {
  return await page.click('pierce/.gux-action-button > button');
}

async function clickDropdownButton(page: E2EPage): Promise<void> {
  return await page.click('pierce/.gux-dropdown-button > button');
}

async function keypressOnDropdownButton(
  page: E2EPage,
  keypress: string
): Promise<void> {
  const element = await page.find('gux-action-button');
  const dropdownButton = await element.find(
    'pierce/.gux-dropdown-button button'
  );

  await dropdownButton.press(keypress);
}

async function keypressOnListItemButton(
  page: E2EPage,
  keypress: string
): Promise<void> {
  const element = await page.find('gux-list-item');
  const actionItemButton = await element.find('pierce/button');
  await actionItemButton.press(keypress);
}

describe('gux-action-button', () => {
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
  it('renders', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-action-button');

    await a11yCheck(page, [], 'closed');
    await clickDropdownButton(page);
    await a11yCheck(page, [], 'open');

    expect(element).toHaveAttribute('hydrated');
  });

  it('should fire actionClick event if not disabled', async () => {
    const page = await newSparkE2EPage({ html });
    const onActionClick = await page.spyOnEvent('actionClick');

    await clickActionButton(page);

    expect(onActionClick).toHaveReceivedEventTimes(1);
  });

  it('should not fire actionClick event if disabled', async () => {
    const page = await newSparkE2EPage({ html });
    const onActionClick = await page.spyOnEvent('actionClick');
    const element = await page.find('gux-action-button');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();

    await clickActionButton(page);

    expect(onActionClick).toHaveReceivedEventTimes(0);
  });

  it.skip('should fire open and close events if not disabled on click', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');
    const onClick = await page.spyOnEvent('click');

    await clickDropdownButton(page);
    await clickDropdownButton(page);
    await keypressOnDropdownButton(page, 'ArrowDown');
    await keypressOnListItemButton(page, 'Enter');
    await keypressOnListItemButton(page, 'Escape');

    expect(onOpen).toHaveReceivedEventTimes(2);
    expect(onClose).toHaveReceivedEventTimes(2);
    expect(onClick).toHaveReceivedEventTimes(3);
  });

  it('should fire open and close events if not disabled using the keyboard', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');

    await keypressOnDropdownButton(page, 'ArrowDown');
    await keypressOnListItemButton(page, 'Escape');

    expect(onOpen).toHaveReceivedEventTimes(1);
    expect(onClose).toHaveReceivedEventTimes(1);
  });

  it('should not fire open event if disabled on click', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const element = await page.find('gux-action-button');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();

    await clickDropdownButton(page);

    expect(onOpen).toHaveReceivedEventTimes(0);
  });

  it('should not fire open event if disabled using the keyboard', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const element = await page.find('gux-action-button');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();

    await keypressOnDropdownButton(page, 'ArrowDown');

    expect(onOpen).toHaveReceivedEventTimes(0);
  });
});
