import { E2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfig, renderConfigs } from './gux-toast.common';

async function clickDismissButton(page: E2EPage) {
  await page.evaluate(async () => {
    const element = document.querySelector('gux-toast');
    const dismissButtonElement =
      element.shadowRoot.querySelector('gux-dismiss-button');
    const button = dismissButtonElement.shadowRoot.querySelector('button');

    button.click();
  });
}

describe('gux-toast', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-toast');
        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = renderConfig.html;
      const page = await newSparkE2EPage({ html });
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-toast')).not.toBeNull();

      await clickDismissButton(page);
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-toast')).toBeNull();
    });

    it('click dismiss button and prevent default', async () => {
      const html = renderConfig.html;
      const page = await newSparkE2EPage({ html });
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      await page.evaluate(() => {
        document.addEventListener('guxdismiss', event => {
          event.preventDefault();
        });
      });

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-toast')).not.toBeNull();

      await clickDismissButton(page);
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-toast')).not.toBeNull();
    });
  });
});
