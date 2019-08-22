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

  it('should handle starts with fuzzy matches', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="food" highlight="f" strategy="fuzzy"/>'
    );
    await page.waitForChanges();

    const highlight = await page.findAll('strong');
    expect(highlight.length).toBe(1);
    expect(highlight[0].innerText).toBe('f');

    const text = await page.find('gux-text-highlight');
    expect(text.innerText).toBe('food');
  });

  it('should handle ends with fuzzy matches', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="food" highlight="d" strategy="fuzzy"/>'
    );
    await page.waitForChanges();

    const highlight = await page.findAll('strong');
    expect(highlight.length).toBe(1);
    expect(highlight[0].innerText).toBe('d');

    const text = await page.find('gux-text-highlight');
    expect(text.innerText).toBe('food');
  });

  it('should handle non matching fuzzy matches', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="food" highlight="z" strategy="fuzzy"/>'
    );
    await page.waitForChanges();

    const highlight = await page.findAll('strong');
    expect(highlight.length).toBe(0);

    const text = await page.find('gux-text-highlight');
    expect(text.innerText).toBe('food');
  });

  it('should handle contains fuzzy matches', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="apple" highlight="pl" strategy="fuzzy"/>'
    );
    await page.waitForChanges();

    const highlight = await page.findAll('strong');
    expect(highlight.length).toBe(1);
    expect(highlight[0].innerText).toBe('pl');

    const text = await page.find('gux-text-highlight');
    expect(text.innerText).toBe('apple');
  });

  it('should handle fuzzy matches', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-text-highlight text="Dial Home Phone" highlight="dial ph" strategy="fuzzy"/>'
    );
    await page.waitForChanges();

    const highlight = await page.findAll('strong');
    expect(highlight.length).toBe(2);
    expect(highlight[0].innerText).toBe('Dial');
    expect(highlight[1].innerText).toBe('Ph');

    const text = await page.find('gux-text-highlight');
    expect(text.innerText).toBe('Dial Home Phone');
  });
});
