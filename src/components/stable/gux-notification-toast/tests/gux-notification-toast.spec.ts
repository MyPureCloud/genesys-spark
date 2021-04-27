import { newSpecPage } from '@stencil/core/testing';
import { GuxNotificationToast } from '../gux-notification-toast';

const components = [GuxNotificationToast];
const language = 'en';

describe('gux-notification-toast', () => {
  describe('#render', () => {
    [
      {
        description: 'should render neutral notification toast',
        html: `
          <gux-notification-toast accent="neutral">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast>
        `
      },
      {
        description: 'should render positive notification toast',
        html: `
          <gux-notification-toast accent="positive">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast>
        `
      },
      {
        description: 'should render alert notification toast',
        html: `
          <gux-notification-toast accent="alert">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast>
        `
      },
      {
        description: 'should render warning notification toast',
        html: `
          <gux-notification-toast accent="warning">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxNotificationToast);

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = `
        <gux-notification-toast accent="neutral">
          <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
          <div slot="title">Title</div>
          <div slot="message">This is the message</div>
        </gux-notification-toast>
      `;
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const dismissButton = page.root.querySelector(
        '.gux-dismiss-button'
      ) as HTMLButtonElement;
      const guxdismissSpy = jest.fn();
      const clickSpy = jest.fn();
      const elementRemoveSpy = jest.spyOn(element, 'remove');

      page.win.addEventListener('guxdismiss', guxdismissSpy);
      page.win.addEventListener('click', clickSpy);

      dismissButton.click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveBeenCalled();
      expect(clickSpy).not.toHaveBeenCalled();
      expect(elementRemoveSpy).toBeCalledWith();
    });

    it('click dismiss button and prevent default', async () => {
      const html = `
        <gux-notification-toast accent="neutral">
          <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
          <div slot="title">Title</div>
          <div slot="message">This is the message</div>
        </gux-notification-toast>
      `;
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const dismissButton = page.root.querySelector(
        '.gux-dismiss-button'
      ) as HTMLButtonElement;
      const elementRemoveSpy = jest.spyOn(element, 'remove');

      page.win.addEventListener('guxdismiss', (event: Event) => {
        event.preventDefault();
      });

      dismissButton.click();
      await page.waitForChanges();

      expect(elementRemoveSpy).not.toBeCalled();
    });
  });
});
