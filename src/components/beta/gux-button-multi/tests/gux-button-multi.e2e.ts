import { E2EPage } from '@stencil/core/testing';

import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [];

async function clickDropdownButton(page: E2EPage): Promise<void> {
  return await page.evaluate(() => {
    const element = document.querySelector('gux-button-multi');
    const dropdownButton = element.shadowRoot.querySelector(
      '.gux-dropdown-button > button'
    ) as HTMLButtonElement;

    dropdownButton.click();
  });
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
    await a11yCheck(page, axeExclusions);
    expect(element).toHaveClass('hydrated');
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
    const element = await page.find('gux-button-multi');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();

    await clickDropdownButton(page);

    expect(onOpen).toHaveReceivedEventTimes(0);
  });
});
