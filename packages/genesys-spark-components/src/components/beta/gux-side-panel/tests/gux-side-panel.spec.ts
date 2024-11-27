import { newSpecPage } from '@test/specTestUtils';
import { MockHTMLElement } from '@stencil/core/mock-doc';
import { GuxSidePanel } from '../gux-side-panel';
import { GuxSidePanelHeading } from '../components/gux-side-panel-heading/gux-side-panel-heading';
import { GuxModalSidePanel } from '../components/gux-modal-side-panel/gux-modal-side-panel';

describe('gux-side-panel-beta', () => {
  it.each(['small', 'medium', 'large'])(
    'renders correctly with %s size',
    async size => {
      const page = await newSpecPage({
        components: [GuxSidePanel, GuxSidePanelHeading],
        html: `
        <gux-side-panel-beta size="${size}">
          <gux-side-panel-heading
            slot="heading"
            level="3"
            icon-name="fa/diamond-regular"
          >
            Side panel title
          </gux-side-panel-heading>
          <h2 slot="description">Description goes here</h2>
          <div slot="content">
            Content goes here.
          </div>
          <div slot="footer">
            <gux-cta-group>
              <gux-button slot="primary">Primary</gux-button>
              <gux-button slot="secondary">Secondary</gux-button>
              <gux-button slot="dismiss">Dismiss</gux-button>
            </gux-cta-group>
          </div>
        </gux-side-panel-beta>
      `
      });

      expect(page.root).toMatchSnapshot();
    }
  );

  it.each([1, 2, 3, 4, 5, 6])(
    'renders correctly with h%d heading level',
    async headingLevel => {
      const page = await newSpecPage({
        components: [GuxSidePanel, GuxSidePanelHeading],
        html: `
        <gux-side-panel-beta size="medium">
          <gux-side-panel-heading
            slot="heading"
            level="${headingLevel}"
            icon-name="fa/diamond-regular"
          >
            Side panel title
          </gux-side-panel-heading>
          <h2 slot="description">Description goes here</h2>
          <div slot="content">
            Content goes here.
          </div>
          <div slot="footer">
            <gux-cta-group>
              <gux-button slot="primary">Primary</gux-button>
              <gux-button slot="secondary">Secondary</gux-button>
              <gux-button slot="dismiss">Dismiss</gux-button>
            </gux-cta-group>
          </div>
        </gux-side-panel-beta>
      `
      });

      expect(page.root).toMatchSnapshot();
    }
  );

  it('emits sidePanelDismiss event when dismissed', async () => {
    const page = await newSpecPage({
      components: [GuxSidePanel, GuxSidePanelHeading],
      html: `
        <gux-side-panel-beta>
          <gux-side-panel-heading
            slot="heading"
            level="3"
            icon-name="fa/diamond-regular"
          >
            Side panel title
          </gux-side-panel-heading
          <div slot="description">Description</div>
          <div slot="content">Content</div>
          <div slot="footer">Footer</div>
        </gux-side-panel-beta>
      `
    });

    const dismissButton =
      page.root.shadowRoot.querySelector('gux-dismiss-button');

    const eventSpy = jest.fn();
    page.root.addEventListener('sidePanelDismiss', eventSpy);

    dismissButton.click();
    expect(eventSpy).toHaveBeenCalled();
  });
});

const showModal = jest.fn();
const close = jest.fn();

