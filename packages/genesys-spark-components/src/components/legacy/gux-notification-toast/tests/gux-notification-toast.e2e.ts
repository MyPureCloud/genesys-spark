import { E2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

async function clickDismissButton(page: E2EPage) {
  await page.evaluate(async () => {
    const element = document.querySelector('gux-notification-toast-legacy');
    const dismissButtonElement =
      element.shadowRoot.querySelector('gux-dismiss-button');
    const button = dismissButtonElement.shadowRoot.querySelector('button');

    button.click();
  });
}
describe('gux-notification-toast-legacy', () => {
  describe('#render', () => {
    [
      {
        description: 'should render neutral notification toast',
        html: `
          <gux-notification-toast-legacy lang="en" accent="neutral">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast-legacy>
        `
      },
      {
        description: 'should render positive notification toast',
        html: `
          <gux-notification-toast-legacy lang="en" accent="positive">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast-legacy>
        `
      },
      {
        description: 'should render alert notification toast',
        html: `
          <gux-notification-toast-legacy lang="en" accent="alert">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast-legacy>
        `
      },
      {
        description: 'should render warning notification toast',
        html: `
          <gux-notification-toast-legacy lang="en" accent="warning">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast-legacy>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-notification-toast-legacy');
        await a11yCheck(page);
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = `
        <gux-notification-toast-legacy lang="en" accent="neutral">
          <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
          <div slot="title">Title</div>
          <div slot="message">This is the message</div>
        </gux-notification-toast-legacy>
      `;
      const page = await newSparkE2EPage({ html });
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-notification-toast-legacy')).not.toBeNull();

      await clickDismissButton(page);
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-notification-toast-legacy')).toBeNull();
    });

    it('click dismiss button and prevent default', async () => {
      const html = `
        <gux-notification-toast-legacy lang="en" accent="neutral">
          <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
          <div slot="title">Title</div>
          <div slot="message">This is the message</div>
        </gux-notification-toast-legacy>
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
      expect(await page.find('gux-notification-toast-legacy')).not.toBeNull();

      await clickDismissButton(page);
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-notification-toast-legacy')).not.toBeNull();
    });
  });
});
