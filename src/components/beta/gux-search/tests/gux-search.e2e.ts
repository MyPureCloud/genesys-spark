import { newE2EPage } from '@stencil/core/testing';

describe('gux-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-search-beta lang="en"></gux-search-beta>');
    const element = await page.find('gux-search-beta');
    expect(element).toHaveClass('hydrated');
  });

  describe('clear button', () => {
    it('should appear when the value is not empty', async () => {
      const page = await newE2EPage();

      await page.setContent('<gux-search-beta lang="en"></gux-search-beta>');
      const element = await page.find('gux-search-beta');
      let clearButton = await element.find('button');
      const input = await element.find('input');
      expect(clearButton).toBeNull();

      await input.press('KeyT');
      await input.press('KeyE');
      await input.press('KeyS');
      await input.press('KeyT');
      await page.waitForChanges();

      clearButton = await element.find('button');
      expect(clearButton).not.toBeNull();

      let value = await input.getProperty('value');
      expect(value).toBe('test');

      clearButton.click();
      await page.waitForChanges();

      value = await input.getProperty('value');
      expect(value).toBe('');
    });
  });

  describe('on text input', () => {
    it('should send key data.', async () => {
      const page = await newE2EPage();

      await page.setContent('<gux-search-beta lang="en"></gux-search-beta>');
      const element = await page.find('gux-search-beta');
      const input = await element.find('input');

      const inputSpy = await element.spyOnEvent('input');
      await input.press('KeyT');
      expect(inputSpy).toHaveReceivedEventDetail('t');
    });
  });

  describe('search request', () => {
    it('should emit search event on Enter', async () => {
      const page = await newE2EPage();

      await page.setContent('<gux-search-beta lang="en"></gux-search-beta>');
      const element = await page.find('gux-search-beta');
      const input = await element.find('input');

      const searchSpy = await element.spyOnEvent('search');
      await input.press('KeyT');
      await input.press('KeyE');
      await input.press('KeyS');
      await input.press('KeyT');

      await input.press('Enter');
      expect(searchSpy).toHaveReceivedEventDetail('test');
    });
  });

  describe('dynamic search', () => {
    it('should emit search event after delay', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<gux-search-beta lang="en" dynamic-search="true" search-timeout="0"></gux-search-beta>'
      );
      const element = await page.find('gux-search-beta');
      const input = await element.find('input');

      const searchSpy = await element.spyOnEvent('search');
      await input.press('KeyT');
      expect(searchSpy).toHaveReceivedEventDetail('t');
    });
  });
});