describe('gux-modal-side-panel-beta', () => {
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

  it.each([true, false])('renders correctly when open is %p', async open => {
    const page = await newSpecPage({
      components: [GuxModalSidePanel, GuxSidePanel, GuxSidePanelHeading],
      html: `
          <gux-modal-side-panel-beta ${open ? 'open' : ''}>
            <gux-side-panel-heading
              slot="heading"
              level="2"
              icon-name="fa/diamond-regular"
            >
              Side panel title
            </gux-side-panel-heading>
            <h2 slot="description">Description goes here</h2>
            <div slot="content">
              Content goes here.
            </div>
            <div slot="footer">
              <gux-cta-group>
                <gux-button slot="primary">Primary</gux-button>
                <gux-button slot="secondary">Secondary</gux-button>
                <gux-button slot="dismiss">Dismiss</gux-button>
              </gux-cta-group>
            </div>
          </gux-modal-side-panel-beta>
        `
    });

    expect(page.root).toMatchSnapshot();
  });

  it.each(['small', 'medium', 'large'])(
    'renders correctly with %s size',
    async size => {
      const page = await newSpecPage({
        components: [GuxModalSidePanel, GuxSidePanel, GuxSidePanelHeading],
        html: `
        <gux-modal-side-panel-beta size="${size}">
          <gux-side-panel-heading
            slot="heading"
            level="2"
            icon-name="fa/diamond-regular"
          >
            Side panel title
          </gux-side-panel-heading>
          <h2 slot="description">Description goes here</h2>
          <div slot="content">
            Content goes here.
          </div>
          <div slot="footer">
            <gux-cta-group>
              <gux-button slot="primary">Primary</gux-button>
              <gux-button slot="secondary">Secondary</gux-button>
              <gux-button slot="dismiss">Dismiss</gux-button>
            </gux-cta-group>
          </div>
        </gux-modal-side-panel-beta>
      `
      });

      expect(page.root).toMatchSnapshot();
    }
  );

  it('closes the modal side panel when the escape key is pressed', async () => {
    const page = await newSpecPage({
      components: [GuxModalSidePanel, GuxSidePanel, GuxSidePanelHeading],
      html: `
        <gux-modal-side-panel-beta open>
          <gux-side-panel-heading
            slot="heading"
            level="2"
            icon-name="fa/diamond-regular"
          >
            Side panel title
          </gux-side-panel-heading>
          <h2 slot="description">Description goes here</h2>
          <div slot="content">
            Content goes here.
          </div>
          <div slot="footer">
            <gux-cta-group>
              <gux-button slot="primary">Primary</gux-button>
              <gux-button slot="secondary">Secondary</gux-button>
              <gux-button slot="dismiss">Dismiss</gux-button>
            </gux-cta-group>
          </div>
        </gux-modal-side-panel-beta>
      `
    });

    const eventSpy = jest.fn();
    page.root.addEventListener('modalSidePanelDismiss', eventSpy);

    const event = new KeyboardEvent('keydown', {
      key: 'Escape'
    });
    page.root.dispatchEvent(event);
    await page.waitForChanges();
    expect(eventSpy).toHaveBeenCalled();
  });

  it('should call showModal & close methods when called', async () => {
    const page = await newSpecPage({
      components: [GuxModalSidePanel, GuxSidePanel, GuxSidePanelHeading],
      html: `
        <gux-modal-side-panel-beta>
          <gux-side-panel-heading
            slot="heading"
            level="2"
            icon-name="fa/diamond-regular"
          >
            Side panel title
          </gux-side-panel-heading>
          <h2 slot="description">Description goes here</h2>
          <div slot="content">
            Content goes here.
          </div>
          <div slot="footer">
            <gux-cta-group>
              <gux-button slot="primary">Primary</gux-button>
              <gux-button slot="secondary">Secondary</gux-button>
              <gux-button slot="dismiss">Dismiss</gux-button>
            </gux-cta-group>
          </div>
        </gux-modal-side-panel-beta>
      `
    });

    const eventSpy = jest.fn();
    page.root.addEventListener('modalSidePanelDismiss', eventSpy);

    page.rootInstance.showModal();
    expect(showModal).toHaveBeenCalled();
    expect(eventSpy).not.toHaveBeenCalled();

    page.rootInstance.close();
    expect(close).toHaveBeenCalled();
    expect(eventSpy).toHaveBeenCalled();
  });
});
