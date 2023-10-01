import { newSpecPage } from '@test/specTestUtils';
import { GuxButton } from '../../gux-button/gux-button';
import { GuxModal } from '../gux-modal';
import { GuxDismissButton } from '../../../stable/gux-dismiss-button/gux-dismiss-button';

const components = [GuxButton, GuxModal, GuxDismissButton];
const language = 'en';

describe('gux-modal', () => {
  describe('#render', () => {
    [
      {
        description: 'should render small modal',
        html: `
          <gux-modal size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render medium modal',
        html: `
          <gux-modal size="medium">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render large modal',
        html: `
          <gux-modal size="large">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render modal without a title',
        html: `
          <gux-modal size="large">
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render modal without buttons',
        html: `
          <gux-modal size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
          </gux-modal>
        `
      },
      {
        description: 'should render modal with just left align buttons',
        html: `
          <gux-modal size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render modal with just right align buttons',
        html: `
          <gux-modal size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal>
        `
      },
      {
        description:
          'should render modal with a specified initial focus element',
        html: `
          <gux-modal initial-focus="#cancelButton">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button id="cancelButton">Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render small modal by default',
        html: `
          <gux-modal>
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxModal);

        expect(page.root).toMatchSnapshot();

        (page.rootInstance as HTMLGuxModalElement).hidden = true;
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        // Disconnect so that the focus trap is properly cleaned up
        page.root.remove();
      });
    });
  });

  describe('dismiss', () => {
    it('click dismiss button', async () => {
      const html = `
        <gux-modal size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <div slot="left-align-buttons">
              <gux-button>Cancel</gux-button>
          </div>
          <div slot="right-align-buttons">
            <gux-button accent='primary'>Accept</gux-button>
          </div>
        </gux-modal>
      `;
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const dismissButton =
        page.root.shadowRoot.querySelector('gux-dismiss-button');
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

      page.root.remove();
    });

    it('click dismiss button and prevent default', async () => {
      const html = `
        <gux-modal size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <div slot="left-align-buttons">
              <gux-button>Cancel</gux-button>
          </div>
          <div slot="right-align-buttons">
            <gux-button accent='primary'>Accept</gux-button>
          </div>
        </gux-modal>
      `;
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const dismissButton =
        page.root.shadowRoot.querySelector('gux-dismiss-button');
      const elementRemoveSpy = jest.spyOn(element, 'remove');

      page.win.addEventListener('guxdismiss', (event: Event) => {
        event.preventDefault();
      });

      dismissButton.click();
      await page.waitForChanges();

      expect(elementRemoveSpy).not.toBeCalled();

      page.root.remove();
    });
  });
});
