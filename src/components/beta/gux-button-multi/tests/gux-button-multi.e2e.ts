import { E2EPage } from '@stencil/core/testing';

import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

async function clickDropdownButton(page: E2EPage): Promise<void> {
  return await page.evaluate(() => {
    const element = document.querySelector('gux-button-multi');
    const dropdownButton: HTMLButtonElement = element.shadowRoot.querySelector(
      '.gux-dropdown-button > button'
    );

    dropdownButton.click();
  });
}

async function pressDropdownButton(
  page: E2EPage,
  keypress: string
): Promise<void> {
  const element = await page.find('pierce/.gux-dropdown-button button');
  await element.press(keypress);
}

async function pressActionItemButton(
  page: E2EPage,
  keypress: string
): Promise<void> {
  const element = await page.find('gux-action-item');
  const actionItemButton = await element.find('pierce/button');
  await actionItemButton.press(keypress);
}

describe('gux-button-multi', () => {
  const html = `
  <gux-button-multi lang="en" text="Primary" accent="primary">
    <gux-action-item text="test"></gux-action-item>
    <gux-action-item text="test2"></gux-action-item>
    <gux-action-item text="test3"></gux-action-item>
    <gux-list-divider></gux-list-divider>
    <gux-action-item><span>I am a span</span></gux-action-item>
  </gux-button-multi>
  `;
  it('renders', async () => {
    const page = await newSparkE2EPage({ html });

    const element = await page.find('gux-button-multi');
    await a11yCheck(page);
    expect(element).toHaveClass('hydrated');
  });

  it('should fire open and close events if not disabled on click', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');

    await clickDropdownButton(page);

    await a11yCheck(page);

    await clickDropdownButton(page);

    expect(onOpen).toHaveReceivedEventTimes(1);
    expect(onClose).toHaveReceivedEventTimes(1);
  });

  it('should fire open and close events if not disabled using the keyboard', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');

    await pressDropdownButton(page, 'ArrowDown');
    await pressActionItemButton(page, 'Escape');

    expect(onOpen).toHaveReceivedEventTimes(1);
    expect(onClose).toHaveReceivedEventTimes(1);
  });

  it('should not fire open event if disabled on click', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const element = await page.find('gux-button-multi');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();

    await clickDropdownButton(page);

    await a11yCheck(page);

    expect(onOpen).toHaveReceivedEventTimes(0);
  });

  it('should not fire open event if disabled using the keyboard', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const element = await page.find('gux-button-multi');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();

    await pressDropdownButton(page, 'ArrowDown');

    expect(onOpen).toHaveReceivedEventTimes(0);
  });
});
