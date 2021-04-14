import { newE2EPage } from '@stencil/core/testing';

describe('gux-input-select', () => {
  it('renders', async () => {
    const html = `
      <gux-input-select>
        <select slot="input">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </<gux-input-select>
    `;
    const page = await newE2EPage({ html });
    const element = await page.find('gux-input-select');

    expect(element).toHaveClass('hydrated');
  });
});
