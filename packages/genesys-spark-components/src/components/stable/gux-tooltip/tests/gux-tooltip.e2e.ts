import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfig } from './gux-tooltip.common';

describe('gux-tooltip', () => {
  describe('#render', () => {
    it(renderConfig.description, async () => {
      const page = await newSparkE2EPage({ html: renderConfig.html });

      const element = await page.find('#element');
      const tooltip = await page.find('gux-tooltip');
      expect(tooltip.className.split(' ')).not.toContain('gux-show');
      await element.hover();
      await page.waitForChanges();

      await a11yCheck(page);

      expect(element.getAttribute('aria-describedby')).toBe(tooltip.id);
      expect(tooltip.className.split(' ')).toContain('gux-show');
      expect(tooltip.getAttribute('data-placement')).toBe('bottom-start');
      expect(tooltip).toHaveAttribute('hydrated');
    });
  });
});
