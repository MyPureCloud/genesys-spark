import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { E2EPage } from '@stencil/core/testing';

const axeExclusions = [
  {
    issueId: 'target-size',
    target: 'gux-time-zone-picker-beta,gux-dropdown,button',
    exclusionReason:
      'COMUI-2944 Fix any of the following: Target has insufficient size (20px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 20px instead of at least 24px.'
  }
];

async function openWithClick(page: E2EPage) {
  const dropdownButtonElement = await page.find('pierce/.gux-field');
  await dropdownButtonElement.click();
  await page.waitForChanges();
}

async function unfilteredOptions(page: E2EPage) {
  const element = await page.find('gux-time-zone-picker-beta');
  return element.shadowRoot.querySelectorAll(
    `gux-dropdown gux-listbox gux-option:not(.gux-filtered)`
  );
}

describe('gux-time-zone-picker-beta', () => {
  describe('#render', () => {
    it('renders', async () => {
      const html = `<gux-time-zone-picker-beta></gux-time-zone-picker-beta>`;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-time-zone-picker-beta');

      expect(element).toHaveAttribute('hydrated');
    });
  });

  it('filters the list', async () => {
    const html = `<gux-time-zone-picker-beta></gux-time-zone-picker-beta>`;
    const page = await newSparkE2EPage({ html });

    await a11yCheck(page, axeExclusions);
    await openWithClick(page);
    await a11yCheck(page, axeExclusions);
    let visibleItems = await unfilteredOptions(page);
    expect(visibleItems.length).toBe(489);

    await page.keyboard.press('a');
    await page.keyboard.press('d');
    await page.keyboard.press('a');
    await page.keyboard.press('k');

    await page.waitForChanges();
    visibleItems = await unfilteredOptions(page);

    expect(visibleItems.length).toBe(1);
  });

  it('includes generic zones', async () => {
    const html = `<gux-time-zone-picker-beta></gux-time-zone-picker-beta>`;
    const page = await newSparkE2EPage({ html });

    await a11yCheck(page, axeExclusions);
    await openWithClick(page);
    await a11yCheck(page, axeExclusions);
    let visibleItems = await unfilteredOptions(page);
    expect(visibleItems.length).toBe(489);

    await page.keyboard.press('e');
    await page.keyboard.press('t');
    await page.keyboard.press('c');
    await page.keyboard.press('/');

    await page.waitForChanges();
    visibleItems = await unfilteredOptions(page);

    expect(visibleItems.length).toBe(27);

    expect(visibleItems[0].textContent).toBe('Etc/GMT (UTC+00:00)');
  });
});
