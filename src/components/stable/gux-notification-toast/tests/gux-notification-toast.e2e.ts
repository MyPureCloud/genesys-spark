import { newE2EPage } from '@stencil/core/testing';

describe('gux-notification-toast', () => {
  describe('#render', () => {
    [
      {
        description: 'should render neutral notification toast',
        html: `
          <gux-notification-toast lang="en" accent="neutral">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast>
        `
      },
      {
        description: 'should render positive notification toast',
        html: `
          <gux-notification-toast lang="en" accent="positive">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast>
        `
      },
      {
        description: 'should render alert notification toast',
        html: `
          <gux-notification-toast lang="en" accent="alert">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast>
        `
      },
      {
        description: 'should render warning notification toast',
        html: `
          <gux-notification-toast lang="en" accent="warning">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newE2EPage({ html });
        const element = await page.find('gux-notification-toast');

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = `
        <gux-notification-toast lang="en" accent="neutral">
          <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
          <div slot="title">Title</div>
          <div slot="message">This is the message</div>
        </gux-notification-toast>
      `;
      const page = await newE2EPage({ html });
      const element = await page.find('gux-notification-toast');
      const dismissButton = await element.find(
        'gux-dismiss-button-beta >>> button'
      );
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-notification-toast')).not.toBeNull();

      await dismissButton.click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-notification-toast')).toBeNull();
    });

    it('click dismiss button and prevent default', async () => {
      const html = `
        <gux-notification-toast lang="en" accent="neutral">
          <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
          <div slot="title">Title</div>
          <div slot="message">This is the message</div>
        </gux-notification-toast>
      `;
      const page = await newE2EPage({ html });
      const element = await page.find('gux-notification-toast');
      const dismissButton = await element.find(
        'gux-dismiss-button-beta >>> button'
      );
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      await page.evaluate(() => {
        document.addEventListener('guxdismiss', event => {
          event.preventDefault();
        });
      });

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-notification-toast')).not.toBeNull();

      await dismissButton.click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-notification-toast')).not.toBeNull();
    });
  });
});
