import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { E2EPage } from '@stencil/core/testing';

describe('gux-modal', () => {
  describe('#render', () => {
    [
      {
        description: 'should render small modal',
        html: `
          <gux-modal lang="en" size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent="primary"><button>Accept</button></gux-button-slot>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render medium modal',
        html: `
          <gux-modal lang="en" size="medium">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent="primary"><button>Accept</button></gux-button-slot>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render large modal',
        html: `
          <gux-modal lang="en" size="large">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent="primary"><button>Accept</button></gux-button-slot>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render modal without a title',
        html: `
          <gux-modal lang="en" size="large">
            <div slot="content">This contains the modal content.</div>
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent="primary"><button>Accept</button></gux-button-slot>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render modal without buttons',
        html: `
          <gux-modal lang="en" size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
          </gux-modal>
        `
      },
      {
        description: 'should render modal with just left align buttons',
        html: `
          <gux-modal lang="en" size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render modal with just right align buttons',
        html: `
          <gux-modal lang="en" size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="end-align-buttons">
              <gux-button-slot accent="primary"><button>Accept</button></gux-button-slot>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render small modal by default',
        html: `
          <gux-modal lang="en">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent="primary"><button>Accept</button></gux-button-slot>
            </div>
          </gux-modal>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-modal');

        expect(element.outerHTML).toMatchSnapshot();

        element.setAttribute('hidden', true);
        await page.waitForChanges();
        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = `
        <gux-modal lang="en" size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <div slot="start-align-buttons">
              <gux-button-slot><button>Cancel</button></gux-button-slot>
          </div>
          <div slot="end-align-buttons">
            <gux-button-slot accent="primary"><button>Accept</button></gux-button-slot>
          </div>
        </gux-modal>
      `;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-modal');
      const dismissButtonElement = await element.find(
        'pierce/gux-dismiss-button'
      );
      const dismissButton = await dismissButtonElement.find('pierce/button');
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-modal')).not.toBeNull();

      await dismissButton.click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-modal')).toBeNull();
    });

    it('click dismiss button and prevent default', async () => {
      const html = `
        <gux-modal lang="en" size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <div slot="start-align-buttons">
              <gux-button-slot><button>Cancel</button></gux-button-slot>
          </div>
          <div slot="end-align-buttons">
            <gux-button-slot accent="primary"><button>Accept</button></gux-button-slot>
          </div>
        </gux-modal>
      `;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-modal');
      const dismissButtonElement = await element.find(
        'pierce/gux-dismiss-button'
      );
      const dismissButton = await dismissButtonElement.find('pierce/button');
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      await page.evaluate(() => {
        document.addEventListener('guxdismiss', event => {
          event.preventDefault();
        });
      });

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-modal')).not.toBeNull();

      await dismissButton.click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-modal')).not.toBeNull();
    });

    it('escape key dismiss', async () => {
      const html = `
        <gux-modal lang="en" size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <div slot="start-align-buttons">
              <gux-button-slot><button>Cancel</button></gux-button-slot>
          </div>
          <div slot="end-align-buttons">
            <gux-button-slot accent="primary"><button>Accept</button></gux-button-slot>
          </div>
        </gux-modal>
      `;
      const page = await newSparkE2EPage({ html });
      const modalEl = await page.find('gux-modal');
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(modalEl).not.toBeNull();

      await page.keyboard.down('Escape');
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(await page.find('gux-modal')).toBeNull();
    });
  });

  describe('focus', () => {
    const focusModalHtml = (props = '') => `
      <gux-modal lang="en" size="small" trap-focus="true" ${props}>
        <div slot="title">Modal Title</div>
        <div slot="content">This contains the modal content.</div>
        <div slot="start-align-buttons">
            <gux-button id="cancel-button">Cancel</gux-button>
        </div>
        <div slot="end-align-buttons">
          <gux-button id="accept-button" accent="primary">Accept</gux-button>
        </div>
      </gux-modal>
    `;
    const modalContainerHtml = `
      <div id="modal-container"></div>
      <button id="other-button">Do Nothing</button>
      <button id="modal-trigger">Open Modal</button>
    `;
    const setupContainerPage = async (modalHtml: string) => {
      const page = await newSparkE2EPage({ html: modalContainerHtml });

      await page.evaluate(html => {
        document
          .getElementById('modal-trigger')
          ?.addEventListener('click', () => {
            if (document.getElementById('modal-container'))
              document.getElementById('modal-container').innerHTML = html;
          });
      }, modalHtml);
      return page;
    };

    const getFocusedElementText = (page: E2EPage) =>
      page.evaluate(() => document.activeElement.textContent);
    const getFocusedShadowElementText = (page: E2EPage) =>
      page.evaluate(
        () =>
          document.querySelector('gux-modal').shadowRoot.activeElement
            .textContent
      );
    const getFocusedShadowElementTagName = (page: E2EPage) =>
      page.evaluate(
        () =>
          document.querySelector('gux-modal').shadowRoot.activeElement.tagName
      );

    it('focuses the dismiss button by defualt', async () => {
      const page = await setupContainerPage(focusModalHtml());
      await page.click('#modal-trigger');
      await page.waitForChanges();

      expect(await page.find('gux-modal')).not.toBeNull();
      expect(await getFocusedShadowElementText(page)).toBe('');
      expect(await getFocusedShadowElementTagName(page)).toBe(
        'GUX-DISMISS-BUTTON'
      );
    });

    test('can focus a specific focusable element', async () => {
      const page = await setupContainerPage(
        focusModalHtml('initial-focus="#accept-button"')
      );
      await page.click('#modal-trigger');
      await page.waitForChanges();

      expect(await page.find('gux-modal')).not.toBeNull();
      expect(await getFocusedElementText(page)).toBe('Accept');
    });

    test('focuses the dismiss button if there are no other focusable elements', async () => {
      const page = await setupContainerPage(`
        <gux-modal lang="en" size="small">
          <div slot="content">This contains the modal content.</div>
        </gux-modal>
      `);
      await page.click('#modal-trigger');
      await page.waitForChanges();

      expect(await page.find('gux-modal')).not.toBeNull();
      expect(await getFocusedShadowElementText(page)).toBe('');
      expect(await getFocusedShadowElementTagName(page)).toBe(
        'GUX-DISMISS-BUTTON'
      );
    });

    test('traps focus in the modal', async () => {
      const page = await setupContainerPage(focusModalHtml());
      await page.click('#modal-trigger');
      await page.waitForChanges();

      expect(await getFocusedShadowElementText(page)).toBe('');
      expect(await getFocusedShadowElementTagName(page)).toBe(
        'GUX-DISMISS-BUTTON'
      );

      await page.keyboard.press('Tab');

      expect(await getFocusedElementText(page)).toBe('Cancel');

      await page.keyboard.press('Tab');

      expect(await getFocusedElementText(page)).toBe('Accept');

      await page.keyboard.press('Tab');

      expect(await getFocusedShadowElementText(page)).toBe('');
      expect(await getFocusedShadowElementTagName(page)).toBe(
        'GUX-DISMISS-BUTTON'
      );

      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab');

      expect(await getFocusedShadowElementText(page)).toBe('');
      expect(await getFocusedShadowElementTagName(page)).toBe(
        'GUX-DISMISS-BUTTON'
      );
    });

    test('returns focus to the originally focused element when the modal closes', async () => {
      const page = await setupContainerPage(focusModalHtml());

      await page.click('#modal-trigger');
      await page.waitForChanges();

      expect(await getFocusedShadowElementText(page)).toBe('');
      expect(await getFocusedShadowElementTagName(page)).toBe(
        'GUX-DISMISS-BUTTON'
      );

      await page.keyboard.down('Escape');
      await page.waitForChanges();

      expect(await getFocusedElementText(page)).toBe('Open Modal');
    });
  });
});
