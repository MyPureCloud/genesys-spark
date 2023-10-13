import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { E2EPage } from '@stencil/core/testing';

describe('gux-modal-legacy', () => {
  describe('#render', () => {
    [
      {
        description: 'should render small modal',
        html: `
          <gux-modal-legacy lang="en" size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent="primary">Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
      },
      {
        description: 'should render medium modal',
        html: `
          <gux-modal-legacy lang="en" size="medium">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent="primary">Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
      },
      {
        description: 'should render large modal',
        html: `
          <gux-modal-legacy lang="en" size="large">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent="primary">Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
      },
      {
        description: 'should render modal without a title',
        html: `
          <gux-modal-legacy lang="en" size="large">
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent="primary">Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
      },
      {
        description: 'should render modal without buttons',
        html: `
          <gux-modal-legacy lang="en" size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
          </gux-modal-legacy>
        `
      },
      {
        description: 'should render modal with just left align buttons',
        html: `
          <gux-modal-legacy lang="en" size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
          </gux-modal-legacy>
        `
      },
      {
        description: 'should render modal with just right align buttons',
        html: `
          <gux-modal-legacy lang="en" size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="right-align-buttons">
              <gux-button accent="primary">Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
      },
      {
        description: 'should render small modal by default',
        html: `
          <gux-modal-legacy lang="en">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent="primary">Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-modal-legacy');

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
        <gux-modal-legacy lang="en" size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <div slot="left-align-buttons">
              <gux-button>Cancel</gux-button>
          </div>
          <div slot="right-align-buttons">
            <gux-button accent="primary">Accept</gux-button>
          </div>
        </gux-modal-legacy>
      `;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-modal-legacy');
      const dismissButtonElement = await element.find(
        'pierce/gux-dismiss-button'
      );
      const dismissButton = await dismissButtonElement.find('pierce/button');
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-modal-legacy')).not.toBeNull();

      await dismissButton.click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-modal-legacy')).toBeNull();
    });

    it('click dismiss button and prevent default', async () => {
      const html = `
        <gux-modal-legacy lang="en" size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <div slot="left-align-buttons">
              <gux-button>Cancel</gux-button>
          </div>
          <div slot="right-align-buttons">
            <gux-button accent="primary">Accept</gux-button>
          </div>
        </gux-modal-legacy>
      `;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-modal-legacy');
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
      expect(await page.find('gux-modal-legacy')).not.toBeNull();

      await dismissButton.click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      expect(await page.find('gux-modal-legacy')).not.toBeNull();
    });

    it('escape key dismiss', async () => {
      const html = `
        <gux-modal-legacy lang="en" size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <div slot="left-align-buttons">
              <gux-button>Cancel</gux-button>
          </div>
          <div slot="right-align-buttons">
            <gux-button accent="primary">Accept</gux-button>
          </div>
        </gux-modal-legacy>
      `;
      const page = await newSparkE2EPage({ html });
      const modalEl = await page.find('gux-modal-legacy');
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(modalEl).not.toBeNull();

      await page.keyboard.down('Escape');
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(await page.find('gux-modal-legacy')).toBeNull();
    });
  });

  describe('focus', () => {
    const focusModalHtml = (props = '') => `
      <gux-modal-legacy lang="en" size="small" trap-focus="true" ${props}>
        <div slot="title">Modal Title</div>
        <div slot="content">This contains the modal content.</div>
        <div slot="left-align-buttons">
            <gux-button id="cancel-button">Cancel</gux-button>
        </div>
        <div slot="right-align-buttons">
          <gux-button id="accept-button" accent="primary">Accept</gux-button>
        </div>
      </gux-modal-legacy>
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
          document.querySelector('gux-modal-legacy').shadowRoot.activeElement
            .textContent
      );
    const getFocusedShadowElementTagName = (page: E2EPage) =>
      page.evaluate(
        () =>
          document.querySelector('gux-modal-legacy').shadowRoot.activeElement
            .tagName
      );

    it('focuses the dismiss button by defualt', async () => {
      const page = await setupContainerPage(focusModalHtml());
      await page.click('#modal-trigger');
      await page.waitForChanges();

      expect(await page.find('gux-modal-legacy')).not.toBeNull();
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

      expect(await page.find('gux-modal-legacy')).not.toBeNull();
      expect(await getFocusedElementText(page)).toBe('Accept');
    });

    test('focuses the dismiss button if there are no other focusable elements', async () => {
      const page = await setupContainerPage(`
        <gux-modal-legacy lang="en" size="small">
          <div slot="content">This contains the modal content.</div>
        </gux-modal-legacy>
      `);
      await page.click('#modal-trigger');
      await page.waitForChanges();

      expect(await page.find('gux-modal-legacy')).not.toBeNull();
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
