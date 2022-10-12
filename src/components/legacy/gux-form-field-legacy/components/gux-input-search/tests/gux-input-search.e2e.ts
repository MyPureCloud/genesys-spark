import { newSparkE2EPage, a11yCheck } from 'test/e2eTestUtils';

describe('gux-input-search', () => {
  describe('#render', () => {
    [
      `<gux-input-search lang="en">
        <input name="search" type="search" placeholder="Enter a search" />
      </gux-input-search>`,
      `<gux-input-search lang="en">
        <input name="search" type="search" placeholder="Enter a search" value="test" />
      </gux-input-search>`,
      `<gux-input-search lang="en">
        <input name="search" type="search" placeholder="Enter a search" disabled/>
      </gux-input-search>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-input-search');
        await a11yCheck(page);

        expect(element.innerHTML).toMatchSnapshot();
      });
    });
  });

  describe('clear button', () => {
    it('should appear when the value is not empty', async () => {
      const html = `
      <gux-input-search lang="en">
        <input name="search" type="search" placeholder="Enter a search" />
      </gux-input-search>`;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-input-search');

      const clearButtonNoInput = await element.find('button.gux-clear-button');
      await a11yCheck(page, [], 'Input is empty');
      expect(clearButtonNoInput).toBeNull();

      const input = await element.find('input[type="search"]');
      await input.press('KeyT');
      await input.press('KeyE');
      await input.press('KeyS');
      await input.press('KeyT');
      await page.waitForChanges();

      const clearButtonInput = await element.find('button.gux-clear-button');
      await a11yCheck(page, [], 'Input contains a value');
      expect(clearButtonInput).not.toBeNull();

      const value = await input.getProperty('value');
      expect(value).toBe('test');
    });
  });
});
