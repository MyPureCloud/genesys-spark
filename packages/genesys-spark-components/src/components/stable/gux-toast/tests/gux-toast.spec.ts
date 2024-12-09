import { newSpecPage } from '@test/specTestUtils';
import { GuxToast } from '../gux-toast';

const components = [GuxToast];
const language = 'en';

describe('gux-toast', () => {
  describe('#render', () => {
    [
      {
        description: 'should render success toast',
        html: `
          <gux-toast toast-type="success">
            <div slot="title">Success Example with Link</div>
            <div slot="message">This is an example message</div>
            <a slot="link" href="#">Link</a>
          </gux-toast>
        `
      },
      {
        description: 'should render warning toast',
        html: `
          <gux-toast toast-type="warning">
            <div slot="title">Warning Example with Link</div>
            <div slot="message">This is an example message</div>
            <a slot="link" href="#">Link</a>
          </gux-toast>
        `
      },
      {
        description: 'should render error toast',
        html: `
          <gux-toast toast-type="error">
            <div slot="title">Error Example with Link</div>
            <div slot="message">This is an example message</div>
            <a slot="link" href="#">Link</a>
          </gux-toast>
        `
      },
      {
        description: 'should render info toast',
        html: `
          <gux-toast toast-type="info">
            <div slot="title">Info Example with Link</div>
            <div slot="message">This is an example message</div>
            <a slot="link" href="#">Link</a>
          </gux-toast>
        `
      },
      {
        description: 'should render action toast',
        html: `
          <gux-toast toast-type="action">
            <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative></gux-icon>
            <div slot="title">2 Actions</div>
            <div slot="message">This is an example message</div>
            <button slot="primary-button" type="button" onclick="notify(event)">
              Action 1
            </button>
            <button slot="secondary-button" type="button" onclick="notify(event)">
              Action 2
            </button>
          </gux-toast>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxToast);

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = `
        <gux-toast toastType="info">
          <div slot="message">This is the message</div>
        </gux-toast>
      `;
      const page = await newSpecPage({ components, html, language });
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
      expect(elementRemoveSpy).toBeCalledWith();
    });

    it('click dismiss button and prevent default', async () => {
      const html = `
        <gux-toast toastType="info">
          <div slot="message">This is the message</div>
        </gux-toast>
      `;
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const dismissButton =
        element.shadowRoot.querySelector('gux-dismiss-button');
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
