import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [];

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
    expect(element).toHaveAttribute('hydrated');
  });

  it('Should fire open event if not disabled', async () => {
    const page = await newSparkE2EPage({ html });

    const element = await page.find('gux-button-multi');
    const onOpen = await element.spyOnEvent('open');
    const dropdownElm = await element.find('.gux-dropdown-button');
    await dropdownElm.click();
    await a11yCheck(page, axeExclusions);
    expect(onOpen).toHaveReceivedEventTimes(1);
  });

  it('Should not fire open event if disabled', async () => {
    const page = await newSparkE2EPage({ html });

    const element = await page.find('gux-button-multi');
    const onOpen = await element.spyOnEvent('open');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();
    expect(element).toHaveAttribute('disabled');
    expect(element).toEqualAttribute('disabled', 'disabled');
    const dropdownElm = await element.find('.gux-dropdown-button');
    await dropdownElm.click();
    await a11yCheck(page, axeExclusions);
    expect(onOpen).toHaveReceivedEventTimes(0);
  });
});
