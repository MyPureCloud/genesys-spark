import {
  a11yCheck,
  newSparkE2EPage,
  waitForTimeout
} from '../../../../../test/e2eTestUtils';

describe('gux-avatar-overflow', () => {
  describe('#render', () => {
    it('should render component as expected', async () => {
      const html = `
      <gux-avatar-group-beta>
        <gux-avatar-group-item-beta name="Valerie Wall"></gux-avatar-group-item-beta>
        <gux-avatar-group-item-beta name="Xavier Yarrow"></gux-avatar-group-item-beta>
        <gux-avatar-overflow-beta>
          <gux-avatar-overflow-item-beta name="John Smith"></gux-avatar-overflow-item-beta>
          <gux-avatar-overflow-item-beta name="Tom Smith"></gux-avatar-overflow-item-beta>
          <gux-avatar-overflow-item-beta name="Mary Smith"></gux-avatar-overflow-item-beta>
        </gux-avatar-overflow-beta>
      <gux-avatar-group-beta>
      `;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-avatar-overflow-beta');

      await a11yCheck(page);
      expect(element.outerHTML).toMatchSnapshot();
    });
  });

  describe('interactions', () => {
    it('should open and close menu on button click', async () => {
      const html = `
      <gux-avatar-overflow-beta>
        <gux-avatar-overflow-item-beta name="Joe Bloggs"></gux-avatar-overflow-item-beta>
      </gux-avatar-overflow-beta>
    `;
      const page = await newSparkE2EPage({ html });
      const button = await page.find('pierce/button');

      expect(button.getAttribute('aria-expanded')).toBe('false');

      await button.click();
      await page.waitForChanges();
      await waitForTimeout(500);
      expect(button.getAttribute('aria-expanded')).toBe('true');

      await button.click();
      await waitForTimeout(500);
      await page.waitForChanges();
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it('should focus on first item when menu opens', async () => {
      const html = `
    <gux-avatar-overflow-beta>
      <gux-avatar-overflow-item-beta name="John Smith"></gux-avatar-overflow-item-beta>
      <gux-avatar-overflow-item-beta name="Tom Smith"></gux-avatar-overflow-item-beta>
      <gux-avatar-overflow-item-beta name="Mary Smith"></gux-avatar-overflow-item-beta>
    </gux-avatar-overflow-beta>
  `;

      const page = await newSparkE2EPage({ html });
      const button = await page.find('pierce/button');

      const activeElementNameBefore = await page.evaluate(() => {
        const activeElement =
          document.activeElement as HTMLGuxAvatarOverflowItemBetaElement;
        return activeElement.name;
      });
      expect(activeElementNameBefore).not.toBe('John Smith');

      await button.click();
      await page.waitForChanges();

      const activeElementNameAfter = await page.evaluate(() => {
        const activeElement =
          document.activeElement as HTMLGuxAvatarOverflowItemBetaElement;
        return activeElement.name;
      });

      expect(activeElementNameAfter).toBe('John Smith');
    });

    it('should handle close on escape key', async () => {
      const html = `
      <gux-avatar-overflow-beta>
        <gux-avatar-overflow-item-beta name="John Smith"></gux-avatar-overflow-item-beta>
        <gux-avatar-overflow-item-beta name="Tom Smith"></gux-avatar-overflow-item-beta>
      </gux-avatar-overflow-beta>
    `;
      const page = await newSparkE2EPage({ html });
      const button = await page.find('pierce/button');

      // Open menu
      await button.click();
      await waitForTimeout(500);
      await page.waitForChanges();
      expect(await button.getAttribute('aria-haspopup')).toBe('true');
      expect(await button.getAttribute('aria-expanded')).toBe('true');

      // Press Escape to close menu
      await page.keyboard.press('Escape');
      await waitForTimeout(500);
      await page.waitForChanges();
      expect(await button.getAttribute('aria-expanded')).toBe('false');
    });

    it('should handle close on tab key', async () => {
      const html = `
      <gux-avatar-overflow-beta>
        <gux-avatar-overflow-item-beta name="John Smith"></gux-avatar-overflow-item-beta>
        <gux-avatar-overflow-item-beta name="Tom Smith"></gux-avatar-overflow-item-beta>
      </gux-avatar-overflow-beta>
    `;
      const page = await newSparkE2EPage({ html });
      const button = await page.find('pierce/button');

      // Open menu
      await button.click();
      await waitForTimeout(500);
      await page.waitForChanges();
      expect(await button.getAttribute('aria-expanded')).toBe('true');

      // Press Tab to close menu
      await page.keyboard.press('Tab');
      await waitForTimeout(500);
      await page.waitForChanges();
      expect(await button.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
