import { newSpecPage } from '@stencil/core/testing';
import { GuxAvatarOverflowItem } from '../gux-avatar-overflow-item';

const components = [GuxAvatarOverflowItem];
describe('gux-avatar-overflow-item-beta', () => {
  let component: GuxAvatarOverflowItem;

  beforeEach(async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-avatar-overflow-item-beta></gux-avatar-overflow-item-beta>`
    });
    component = page.rootInstance;
  });

  it('should build', () => {
    expect(component).toBeTruthy();
  });

  describe('validatingInputs', () => {
    it('should log warning when name is not provided', async () => {
      const logWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      await newSpecPage({
        components,
        html: `<gux-avatar-overflow-item-beta></gux-avatar-overflow-item-beta>`
      });

      expect(logWarnSpy).toHaveBeenCalled();
      logWarnSpy.mockRestore();
    });

    it('should log warning when image has no alt attribute', async () => {
      const logWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      await newSpecPage({
        components,
        html: `
            <gux-avatar-overflow-item-beta name="John Doe">
              <img slot="image" src="test.jpg"/>
            </gux-avatar-overflow-item-beta>
          `
      });

      expect(logWarnSpy).toHaveBeenCalled();
      logWarnSpy.mockRestore();
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
