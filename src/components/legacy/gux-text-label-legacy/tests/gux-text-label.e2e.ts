import { newE2EPage } from '@stencil/core/testing';

describe('gux-text-label-legacy', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <gux-text-label-legacy lang="en" label="Test Item">
        <input type="text">
      </gux-text-label-legacy>
    `);
    await page.waitForChanges();

    const element = await page.find('gux-text-label-legacy');
    expect(element).toHaveClass('hydrated');
  });

  it('uses the correct label when simple label value provided', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <gux-text-label-legacy lang="en" label="Test Item">
      <input type="text">
      </gux-text-label-legacy>
    `);
    await page.waitForChanges();

    const element = await page.find('gux-text-label-legacy label');
    expect(element).toEqualText('Test Item');
  });

  it('uses the correct label when slotted label provided', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <gux-text-label-legacy lang="en">
        <div slot="label">Test Item</div>
        <input type="text">
      </gux-text-label-legacy>
    `);
    await page.waitForChanges();

    const element = await page.find('gux-text-label-legacy label');
    expect(element).toEqualText('Test Item');
  });

  it('provides an aria-labelledby on its content', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-text-label-legacy lang="en" label="Test Item"><input type="text"></gux-text-label-legacy>'
    );
    await page.waitForChanges();

    const textLabel = await page.find('gux-text-label-legacy label');
    const labelId = textLabel.id;

    const textField = await page.find('gux-text-label-legacy input');
    const label = textField.getAttribute('aria-labelledby');
    expect(label).toEqual(labelId);
  });
});
