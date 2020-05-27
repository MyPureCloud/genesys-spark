import { newE2EPage } from '@stencil/core/testing';

describe('gux-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gux-button></gux-button>');
    const element = await page.find('gux-button');
    expect(element).toHaveClass('hydrated');
  });

  it('Should fire click event if not disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<gux-button></gux-button>');
    const element = await page.find('gux-button');
    const onclick = await element.spyOnEvent('click');
    await element.click();
    expect(onclick).toHaveReceivedEventTimes(1);
  });

  it('Should not fire click event if disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<gux-button></gux-button>');
    const element = await page.find('gux-button');
    const onclick = await element.spyOnEvent('click');
    element.setAttribute('disabled', 'disabled');
    await page.waitForChanges();
    expect(element).toHaveAttribute('disabled');
    expect(element).toEqualAttribute('disabled', 'disabled');
    await element.click();
    expect(onclick).toHaveReceivedEventTimes(0);
  });
});
