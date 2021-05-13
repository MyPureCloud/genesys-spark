import { newSpecPage } from '@stencil/core/testing';
import { GuxToggle } from '../gux-toggle';
import { GuxToggleSlider } from '../gux-toggle-slider/gux-toggle-slider';

global.InputEvent = Event;

const components = [GuxToggle, GuxToggleSlider];
const language = 'en';

describe('gux-toggle', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-toggle></gux-toggle>`,
      language
    });

    expect(page.rootInstance).toBeInstanceOf(GuxToggle);
  });

  describe('#render', () => {
    [
      '<gux-toggle></gux-toggle>',
      '<gux-toggle checked></gux-toggle>',
      '<gux-toggle checked disabled></gux-toggle>',
      '<gux-toggle checked-label="On" unchecked-label="Off"></gux-toggle>',
      '<gux-toggle checked checked-label="on" unchecked-label="off"></gux-toggle>',
      `<gux-toggle
        checked-label="On"
        unchecked-label="Off"
        label-position="left"
      ></gux-toggle>`,
      `<gux-toggle
        checked
        checked-label="on"
        unchecked-label="off"
        label-position="right"
      ></gux-toggle>`,
      `<gux-toggle
        checked-label="This is a long label for the toggle to test how it works"
        unchecked-label="This is another long label for the toggle to test how it works"
        label-position="left"
      ></gux-toggle>`,
      `<gux-toggle
        checked
        checked-label="This is a long label for the toggle to test how it works"
        unchecked-label="This is another long label for the toggle to test how it works"
        label-position="right"
      ></gux-toggle>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('User Interactions', () => {
    [
      {
        name: 'clicked',
        userInteraction: (element: HTMLElement) => element.click()
      },
      {
        name: 'Enter is pressed',
        userInteraction: (element: HTMLElement) =>
          element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
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
          const checkSpy = jest.fn();

          element.addEventListener('check', checkSpy);

          userInteraction(element);
          await page.waitForChanges();

          expect(checkSpy).not.toHaveBeenCalled();
        });

        it(`should fire a check event when an enabled toggle is ${name}`, async () => {
          const html =
            '<gux-toggle checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;
          const checkSpy = jest.fn();

          element.addEventListener('check', checkSpy);

          userInteraction(element);
          await page.waitForChanges();

          expect(checkSpy).toHaveBeenCalled();
        });

        it(`should check an unchecked toggle when ${name}`, async () => {
          const html =
            '<gux-toggle checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;

          expect(element.checked).toBe(false);

          userInteraction(element);
          await page.waitForChanges();

          expect(element.checked).toBe(true);
        });

        it(`should uncheck a checked toggle when ${name}`, async () => {
          const html =
            '<gux-toggle checked checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;

          expect(element.checked).toBe(true);

          userInteraction(element);
          await page.waitForChanges();

          expect(element.checked).toBe(false);
        });

        it(`should not check an unchecked toggle when disabled and ${name}`, async () => {
          const html =
            '<gux-toggle disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;

          expect(element.checked).toBe(false);

          userInteraction(element);
          await page.waitForChanges();

          expect(element.checked).toBe(false);
        });

        it(`should not uncheck a checked toggle when disabled and ${name}`, async () => {
          const html =
            '<gux-toggle checked disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSpecPage({ components, html, language });
          const element = page.root as HTMLGuxToggleElement;

          expect(element.checked).toBe(true);

          userInteraction(element);
          await page.waitForChanges();

          expect(element.checked).toBe(true);
        });
      });
    });
  });
});
