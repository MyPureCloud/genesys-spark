import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [];

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
    await a11yCheck(page, axeExclusions);
    expect(element).toHaveAttribute('hydrated');
  });

  it('Should fire actionClick event if not disabled', async () => {
    const page = await newSparkE2EPage({ html });

    const element = await page.find('gux-action-button');
    const onActionClick = await element.spyOnEvent('actionClick');
    const button = await page.find('.gux-action-button');
    await button.click();
    expect(onActionClick).toHaveReceivedEventTimes(1);
  });

  it('Should not fire actionClick event if disabled', async () => {
    const page = await newSparkE2EPage({ html });

    const element = await page.find('gux-action-button');
    const onActionClick = await element.spyOnEvent('actionClick');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();
    expect(element).toHaveAttribute('disabled');
    expect(element).toEqualAttribute('disabled', 'disabled');
    const button = await page.find('.gux-action-button');
    await button.click();
    expect(onActionClick).toHaveReceivedEventTimes(0);
  });

  it('Should fire open event if not disabled', async () => {
    const page = await newSparkE2EPage({ html });

    const element = await page.find('gux-action-button');
    const onOpen = await element.spyOnEvent('open');
    const dropdownElm = await element.find('.gux-dropdown-button');
    await dropdownElm.click();
    await a11yCheck(page, axeExclusions);
    expect(onOpen).toHaveReceivedEventTimes(1);
  });

  it('Should not fire open event if disabled', async () => {
    const page = await newSparkE2EPage({ html });

    const element = await page.find('gux-action-button');
    const onOpen = await element.spyOnEvent('open');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();
    expect(element).toHaveAttribute('disabled');
    expect(element).toEqualAttribute('disabled', 'disabled');
    const dropdownElm = await element.find('.gux-dropdown-button');
    await dropdownElm.click();
    expect(onOpen).toHaveReceivedEventTimes(0);
  });
});
