import { checkRenders, newSpecPage } from '@test/specTestUtils';

import { GuxButton } from '../../../stable/gux-button/gux-button';
import { GuxDismissButton } from '../../../stable/gux-dismiss-button/gux-dismiss-button';
import { GuxModalLegacy } from '../gux-modal-legacy';

import { renderConfig, renderConfigs } from './gux-modal-legacy.common';

const components = [GuxButton, GuxModalLegacy, GuxDismissButton];
const language = 'en';

describe('gux-modal-legacy', () => {
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
        page.root.shadowRoot.querySelector('gux-dismiss-button');
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
        page.root.shadowRoot.querySelector('gux-dismiss-button');
      const elementRemoveSpy = jest.spyOn(element, 'remove');

      page.win.addEventListener('guxdismiss', (event: Event) => {
        event.preventDefault();
      });

      dismissButton.click();
      await page.waitForChanges();

      expect(elementRemoveSpy).not.toHaveBeenCalled();

      element.remove();
    });
  });
});
