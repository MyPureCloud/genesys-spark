import { E2EPage } from '@stencil/core/testing';

import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

async function clickActionButton(page: E2EPage): Promise<void> {
  return await page.evaluate(() => {
    const element = document.querySelector('gux-action-button');
    const actionButton = element.shadowRoot.querySelector(
      '.gux-action-button > button'
    );

    actionButton.click();
  });
}

async function clickDropdownButton(page: E2EPage): Promise<void> {
  return await page.evaluate(() => {
    const element = document.querySelector('gux-action-button');
    const dropdownButton = element.shadowRoot.querySelector(
      '.gux-dropdown-button > button'
    );

    dropdownButton.click();
  });
}

async function clickActionItemButton(page: E2EPage): Promise<void> {
  return await page.evaluate(() => {
    const element = document.querySelector('gux-action-item');
    element.click();
  });
}

describe('gux-action-button', () => {
  const html = `
  <gux-action-button lang="en" text="Primary" accent="primary">
    <gux-action-item text="test"></gux-action-item>
    <gux-action-item text="test2"></gux-action-item>
    <gux-action-item text="test3"></gux-action-item>
    <gux-list-divider></gux-list-divider>
    <gux-action-item><span>I am a span</span></gux-action-item>
  </gux-action-button>
  `;
  it('renders', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-action-button');

    await a11yCheck(page, [], 'closed');
    await clickDropdownButton(page);
    await a11yCheck(page, [], 'open');

    expect(element).toHaveClass('hydrated');
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

  it('should fire open and close events if not disabled', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');

    await clickDropdownButton(page);
    await clickDropdownButton(page);

    expect(onOpen).toHaveReceivedEventTimes(1);
    expect(onClose).toHaveReceivedEventTimes(1);
  });

  it('should not fire open event if disabled', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const element = await page.find('gux-action-button');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();

    await clickDropdownButton(page);

    expect(onOpen).toHaveReceivedEventTimes(0);
  });

  it('should fire press event if action-item not disabled', async () => {
    const page = await newSparkE2EPage({ html });
    const onPress = await page.spyOnEvent('press');

    await clickActionItemButton(page);

    expect(onPress).toHaveReceivedEventTimes(1);
  });

  it('should not fire press event if action-item disabled', async () => {
    const page = await newSparkE2EPage({ html });
    const onPress = await page.spyOnEvent('press');

    const element = await page.find('gux-action-item');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();

    await clickActionItemButton(page);

    expect(onPress).toHaveReceivedEventTimes(0);
  });
});
