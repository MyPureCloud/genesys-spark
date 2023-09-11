import { E2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

async function clickDismissButton(page: E2EPage) {
  await page.evaluate(async () => {
    const element = document.querySelector('gux-simple-toast-legacy');
    const dismissButtonElement =
      element.shadowRoot.querySelector('gux-dismiss-button');
    const button = dismissButtonElement.shadowRoot.querySelector('button');

    button.click();
  });
}

describe('gux-simple-toast-legacy', () => {
  describe('#render', () => {
    [
      {
        description: 'should render neutral simple toast',
        html: `
          <gux-simple-toast-legacy lang="en" accent="neutral">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="message">This is the message</div>
          </gux-simple-toast-legacy>
        `
      },
      {
        description: 'should render positive simple toast',
        html: `
          <gux-simple-toast-legacy lang="en" accent="positive">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="message">This is the message</div>
          </gux-simple-toast-legacy>
        `
      },
      {
        description: 'should render alert simple toast',
        html: `
          <gux-simple-toast-legacy lang="en" accent="alert">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="message">This is the message</div>
          </gux-simple-toast-legacy>
        `
      },
      {
        description: 'should render warning simple toast',
        html: `
          <gux-simple-toast-legacy lang="en" accent="warning">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="message">This is the message</div>
          </gux-simple-toast-legacy>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-simple-toast-legacy');
        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = `
        <gux-simple-toast-legacy lang="en" accent="neutral">
          <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
          <div slot="message">This is the message</div>
        </gux-simple-toast-legacy>
      `;
      const page = await newSparkE2EPage({ html });
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-simple-toast-legacy')).not.toBeNull();

      await clickDismissButton(page);
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-simple-toast-legacy')).toBeNull();
    });

    it('click dismiss button and prevent default', async () => {
      const html = `
        <gux-simple-toast-legacy lang="en" accent="neutral">
          <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
          <div slot="message">This is the message</div>
        </gux-simple-toast-legacy>
      `;
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
      expect(await page.find('gux-simple-toast-legacy')).not.toBeNull();

      await clickDismissButton(page);
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-simple-toast-legacy')).not.toBeNull();
    });
  });
});
