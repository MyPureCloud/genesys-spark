import { E2EPage } from '@stencil/core/testing';

import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const axeExclusions = [];

async function clickDropdownButton(page: E2EPage): Promise<void> {
  return await page.click('pierce/.gux-dropdown-button > button');
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
  const element = await page.find('gux-list-item');
  const actionItemButton = await element.find('pierce/button');
  await actionItemButton.press(keypress);
}

describe('gux-button-multi', () => {
  const html = `
  <gux-button-multi lang="en" accent="primary">
    <span slot="title">Primary</span>
    <gux-list-item>Test 1</gux-list-item>
    <gux-list-item>Test 2</gux-list-item>
    <gux-list-item>Test 3</gux-list-item>
    <gux-list-divider></gux-list-divider>
    <gux-list-item>Test 4</gux-list-item>
  </gux-button-multi>
  `;
  it('renders', async () => {
    const page = await newSparkE2EPage({ html });

    const element = await page.find('gux-button-multi');
    await a11yCheck(page, axeExclusions);
    expect(element).toHaveAttribute('hydrated');
  });

  it('should fire open and close events if not disabled on click', async () => {
    const page = await newSparkE2EPage({ html });
    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');

    await clickDropdownButton(page);

    await a11yCheck(page, axeExclusions);

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

    await a11yCheck(page, axeExclusions);

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
