import { newSpecPage } from '@test/specTestUtils';
import { GuxButton } from '../../gux-button/gux-button';
import { GuxModal } from '../gux-modal';
import { GuxDismissButton } from '../../gux-dismiss-button/gux-dismiss-button';

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
