import { newSpecPage } from '@stencil/core/testing';
import { GuxSimpleToast } from '../gux-simple-toast';

const components = [GuxSimpleToast];
const language = 'en';

describe('gux-simple-toast', () => {
  describe('#render', () => {
    [
      {
        description: 'should render neutral simple toast',
        html: `
          <gux-simple-toast accent="neutral">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="message">This is the message</div>
          </gux-simple-toast>
        `
      },
      {
        description: 'should render positive simple toast',
        html: `
          <gux-simple-toast accent="positive">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="message">This is the message</div>
          </gux-simple-toast>
        `
      },
      {
        description: 'should render alert simple toast',
        html: `
          <gux-simple-toast accent="alert">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="message">This is the message</div>
          </gux-simple-toast>
        `
      },
      {
        description: 'should render warning simple toast',
        html: `
          <gux-simple-toast accent="warning">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="message">This is the message</div>
          </gux-simple-toast>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxSimpleToast);

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = `
        <gux-simple-toast accent="neutral">
          <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
          <div slot="message">This is the message</div>
        </gux-simple-toast>
      `;
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const dismissButton = page.root.querySelector(
        'gux-dismiss-button-beta'
      ) as HTMLElement;
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
        <gux-simple-toast accent="neutral">
          <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
          <div slot="message">This is the message</div>
        </gux-simple-toast>
      `;
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const dismissButton = page.root.querySelector(
        'gux-dismiss-button-beta'
      ) as HTMLElement;
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
