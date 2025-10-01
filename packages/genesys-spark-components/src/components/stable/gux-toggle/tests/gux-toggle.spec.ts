import { checkRenders, newSpecPage } from '@test/specTestUtils';
import { GuxToggle } from '../gux-toggle';
import { GuxToggleSlider } from '../gux-toggle-slider/gux-toggle-slider';

import { renderConfigs } from './gux-toggle.common';

const components = [GuxToggle, GuxToggleSlider];
const language = 'en';

describe('gux-toggle', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });

  describe('User Interactions', () => {
    [
      {
        name: 'clicked',
        userInteraction: (element: HTMLElement) => element.click()
      },
      {
        name: 'Space is pressed',
        userInteraction: (element: HTMLElement) =>
          element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
      }
    ].forEach(({ name, userInteraction }) => {
      describe(name, () => {
        it(`should not fire a check event when an enabled toggle is disabled and ${name}`, async () => {
          const html = '<gux-toggle disabled label="On""></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          const checkSpy = jest.fn();

          element.addEventListener('check', checkSpy);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(checkSpy).not.toHaveBeenCalled();
        });

        it(`should fire a check event when an enabled toggle is ${name}`, async () => {
          const html = '<gux-toggle label="On"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          const checkSpy = jest.fn();

          element.addEventListener('check', checkSpy);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(checkSpy).toHaveBeenCalled();
        });

        it(`should check an unchecked toggle when ${name}`, async () => {
          const html = '<gux-toggle label="On"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          expect(element.checked).toBe(false);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(element.checked).toBe(true);
        });

        it(`should uncheck a checked toggle when ${name}`, async () => {
          const html = '<gux-toggle checked label="On"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          expect(element.checked).toBe(true);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(element.checked).toBe(false);
        });

        it(`should not check an unchecked toggle when disabled and ${name}`, async () => {
          const html = '<gux-toggle disabled label="On"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          expect(element.checked).toBe(false);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(element.checked).toBe(false);
        });

        it(`should not uncheck a checked toggle when disabled and ${name}`, async () => {
          const html = '<gux-toggle checked disabled label="On"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          expect(element.checked).toBe(true);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(element.checked).toBe(true);
        });
      });
    });
  });

  // remove deprecated props COMUI-3368
  describe('User Interactions (deprecated checked and unchecked label)', () => {
    [
      {
        name: 'clicked',
        userInteraction: (element: HTMLElement) => element.click()
      },
      {
        name: 'Space is pressed',
        userInteraction: (element: HTMLElement) =>
          element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
      }
    ].forEach(({ name, userInteraction }) => {
      describe(name, () => {
        it(`should not fire a check event when an enabled toggle is disabled and ${name}`, async () => {
          const html =
            '<gux-toggle disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          const checkSpy = jest.fn();

          element.addEventListener('check', checkSpy);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(checkSpy).not.toHaveBeenCalled();
        });

        it(`should fire a check event when an enabled toggle is ${name}`, async () => {
          const html =
            '<gux-toggle checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          const checkSpy = jest.fn();

          element.addEventListener('check', checkSpy);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(checkSpy).toHaveBeenCalled();
        });

        it(`should check an unchecked toggle when ${name}`, async () => {
          const html =
            '<gux-toggle checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          expect(element.checked).toBe(false);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(element.checked).toBe(true);
        });

        it(`should uncheck a checked toggle when ${name}`, async () => {
          const html =
            '<gux-toggle checked checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          expect(element.checked).toBe(true);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(element.checked).toBe(false);
        });

        it(`should not check an unchecked toggle when disabled and ${name}`, async () => {
          const html =
            '<gux-toggle disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          expect(element.checked).toBe(false);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(element.checked).toBe(false);
        });

        it(`should not uncheck a checked toggle when disabled and ${name}`, async () => {
          const html =
            '<gux-toggle checked disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const toggleSlider =
            element.shadowRoot.querySelector('gux-toggle-slider');
          expect(element.checked).toBe(true);

          userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(element.checked).toBe(true);
        });
      });
    });
  });

  describe('testing aria-label functionality', () => {
    it('should set aria-label on toggle slider when label is provided on gux-toggle', async () => {
      const html = '<gux-toggle label="Dark Mode"></gux-toggle>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxToggleElement;
      const toggleSlider = element.shadowRoot.querySelector(
        'gux-toggle-slider .gux-toggle-slider'
      );

      expect(toggleSlider.getAttribute('aria-label')).toBe('Dark Mode');
    });

    it('should update aria-label when label changes', async () => {
      const html = '<gux-toggle label="Dark Mode"></gux-toggle>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxToggleElement;
      const toggleSlider = element.shadowRoot.querySelector(
        'gux-toggle-slider .gux-toggle-slider'
      );

      expect(toggleSlider.getAttribute('aria-label')).toBe('Dark Mode');

      element.label = 'Light Mode';
      await page.waitForChanges();

      expect(toggleSlider.getAttribute('aria-label')).toBe('Light Mode');
    });
  });
});
