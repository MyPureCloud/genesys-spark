import { newE2EPage } from '@stencil/core/testing';

describe('gux-form-field-beta', () => {
  it('renders', async () => {
    const html = `
      <gux-form-field-beta>
        <input slot="input" type="text">
        <label slot="label">Text</label>
      </gux-form-field-beta>
    `;
    const page = await newE2EPage({ html });

    const element = await page.find('gux-form-field-beta');
    expect(element).toHaveClass('hydrated');
  });
});
