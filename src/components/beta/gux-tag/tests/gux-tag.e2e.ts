import { newE2EPage } from '@stencil/core/testing';

describe('gux-tag-beta', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-tag-beta lang="en">Test</gux-tag-beta>');
    const element = await page.find('gux-tag-beta');
    expect(element).toHaveClass('hydrated');
  });
});
