jest.mock('../../../../../utils/error/log-error.ts', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@stencil/core/testing';
import { GuxAvatarOverflow } from '../gux-avatar-overflow';
import { GuxAvatarOverflowItem } from '../gux-avatar-overflow-item/gux-avatar-overflow-item';

const components = [GuxAvatarOverflow, GuxAvatarOverflowItem];

describe('gux-avatar-overflow-beta', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  afterAll(() => {
    delete global.ResizeObserver;
    jest.clearAllTimers();
  });

  it('should build', async () => {
    const html = `
      <gux-avatar-overflow-beta>
        <gux-avatar-overflow-item-beta>
          <img src="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" alt="John Smith" />
        </gux-avatar-overflow-item-beta>
        <gux-avatar-overflow-item-beta>
          <img src="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" alt="Jane Smith" />
        </gux-avatar-overflow-item-beta>
        <gux-avatar-overflow-item-beta>
          <img src="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" alt="John Doe" />
        </gux-avatar-overflow-item-beta>
      </gux-avatar-overflow-beta>
    `;
    const page = await newSpecPage({ components, html, language: 'en' });

    expect(page.rootInstance).toBeInstanceOf(GuxAvatarOverflow);
    expect(page.root).toMatchSnapshot();
  });

  describe('#render', () => {
    [
      {
        description: 'should render 3 avatars',
        html: `
          <gux-avatar-overflow-beta>
            <gux-avatar-overflow-item-beta>
              <img src="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" alt="John Smith" />
            </gux-avatar-overflow-item-beta>
            <gux-avatar-overflow-item-beta>
              <img src="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" alt="Jane Smith" />
            </gux-avatar-overflow-item-beta>
            <gux-avatar-overflow-item-beta>
              <img src="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" alt="John Doe" />
            </gux-avatar-overflow-item-beta>
          </gux-avatar-overflow-beta>
        `,
        expectedAvatarCount: 3
      },
      {
        description: 'should render 2 avatars',
        html: `
          <gux-avatar-overflow-beta>
            <gux-avatar-overflow-item-beta>
              <img src="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" alt="John Smith" />
            </gux-avatar-overflow-item-beta>
            <gux-avatar-overflow-item-beta>
              <img src="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" alt="Jane Smith" />
            </gux-avatar-overflow-item-beta>
          </gux-avatar-overflow-beta>
        `,
        expectedAvatarCount: 2
      },
      {
        description: 'should render 1 avatar',
        html: `
          <gux-avatar-overflow-beta>
            <gux-avatar-overflow-item-beta>
              <img src="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" alt="John Smith" />
            </gux-avatar-overflow-item-beta>
          </gux-avatar-overflow-beta>
        `,
        expectedAvatarCount: 1
      },
      {
        description: 'should render 0 avatars',
        html: `
          <gux-avatar-overflow-beta>
          </gux-avatar-overflow-beta>
        `,
        expectedAvatarCount: 0
      }
    ].forEach(({ description, html, expectedAvatarCount }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language: 'en' });

        const avatarOverflowItems = page.root.querySelectorAll(
          'gux-avatar-overflow-item-beta'
        );
        expect(avatarOverflowItems.length).toBe(expectedAvatarCount);
        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('interactions', () => {
    beforeEach(() => {
      jest.useFakeTimers({ legacyFakeTimers: true });
    });

    it('should toggle menu on button click', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <gux-avatar-overflow-beta>
            <gux-avatar-overflow-item-beta>Item 1</gux-avatar-overflow-item-beta>
          </gux-avatar-overflow-beta>
        `
      });

      const component = page.rootInstance;
      const button = page.root.shadowRoot.querySelector('button');

      expect(component.expanded).toBe(false);

      button.click();
      await page.waitForChanges();
      expect(component.expanded).toBe(true);

      button.click();
      jest.advanceTimersByTime(300);
      await page.waitForChanges();
      expect(component.expanded).toBe(false);
    });

    it('should close menu on Escape key', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <gux-avatar-overflow-beta>
            <gux-avatar-overflow-item-beta>Item 1</gux-avatar-overflow-item-beta>
          </gux-avatar-overflow-beta>
        `
      });

      const component = page.rootInstance;
      component.expanded = true;
      await page.waitForChanges();

      page.root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      jest.advanceTimersByTime(300);
      await page.waitForChanges();
      expect(component.expanded).toBe(false);
    });

    it('should close menu on Tab key', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <gux-avatar-overflow-beta>
            <gux-avatar-overflow-item-beta>Item 1</gux-avatar-overflow-item-beta>
          </gux-avatar-overflow-beta>
        `
      });

      const component = page.rootInstance;
      component.expanded = true;
      await page.waitForChanges();

      page.root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      jest.advanceTimersByTime(300);
      await page.waitForChanges();
      expect(component.expanded).toBe(false);
    });

    it('should close menu on Tab key', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <gux-avatar-overflow-beta>
            <gux-avatar-overflow-item-beta>Item 1</gux-avatar-overflow-item-beta>
          </gux-avatar-overflow-beta>
        `
      });

      const component = page.rootInstance;
      component.expanded = true;
      await page.waitForChanges();

      page.root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      jest.advanceTimersByTime(300);
      await page.waitForChanges();
      expect(component.expanded).toBe(false);
    });

    it('should close menu on click of a slotted overflow-item', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <gux-avatar-overflow-beta>
            <gux-avatar-overflow-item-beta>Item 1</gux-avatar-overflow-item-beta>
          </gux-avatar-overflow-beta>
        `
      });

      const component = page.rootInstance;
      component.expanded = true;
      await page.waitForChanges();

      const overflowItem = page.root.querySelector(
        'gux-avatar-overflow-item-beta'
      );
      overflowItem.click();
      jest.advanceTimersByTime(300);
      await page.waitForChanges();
      expect(component.expanded).toBe(false);
    });

    it('should navigate between menu items using keyboard', async () => {
      const page = await newSpecPage({
        components,
        html: `
      <gux-avatar-overflow-beta>
        <gux-avatar-overflow-item-beta>Item 1</gux-avatar-overflow-item-beta>
        <gux-avatar-overflow-item-beta>Item 2</gux-avatar-overflow-item-beta>
      </gux-avatar-overflow-beta>
    `
      });

      const component = page.rootInstance;
      component.expanded = true;
      await page.waitForChanges();

      const items = page.root.querySelectorAll('gux-avatar-overflow-item-beta');
      const firstItem = items[0] as HTMLGuxAvatarOverflowItemBetaElement;
      const secondItem = items[1] as HTMLGuxAvatarOverflowItemBetaElement;

      const firstItemMockFocus = jest.fn();
      const secondItemMockFocus = jest.fn();

      Object.defineProperty(firstItem, 'focus', {
        value: firstItemMockFocus,
        writable: true
      });

      Object.defineProperty(secondItem, 'focus', {
        value: secondItemMockFocus,
        writable: true
      });

      // Press down arrow key - should focus second item
      firstItem.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      await page.waitForChanges();
      expect(secondItemMockFocus).toHaveBeenCalled();

      // Press up arrow key - should focus first item again
      secondItem.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
      );
      await page.waitForChanges();
      expect(firstItemMockFocus).toHaveBeenCalledTimes(1);

      // press up arrow on first item should focus last item
      firstItem.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
      );
      await page.waitForChanges();
      expect(secondItemMockFocus).toHaveBeenCalledTimes(2);

      // press down arrow on last item should focus first item
      secondItem.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      await page.waitForChanges();
      expect(firstItemMockFocus).toHaveBeenCalledTimes(2);

      // press end key on first item should focus last item
      firstItem.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'End', bubbles: true })
      );
      await page.waitForChanges();
      expect(secondItemMockFocus).toHaveBeenCalledTimes(3);

      // press home key on last item should focus first item
      secondItem.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
      );
      await page.waitForChanges();
      expect(firstItemMockFocus).toHaveBeenCalledTimes(3);
    });
  });
});
