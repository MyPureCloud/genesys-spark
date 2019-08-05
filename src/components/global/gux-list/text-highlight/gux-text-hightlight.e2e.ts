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
      '<gux-text-highlight text="testing" highlight="est" strategy="contains"/>'
    );
    await page.waitForChanges();

    const highlight = await page.find('strong');
    expect(highlight.innerText).toBe('est');
  });

  it('should handle contains highlight with multiple segments', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="testing" highlight="t" strategy="contains"/>'
    );
    await page.waitForChanges();

    const highlight = await page.findAll('strong');
    expect(highlight.length).toBe(2);
  });

  it('should properly handle starts with logic', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="testing" highlight="te" strategy="contains"/>'
    );
    await page.waitForChanges();

    const highlight = await page.findAll('strong');
    expect(highlight.length).toBe(1);
    expect(highlight[0].innerText).toBe('te');
  });

  it('should properly handle starts with logic for single characters', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="banana" highlight="b" strategy="contains"/>'
    );
    await page.waitForChanges();

    const highlight = await page.findAll('strong');
    expect(highlight.length).toBe(1);
    expect(highlight[0].innerText).toBe('b');
  });

  it('should handle single character in the middle', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="test" highlight="e" strategy="contains"/>'
    );
    await page.waitForChanges();

    const highlight = await page.findAll('strong');
    expect(highlight.length).toBe(1);
    expect(highlight[0].innerText).toBe('e');

    const text = await page.find('gux-text-highlight');
    expect(text.innerText).toBe('test');
  });
});
