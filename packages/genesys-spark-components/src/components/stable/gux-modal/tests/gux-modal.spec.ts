import { newSpecPage } from '@test/specTestUtils';
import { GuxButton } from '../../gux-button/gux-button';
import { GuxModal } from '../gux-modal';
import { GuxDismissButton } from '../../gux-dismiss-button/gux-dismiss-button';
import { MockHTMLElement } from '@stencil/core/mock-doc';
import { SpecPage } from '@stencil/core/internal';

const components = [GuxButton, GuxModal, GuxDismissButton];
const language = 'en';

//Mocks
const showModal = jest.fn();
const close = jest.fn();

describe('gux-modal', () => {
  beforeAll(() => {
    // Required until JSDOM supports the dialog element. See:
    // https://github.com/jsdom/jsdom/issues/3294
    // https://github.com/jsdom/jsdom/pull/3403
    Object.assign(MockHTMLElement.prototype, {
      showModal: showModal,
      close: close
    });
  });

  beforeEach(() => {
    showModal.mockReset();
    close.mockReset();
  });

  it('Should open when rendered with an open attribute', async () => {
    await modalPage(openModal);

    expect(showModal).toHaveBeenCalled();
  });

  it('Should not open when rendered without an open attribute', async () => {
    await modalPage(closedModal);

    expect(showModal).not.toHaveBeenCalled();
  });

  it('Should close when the open property is set to false', async () => {
    const page = await modalPage(openModal);

    page.rootInstance.open = false;
    expect(close).toHaveBeenCalled();
  });

  it('Should open when the open property is set to true', async () => {
    const page = await modalPage(closedModal);

    page.rootInstance.open = true;
    expect(showModal).toHaveBeenCalled();
  });

  it('Should keep the open property in sync when opened/closed via mehtod', async () => {
    const page = await modalPage(closedModal);
    const modal = page.rootInstance;

    expect(modal.open).toBe(false);

    modal.showModal();
    expect(modal.open).toBe(true);

    modal.close();
    expect(modal.open).toBe(false);
  });

  describe('#render', () => {
    [
      {
        description: 'should render small modal',
        html: `
          <gux-modal size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent='primary'><button>Accept</button></gux-button-slot>
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
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent='primary'><button>Accept</button></gux-button-slot>
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
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent='primary'><button>Accept</button></gux-button-slot>
            </div>
          </gux-modal>
        `
      },
      {
        description: 'should render modal without a title',
        html: `
          <gux-modal size="large">
            <div slot="content">This contains the modal content.</div>
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent='primary'><button>Accept</button></gux-button-slot>
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
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
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
            <div slot="end-align-buttons">
              <gux-button-slot accent='primary'><button>Accept</button></gux-button-slot>
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
            <div slot="start-align-buttons">
                <gux-button id="cancelButton">Cancel</gux-button>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent='primary'><button>Accept</button></gux-button-slot>
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
            <div slot="start-align-buttons">
                <gux-button-slot><button>Cancel</button></gux-button-slot>
            </div>
            <div slot="end-align-buttons">
              <gux-button-slot accent='primary'><button>Accept</button></gux-button-slot>
            </div>
          </gux-modal>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxModal);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});

const openModal = `
  <gux-modal size="small" open>
    <div slot="content">This contains the modal content.</div>
  </gux-modal>`;

const closedModal = `
  <gux-modal size="small">
    <div slot="content">This contains the modal content.</div>
  </gux-modal>`;

async function modalPage(html: string): Promise<SpecPage> {
  return await newSpecPage({ components, html, language });
}
