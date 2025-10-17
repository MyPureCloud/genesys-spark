import { newSpecPage } from '@test/specTestUtils';
import { GuxSidePanelHeaderMini } from '../gux-side-panel-header-mini';
import { GuxButton } from '../../../../../stable/gux-button/gux-button';
import { GuxIcon } from '../../../../../stable/gux-icon/gux-icon';
import { GuxDismissButton } from '../../../../../stable/gux-dismiss-button/gux-dismiss-button';
import { GuxSidePanel } from '../../../gux-side-panel';

const components = [
  GuxSidePanelHeaderMini,
  GuxButton,
  GuxIcon,
  GuxDismissButton,
  GuxSidePanel
];
const language = 'en';

describe('gux-side-panel-header-mini', () => {
  describe('#render', () => {
    it('should build', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxSidePanel);
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');
      expect(headerMini).toBeTruthy();
    });

    it('should render with default props', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });

    it('should render with expand prop set to false', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header" expand="false">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });

    it('should render with expand prop set to true', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header" expand="true">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });

    it('should render slotted content', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            <span>Custom Mini Header Content</span>
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });

    it('should render with icon slot', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            <gux-icon slot="icon" icon-name="user" decorative></gux-icon>
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });

    it('should render with icon and custom content', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            <gux-icon slot="icon" icon-name="settings" decorative></gux-icon>
            <span>Settings Panel</span>
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('icon slot', () => {
    it('should render icon when icon slot is provided', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            <gux-icon slot="icon" icon-name="user" decorative></gux-icon>
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');

      const iconContainer = headerMini.shadowRoot.querySelector('.icon');
      expect(iconContainer).toBeTruthy();

      const iconSlot = iconContainer.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeTruthy();
    });

    it('should not render icon container when no icon slot is provided', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');

      const iconContainer = headerMini.shadowRoot.querySelector('.icon');
      expect(iconContainer).toBeFalsy();
    });

    it('should render multiple icons in icon slot', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            <div slot="icon">
              <gux-icon icon-name="user" decorative></gux-icon>
              <gux-icon icon-name="star" decorative></gux-icon>
            </div>
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('role attribute', () => {
    it('should have role="banner" set via attachInternals', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');

      // The role is set via attachInternals, which sets the role on the element
      expect(headerMini.getAttribute('role')).toBe('banner');
    });
  });

  describe('expand button', () => {
    it('should render an expand button', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');

      const expandButton = headerMini.shadowRoot.querySelector('gux-button');
      expect(expandButton).toBeTruthy();
      expect(expandButton.getAttribute('accent')).toBe('ghost');
    });

    it('should render expand icon within button', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');

      const expandIcon = headerMini.shadowRoot.querySelector('gux-icon');
      expect(expandIcon).toBeTruthy();
      expect(expandIcon.getAttribute('icon-name')).toBe('expand');
      expect(expandIcon.getAttribute('size')).toBe('small');
      expect(expandIcon.getAttribute('decorative')).toBe('true');
    });
  });

  describe('dismiss button', () => {
    it('should render a dismiss button', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');

      const dismissButton =
        headerMini.shadowRoot.querySelector('gux-dismiss-button');
      expect(dismissButton).toBeTruthy();
      expect(dismissButton.getAttribute('position')).toBe('inherit');
      expect(dismissButton.getAttribute('size')).toBe('small');
    });
  });

  describe('events', () => {
    it('should emit sidePanelDismiss event when dismiss button is clicked', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');

      const eventSpy = jest.fn();
      headerMini.addEventListener('sidePanelDismiss', eventSpy);

      const dismissButton =
        headerMini.shadowRoot.querySelector('gux-dismiss-button');
      dismissButton.click();

      expect(eventSpy).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('parent interaction', () => {
    it('should call hideDismissButton on parent side panel when connected', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });

      // When gux-side-panel-header-mini is connected, it should hide the parent's dismiss button
      const dismissButton =
        page.root.shadowRoot.querySelector('gux-dismiss-button');
      expect(dismissButton).toBeFalsy();
    });
  });

  describe('structure', () => {
    it('should have correct DOM structure', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');

      const container = headerMini.shadowRoot.querySelector(
        '.gux-side-panel-header-mini'
      );
      expect(container).toBeTruthy();

      const title = headerMini.shadowRoot.querySelector(
        '.gux-side-panel-header-mini-title'
      );
      expect(title).toBeTruthy();

      const actions = headerMini.shadowRoot.querySelector(
        '.gux-side-panel-header-mini-actions'
      );
      expect(actions).toBeTruthy();
    });

    it('should render title content in slot', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Test Title Content
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');

      const titleSlot = headerMini.shadowRoot.querySelector(
        '.gux-side-panel-header-mini-title slot:not([name])'
      );
      expect(titleSlot).toBeTruthy();
    });

    it('should have correct structure with icon', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            <gux-icon slot="icon" icon-name="user" decorative></gux-icon>
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector('gux-side-panel-header-mini');

      const titleContainer = headerMini.shadowRoot.querySelector(
        '.gux-side-panel-header-mini-title'
      );
      expect(titleContainer).toBeTruthy();

      const iconContainer = titleContainer.querySelector('.icon');
      expect(iconContainer).toBeTruthy();

      const iconSlot = iconContainer.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeTruthy();

      const titleSlot = titleContainer.querySelector('slot:not([name])');
      expect(titleSlot).toBeTruthy();
    });
  });

  describe('props', () => {
    it('should have expand prop default to false', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector(
        'gux-side-panel-header-mini'
      ) as HTMLGuxSidePanelHeaderMiniElement;

      expect(headerMini.expand).toBe(false);
    });

    it('should allow expand prop to be set to true', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header" expand="true">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector(
        'gux-side-panel-header-mini'
      ) as HTMLGuxSidePanelHeaderMiniElement;

      expect(headerMini.expand).toBe(true);
    });

    it('should update when expand prop is changed', async () => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-header-mini slot="header">
            Mini Header Title
          </gux-side-panel-header-mini>
        </gux-side-panel-beta>
      `;
      const page = await newSpecPage({ components, html, language });
      const headerMini = page.root.querySelector(
        'gux-side-panel-header-mini'
      ) as HTMLGuxSidePanelHeaderMiniElement;

      expect(headerMini.expand).toBe(false);

      headerMini.expand = true;
      await page.waitForChanges();

      expect(headerMini.expand).toBe(true);
    });
  });
});
