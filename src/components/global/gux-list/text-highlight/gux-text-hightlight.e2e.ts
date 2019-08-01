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
    await page.setContent(
      '<gux-text-highlight text="testing" highlight="te"/>'
    );
    await page.waitForChanges();

    const highlight = await page.find('strong');
    expect(highlight.innerText).toBe('te');
  });

  it('should not provide a highlight if non matching highlight is provided.', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="testing" highlight="foo"/>'
    );
    await page.waitForChanges();

    const highlight = await page.find('strong');
    expect(highlight).toBe(null);
  });

  it('should handle contains highlight with single segment', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="testing" highlight="est" strategy="1"/>'
    );
    await page.waitForChanges();

    const highlight = await page.find('strong');
    expect(highlight.innerText).toBe('est');
  });

  it('should handle contains highlight with multiple segments', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="testing" highlight="t" strategy="1"/>'
    );
    await page.waitForChanges();

    const highlight = await page.findAll('strong');
    expect(highlight.length).toBe(2);
  });
});
