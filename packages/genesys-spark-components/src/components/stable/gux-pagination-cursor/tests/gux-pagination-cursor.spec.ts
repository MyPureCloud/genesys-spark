import { newSpecPage } from '@test/specTestUtils';
import { GuxPaginationCursor } from '../gux-pagination-cursor';

const components = [GuxPaginationCursor];
const language = 'en';

describe('gux-pagination-cursor', () => {
  describe('#render', () => {
    [
      '<gux-pagination-cursor controls="id1" label="Example label"></gux-pagination-cursor>',
      '<gux-pagination-cursor has-next controls="id2" label="Example label"></gux-pagination-cursor>',
      '<gux-pagination-cursor has-previous has-next controls="id3" label="Example label"></gux-pagination-cursor>',
      '<gux-pagination-cursor has-previous controls="id4" label="Example label"></gux-pagination-cursor>',
      '<gux-pagination-cursor layout="advanced" controls="id5" label="Example label"></gux-pagination-cursor>'
    ].forEach((html, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationCursor);
        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('guxPaginationCursorchange', () => {
    it('should fire guxPaginationCursorchange(previous) event when enabled previous button is clicked', async () => {
      const html =
        '<gux-pagination-cursor has-previous controls="previous" label="Example label"></gux-pagination-cursor>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const [previousButton] = Array.from(
        element.shadowRoot.querySelectorAll('button')
      ) as HTMLElement[];
      const guxPaginationCursorchangeSpy = jest.fn();

      page.win.addEventListener(
        'guxPaginationCursorchange',
        guxPaginationCursorchangeSpy
      );

      previousButton.click();
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).toHaveBeenCalledWith(
        expect.objectContaining({ detail: 'previous' })
      );
    });

    it('should fire guxPaginationCursorchange(next) event when enabled next button is clicked', async () => {
      const html =
        '<gux-pagination-cursor has-next controls="next" label="Example label"></gux-pagination-cursor>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const [, nextButton] = Array.from(
        element.shadowRoot.querySelectorAll('button')
      ) as HTMLElement[];
      const guxPaginationCursorchangeSpy = jest.fn();

      page.win.addEventListener(
        'guxPaginationCursorchange',
        guxPaginationCursorchangeSpy
      );

      nextButton.click();
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).toHaveBeenCalledWith(
        expect.objectContaining({ detail: 'next' })
      );
    });

    it('should not fire guxPaginationCursorchange(previous) event when disabled previous button is clicked', async () => {
      const html =
        '<gux-pagination-cursor controls="previous-disabled" label="Example label"></gux-pagination-cursor>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const [previousButton] = Array.from(
        element.shadowRoot.querySelectorAll('button')
      ) as HTMLElement[];
      const guxPaginationCursorchangeSpy = jest.fn();

      page.win.addEventListener(
        'guxPaginationCursorchange',
        guxPaginationCursorchangeSpy
      );

      previousButton.click();
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).not.toHaveBeenCalled();
    });

    it('should not fire guxPaginationCursorchange(next) event when disabled next button is clicked', async () => {
      const html =
        '<gux-pagination-cursor controls="next-disabled" label="Example label"></gux-pagination-cursor>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const [, nextButton] = Array.from(
        element.shadowRoot.querySelectorAll('button')
      ) as HTMLElement[];
      const guxPaginationCursorchangeSpy = jest.fn();

      page.win.addEventListener(
        'guxPaginationCursorchange',
        guxPaginationCursorchangeSpy
      );

      nextButton.click();
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).not.toHaveBeenCalled();
    });
  });
});
