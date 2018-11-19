import { newE2EPage } from '@stencil/core/testing'

describe('genesys-text-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-text-field></genesys-text-field>');
    const element = await page.find('genesys-text-field');
    const clearButton = await element.find('genesys-text-field button');
    expect(clearButton).toBe(null);
    expect(element).toHaveClass('hydrated');
  });
  describe('clear button', () => {
    it('should appear when the value is not empty', async () => {
      const page = await newE2EPage();

      await page.setContent('<genesys-text-field></genesys-text-field>');
      let element = await page.find('genesys-text-field');
      let clearButton = await element.find('genesys-text-field button');
      const input = await element.find('genesys-text-field input');
      expect(clearButton).toBeNull();
      expect(element).toHaveClass('hydrated');
      await input.press('KeyT');
      await input.press('KeyE');
      await input.press('KeyS');
      await input.press('KeyT');
      await page.waitForChanges();
      clearButton = await element.find('genesys-text-field button');
      element = await page.find('genesys-text-field');
      expect(clearButton).not.toBeNull();
      let value = await input.getProperty('value');
      expect(value).toBe('test');
      clearButton.click();
      await page.waitForChanges();
      value = await input.getProperty('value');
      expect(value).toBe('');
    });
  });
});
