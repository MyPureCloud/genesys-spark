import { newE2EPage } from '@stencil/core/testing';

describe('gux-text-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-text-label></gux-text-label>');
    const element = await page.find('gux-text-label');
    expect(element).toHaveClass('hydrated');
  });

  it('provides a label with correct text', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-text-label label="Test Item"></gux-text-label>'
    );
    const element = await page.find('gux-text-label label');
    expect(element).toEqualText('Test Item');
  });
});
