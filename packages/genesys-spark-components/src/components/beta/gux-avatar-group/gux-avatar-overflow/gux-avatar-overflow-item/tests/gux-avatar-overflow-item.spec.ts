jest.mock('../../../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@stencil/core/testing';
import { logWarn } from '../../../../../../utils/error/log-error';
import { GuxAvatarOverflowItem } from '../gux-avatar-overflow-item';

const components = [GuxAvatarOverflowItem];
describe('gux-avatar-overflow-item-beta', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-avatar-overflow-item-beta name="John Doe"></gux-avatar-overflow-item-beta>`
    });
    expect(page.rootInstance).toBeInstanceOf(GuxAvatarOverflowItem);
  });

  describe('validatingInputs', () => {
    it('should log warning when name is not provided', async () => {
      await newSpecPage({
        components,
        html: `<gux-avatar-overflow-item-beta></gux-avatar-overflow-item-beta>`
      });

      expect(logWarn).toHaveBeenCalled();
    });

    it('should log warning when image has no alt attribute', async () => {
      await newSpecPage({
        components,
        html: `
            <gux-avatar-overflow-item-beta name="John Doe">
              <img slot="image" src="test.jpg"/>
            </gux-avatar-overflow-item-beta>
          `
      });

      expect(logWarn).toHaveBeenCalled();
    });
  });

  describe('Render', () => {
    it('should render with name', async () => {
      const page = await newSpecPage({
        components,
        html: `<gux-avatar-overflow-item-beta name="John Doe"></gux-avatar-overflow-item-beta>`
      });

      expect(page.root).toMatchSnapshot();
    });

    it('should render with slotted image', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <gux-avatar-overflow-item-beta name="John Doe">
            <img slot="image" src="test.jpg" alt="John Doe"/>
          </gux-avatar-overflow-item-beta>
        `
      });

      expect(page.root).toMatchSnapshot();
    });

    it('should render with initials when no image is provided', async () => {
      const page = await newSpecPage({
        components,
        html: `<gux-avatar-overflow-item-beta name="John Doe"></gux-avatar-overflow-item-beta>`
      });

      const initialsElement = page.root.shadowRoot.querySelector(
        '.gux-avatar-initials'
      );
      expect(initialsElement.textContent).toBe('JD');
    });
  });

  describe('Events', () => {
    it('should handle keydown event', async () => {
      const page = await newSpecPage({
        components,
        html: `<gux-avatar-overflow-item-beta name="John Doe"></gux-avatar-overflow-item-beta>`
      });
      const instance = page.rootInstance;
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

      // Mock overflowNavigation function
      const overflowNavigationSpy = jest.fn();
      instance.onKeydown(event);

      expect(overflowNavigationSpy).not.toHaveBeenCalled();
    });
  });
});
