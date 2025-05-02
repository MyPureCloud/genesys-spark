import { checkRenders, newSpecPage } from '@test/specTestUtils';
import { GuxNotificationToast } from '../gux-notification-toast';
import { renderConfig, renderConfigs } from './gux-notification-toast.common';

const components = [GuxNotificationToast];
const language = 'en';

describe('gux-notification-toast-legacy', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });

  describe('#interactions', () => {
    it('click dismiss button', async () => {
      const page = await newSpecPage({
        components,
        html: renderConfig.html,
        language
      });
      const element = page.root as HTMLElement;
      const dismissButton =
        element.shadowRoot.querySelector('gux-dismiss-button');
      const guxdismissSpy = jest.fn();
      const clickSpy = jest.fn();
      const elementRemoveSpy = jest.spyOn(element, 'remove');

      page.win.addEventListener('guxdismiss', guxdismissSpy);
      page.win.addEventListener('click', clickSpy);

      dismissButton.click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveBeenCalled();
      expect(clickSpy).not.toHaveBeenCalled();
      expect(elementRemoveSpy).toHaveBeenCalledWith();
    });

    it('click dismiss button and prevent default', async () => {
      const page = await newSpecPage({
        components,
        html: renderConfig.html,
        language
      });
      const element = page.root as HTMLElement;
      const dismissButton =
        element.shadowRoot.querySelector('gux-dismiss-button');
      const elementRemoveSpy = jest.spyOn(element, 'remove');

      page.win.addEventListener('guxdismiss', (event: Event) => {
        event.preventDefault();
      });

      dismissButton.click();
      await page.waitForChanges();

      expect(elementRemoveSpy).not.toHaveBeenCalled();
    });
  });
});
