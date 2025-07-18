import { E2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

import { renderConfig } from './gux-avatar-overflow-item.common';

describe('gux-avatar-overflow-item-beta', () => {
  describe('#render', () => {
    it(renderConfig.description, async () => {
      const page = await newSparkE2EPage({ html: renderConfig.html });
      const element = await page.find('gux-avatar-overflow-item-beta');

      await a11yCheck(page);
      expect(element.outerHTML).toMatchSnapshot();
    });
  });

  describe('#interactions', () => {
    it('should focus on button when focus method is called', async () => {
      const html = `
        <div role="menu">
        <gux-avatar-overflow-item-beta name="John Doe">
        </gux-avatar-overflow-item-beta>
        <button></button>
        </div>
      `;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-avatar-overflow-item-beta');

      expect(document.activeElement).toBeFalsy();

      await element.callMethod('focus');
      await page.waitForChanges();

      expect(await page.evaluate(() => document.activeElement.tagName)).toBe(
        'GUX-AVATAR-OVERFLOW-ITEM-BETA'
      );
    });

    it('should handle keyboard navigation', async () => {
      const getActiveElementLabel = async (page: E2EPage): Promise<string> => {
        return page.evaluate(() => {
          const activeElement =
            document.activeElement?.shadowRoot?.querySelector(
              'button'
            ) as HTMLElement;
          return activeElement.getAttribute('aria-label');
        });
      };

      const html = `
          <div>
            <gux-avatar-overflow-item-beta name="John Doe">
            </gux-avatar-overflow-item-beta>
            <gux-avatar-overflow-item-beta name="Jane Smith">
            </gux-avatar-overflow-item-beta>
          </div>
        `;
      const page = await newSparkE2EPage({ html });
      const firstButton = await page.find('pierce/button');

      await firstButton.focus();
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      expect(await getActiveElementLabel(page)).toBe('Jane Smith');

      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      expect(await getActiveElementLabel(page)).toBe('John Doe');

      await page.keyboard.press('ArrowUp');
      await page.waitForChanges();

      expect(await getActiveElementLabel(page)).toBe('Jane Smith');

      await page.keyboard.press('Home');
      await page.waitForChanges();

      expect(await getActiveElementLabel(page)).toBe('John Doe');

      await page.keyboard.press('End');
      await page.waitForChanges();

      expect(await getActiveElementLabel(page)).toBe('Jane Smith');
    });
  });
});
