import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

async function newNonrandomE2EPage({
  html
}: {
  html: string;
}): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(html);
  await page.waitForChanges();

  return page;
}

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
      describe(description, () => {
        it('snapshot', async () => {
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-modal');

          expect(element.outerHTML).toMatchSnapshot();

          element.setAttribute('hidden', true);
          await page.waitForChanges();

          expect(element.outerHTML).toMatchSnapshot();
        });

        it('accessibility', async () => {
          const page = await newSparkE2EPage({ html });

          await a11yCheck(page);
        });
      });
    });
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = `
        <gux-button id="openModalButton" onclick="document.getElementById('example1').showModal()">
          Open
        </gux-button>
        <gux-modal id="example1" lang="en" size="small">
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
      const page = await newNonrandomE2EPage({ html });
      const element = await page.find('gux-modal');
      const openModalButton = await page.find('#openModalButton');

      await openModalButton.click();
      await page.waitForChanges();

      const dismissButtonElement = await element.find(
        'pierce/gux-dismiss-button'
      );

      const dismissButton = await dismissButtonElement.find('pierce/button');
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      await dismissButton.click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).toHaveReceivedEvent();
      expect(await page.find('gux-modal')).not.toBeNull();
    });

    it('escape key dismiss', async () => {
      const html = `
        <gux-button id="openModalButton" onclick="document.getElementById('example1').showModal()">
          Open
        </gux-button>
        <gux-modal id="example1" lang="en" size="small">
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
      const page = await newNonrandomE2EPage({ html });
      const openModalButton = await page.find('#openModalButton');

      await openModalButton.click();
      await page.waitForChanges();

      const guxdismissSpy = await page.spyOnEvent('guxdismiss');

      expect(guxdismissSpy).not.toHaveReceivedEvent();

      await page.waitForSelector('pierce/dialog', {
        visible: true
      });

      await page.keyboard.down('Escape');
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();

      await page.waitForSelector('pierce/dialog', {
        visible: false
      });
    });
  });

  describe('focus', () => {
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
    it('focuses the dismiss button by default ', async () => {
      const html = `
        <gux-button id="openModalButton" onclick="document.getElementById('example1').showModal()">
          Open
        </gux-button>
        <gux-modal id="example1" lang="en" size="small">
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
      const page = await newNonrandomE2EPage({ html });
      await page.click('#openModalButton');
      await page.waitForChanges();

      await page.waitForSelector('pierce/dialog', {
        visible: true
      });
      expect(await getFocusedShadowElementText(page)).toBe('');
      expect(await getFocusedShadowElementTagName(page)).toBe(
        'GUX-DISMISS-BUTTON'
      );
    });
    test('can focus a specific focusable element', async () => {
      const html = `
        <gux-button id="openModalButton" onclick="document.getElementById('example1').showModal()">
          Open
        </gux-button>
        <gux-modal id="example1" lang="en" size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <div slot="start-align-buttons">
              <gux-button-slot><button>Cancel</button></gux-button-slot>
          </div>
          <div slot="end-align-buttons">
            <gux-button-slot accent="primary"><button autofocus>Accept</button></gux-button-slot>
          </div>
        </gux-modal>
      `;
      const page = await newNonrandomE2EPage({ html });

      await page.click('#openModalButton');
      await page.waitForChanges();
      await page.waitForSelector('pierce/dialog', {
        visible: true
      });

      expect(await getFocusedElementText(page)).toBe('Accept');
    });

    test('focuses the dismiss button if there are no other focusable elements', async () => {
      const html = `
        <gux-button id="openModalButton" onclick="document.getElementById('example1').showModal()">
          Open
        </gux-button>
        <gux-modal id="example1" lang="en" size="small">
          <div slot="content">This contains the modal content.</div>
        </gux-modal>
      `;
      const page = await newNonrandomE2EPage({ html });

      await page.click('#openModalButton');
      await page.waitForChanges();

      await page.waitForSelector('pierce/dialog', {
        visible: true
      });
      expect(await getFocusedShadowElementText(page)).toBe('');
      expect(await getFocusedShadowElementTagName(page)).toBe(
        'GUX-DISMISS-BUTTON'
      );
    });

    test('returns focus to the originally focused element when the modal closes', async () => {
      const html = `
        <gux-button id="openModalButton" onclick="document.getElementById('example1').showModal()">Open Modal</gux-button>
        <gux-modal id="example1" lang="en" size="small">
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
      const page = await newNonrandomE2EPage({ html });

      await page.click('#openModalButton');
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
