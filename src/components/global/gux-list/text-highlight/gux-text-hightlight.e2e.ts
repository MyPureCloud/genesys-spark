import { newE2EPage } from '@stencil/core/testing';

describe('gux-text-highlight', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-text-highlight text="testing"/>');
    const element = await page.find('gux-text-highlight');
    expect(element).toHaveClass('hydrated');
  });

  it('should update the highlighted text when a matching highlight is provided.', async () => {
    const page = await newE2EPage();
    await page.setContent('<gux-text-highlight text="testing"/>');

    const component = await page.find('gux-text-highlight');
    await component.callMethod('setHighlight', 'te');
    await page.waitForChanges();

    const highlight = await page.find('strong');
    expect(highlight.innerText).toBe('te');
  });

  it('should not provide a highlight if non matching highlight is provided.', async () => {
    const page = await newE2EPage();
    await page.setContent('<gux-text-highlight text="testing"/>');

    const component = await page.find('gux-text-highlight');
    await component.callMethod('setHighlight', 'foo');
    await page.waitForChanges();

    const highlight = await page.find('strong');
    expect(highlight).toBe(null);
  });
});
