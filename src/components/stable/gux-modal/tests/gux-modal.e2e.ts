import { newE2EPage } from '@stencil/core/testing';

describe('gux-modal', () => {
  describe('#render', () => {
    [
      {
        description: 'should render small modal',
        html: `
          <gux-modal lang="en" size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button title="Cancel">Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button title='Button' accent='primary'>Accept</gux-button>
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
            <div slot="left-align-buttons">
                <gux-button title="Cancel">Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button title='Button' accent='primary'>Accept</gux-button>
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
            <div slot="left-align-buttons">
                <gux-button title="Cancel">Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button title='Button' accent='primary'>Accept</gux-button>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render modal without a title',
        html: `
          <gux-modal lang="en" size="large">
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button title="Cancel">Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button title='Button' accent='primary'>Accept</gux-button>
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
            <div slot="left-align-buttons">
                <gux-button title="Cancel">Cancel</gux-button>
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
            <div slot="right-align-buttons">
              <gux-button title='Button' accent='primary'>Accept</gux-button>
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
            <div slot="left-align-buttons">
                <gux-button title="Cancel">Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button title='Button' accent='primary'>Accept</gux-button>
            </div>
          </gux-modal>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newE2EPage({ html });
        const element = await page.find('gux-modal');

        expect(element.outerHTML).toMatchSnapshot();

        element.setAttribute('hidden', true);
        await page.waitForChanges();

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
          <div slot="left-align-buttons">
              <gux-button title="Cancel">Cancel</gux-button>
          </div>
          <div slot="right-align-buttons">
            <gux-button title='Button' accent='primary'>Accept</gux-button>
          </div>
        </gux-modal>
      `;
      const page = await newE2EPage({ html });
      const element = await page.find('gux-modal');
      const dismissButton = await page.find('.gux-dismiss-button');
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
          <div slot="left-align-buttons">
              <gux-button title="Cancel">Cancel</gux-button>
          </div>
          <div slot="right-align-buttons">
            <gux-button title='Button' accent='primary'>Accept</gux-button>
          </div>
        </gux-modal>
      `;
      const page = await newE2EPage({ html });
      const element = await page.find('gux-modal');
      const dismissButton = await page.find('.gux-dismiss-button');
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
  });
});
