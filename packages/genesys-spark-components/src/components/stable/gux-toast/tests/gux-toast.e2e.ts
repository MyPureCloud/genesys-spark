import { E2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

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
    [
      {
        description: 'should render success toast',
        html: `
          <div aria-live="polite">
            <gux-toast toast-type="success">
              <div slot="title">Success Example with Link</div>
              <div slot="message">This is an example message</div>
              <a slot="link" href="#">Link</a>
            </gux-toast>
          </div>
        `
      },
      {
        description: 'should render warning toast',
        html: `
          <div aria-live="polite">
            <gux-toast toast-type="warning">
              <div slot="title">Warning Example with Link</div>
              <div slot="message">This is an example message</div>
              <a slot="link" href="#">Link</a>
            </gux-toast>
          </div>
        `
      },
      {
        description: 'should render error toast',
        html: `
          <div aria-live="polite">
            <gux-toast toast-type="error">
              <div slot="title">Error Example with Link</div>
              <div slot="message">This is an example message</div>
              <a slot="link" href="#">Link</a>
            </gux-toast>
          </div>
        `
      },
      {
        description: 'should render info toast',
        html: `
          <div aria-live="polite">
            <gux-toast toast-type="info">
              <div slot="title">Info Example with Link</div>
              <div slot="message">This is an example message</div>
              <a slot="link" href="#">Link</a>
            </gux-toast>
          </div>
        `
      },
      {
        description: 'should render action toast',
        html: `
          <div aria-live="polite">
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
          </div>
        `
      }
    ].forEach(({ description, html }) => {
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
      const html = `
        <div aria-live="polite">
          <gux-toast lang="en" toastType="info">
            <div slot="message">This is the message</div>
          </gux-toast>
        </div>
      `;
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
      const html = `
        <div aria-live="polite">
          <gux-toast lang="en" accent="info">
            <div slot="message">This is the message</div>
          </gux-toast>
        </div>
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
      expect(await page.find('gux-toast')).not.toBeNull();

      await clickDismissButton(page);
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-toast')).not.toBeNull();
    });
  });
});
