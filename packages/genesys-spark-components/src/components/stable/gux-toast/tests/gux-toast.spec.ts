import { checkRenders, newSpecPage } from '@test/specTestUtils';
import { GuxToast } from '../gux-toast';
import { renderConfig, renderConfigs } from './gux-toast.common';

const components = [GuxToast];

describe('gux-toast', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = renderConfig.html;
      const page = await newSpecPage({ components, html });
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
      const html = renderConfig.html;
      const page = await newSpecPage({ components, html });
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
