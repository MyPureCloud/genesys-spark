import { checkRenders, newSpecPage } from '@test/specTestUtils';

import { GuxDisclosureButtonLegacy } from '../gux-disclosure-button';

import {
  closedRenderConfig,
  openRenderConfig,
  renderConfigs
} from './gux-disclosure-button.common';

const components = [GuxDisclosureButtonLegacy];
const language = 'en';

describe('gux-disclosure-button', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });

  describe('#interactions', () => {
    it('should open when clicked', async () => {
      const page = await newSpecPage({
        components,
        html: closedRenderConfig.html,
        language
      });
      const element = page.root as HTMLGuxDisclosureButtonLegacyElement;
      const button: HTMLButtonElement = element.shadowRoot.querySelector(
        '.gux-disclosure-button'
      );
      const panel = element.shadowRoot.querySelector('.gux-disclosure-panel');
      const icon = element.shadowRoot.querySelector('gux-icon');

      const activeEventSpy = jest.fn();
      element.addEventListener('active', activeEventSpy);

      expect(element.isOpen).toBe(false);
      expect(panel).not.toHaveClass('gux-active');
      expect(icon).toEqualAttribute('icon-name', 'fa/caret-right-solid');

      button.click();

      await page.waitForChanges();

      expect(element.isOpen).toBe(true);
      expect(panel).toHaveClass('gux-active');
      expect(icon).toEqualAttribute('icon-name', 'fa/caret-left-solid');
      expect(activeEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: true
        })
      );
    });

    it('should close when clicked', async () => {
      const page = await newSpecPage({
        components,
        html: openRenderConfig.html,
        language
      });

      const element = page.root as HTMLGuxDisclosureButtonLegacyElement;
      const button: HTMLButtonElement = element.shadowRoot.querySelector(
        '.gux-disclosure-button'
      );
      const panel = element.shadowRoot.querySelector('.gux-disclosure-panel');
      const icon = element.shadowRoot.querySelector('gux-icon');

      const activeEventSpy = jest.fn();
      element.addEventListener('active', activeEventSpy);

      expect(element.isOpen).toBe(true);
      expect(panel).toHaveClass('gux-active');
      expect(icon).toEqualAttribute('icon-name', 'fa/caret-left-solid');

      button.click();

      await page.waitForChanges();

      expect(element.isOpen).toBe(false);
      expect(panel).not.toHaveClass('gux-active');
      expect(icon).toEqualAttribute('icon-name', 'fa/caret-right-solid');
      expect(activeEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: false
        })
      );
    });
  });
});
