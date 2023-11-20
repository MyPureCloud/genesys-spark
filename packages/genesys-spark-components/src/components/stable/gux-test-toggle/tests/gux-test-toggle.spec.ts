import { newSpecPage } from '@test/specTestUtils';
import { GuxTestToggle } from '../gux-test-toggle';

const components = [GuxTestToggle];
const language = 'en';

describe('gux-test-toggle', () => {
  describe('#render', () => {
    [
      `<gux-test-toggle></gux-test-toggle>`,
      `<gux-test-toggle label="Toggle Switch"></gux-test-toggle>`,
      `<gux-test-toggle error></gux-test-toggle>`,
      `<gux-test-toggle label="Toggle Switch" error></gux-test-toggle>`,
      `<gux-test-toggle disabled></gux-test-toggle>`,
      `<gux-test-toggle label="Toggle Switch" disabled></gux-test-toggle>`,
      `<gux-test-toggle label="Toggle Switch" message="Some helper text"></gux-test-toggle>`,
      `<gux-test-toggle message="Some helper text"></gux-test-toggle>`,
      `<gux-test-toggle message="Some helper text" error></gux-test-toggle>`,
      `<gux-test-toggle label="Toggle Switch" message="Some helper text" error></gux-test-toggle>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#interactions', () => {
    it(`should emit a toggleCheck event when clicked`, async () => {
      const html = `<gux-test-toggle label="Toggle Switch"></gux-test-toggle>`;
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const guxTestToggleSpan: HTMLSpanElement =
        element.shadowRoot.querySelector('.gux-test-toggle-slider span');
      const toggleCheckedEventSpy = jest.fn();

      page.win.addEventListener('toggleChecked', toggleCheckedEventSpy);

      guxTestToggleSpan.click();
      await page.waitForChanges();

      expect(toggleCheckedEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: true
        })
      );
    });
    it(`should emit a toggleCheck event when enter key is pressed`, async () => {
      const html = `<gux-test-toggle label="Toggle Switch"></gux-test-toggle>`;
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const toggleCheckedEventSpy = jest.fn();

      page.win.addEventListener('toggleChecked', toggleCheckedEventSpy);

      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();

      expect(toggleCheckedEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: true
        })
      );
    });
  });
});
