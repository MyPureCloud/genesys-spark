import { E2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

async function clickButton(page: E2EPage, buttonToClick: 'previous' | 'next') {
  await page.evaluate(button => {
    const element = document.querySelector('gux-pagination-cursor');
    const [previousButton, nextButton] = Array.from(
      element.shadowRoot.querySelectorAll('button')
    );

    if (button === 'next') {
      nextButton.click();
    } else {
      previousButton.click();
    }
  }, buttonToClick);
}

describe('gux-pagination-cursor', () => {
  describe('#render', () => {
    [
      '<gux-pagination-cursor lang="en"></gux-pagination-cursor>',
      '<gux-pagination-cursor lang="en" has-next></gux-pagination-cursor>',
      '<gux-pagination-cursor lang="en" has-previous has-next></gux-pagination-cursor>',
      '<gux-pagination-cursor lang="en" has-previous></gux-pagination-cursor>',
      '<gux-pagination-cursor lang="en" layout="advanced"></gux-pagination-cursor>'
    ].forEach((html, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-pagination-cursor');
        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('guxPaginationCursorchange', () => {
    it('should fire guxPaginationCursorchange(previous) event when enabled previous button is clicked', async () => {
      const html =
        '<gux-pagination-cursor lang="en" has-previous></gux-pagination-cursor>';
      const page = await newSparkE2EPage({ html });
      const guxPaginationCursorchangeSpy = await page.spyOnEvent(
        'guxPaginationCursorchange'
      );

      await clickButton(page, 'previous');
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).toHaveReceivedEventDetail(
        'previous'
      );
    });

    it('should fire guxPaginationCursorchange(next) event when enabled next button is clicked', async () => {
      const html =
        '<gux-pagination-cursor lang="en" has-next></gux-pagination-cursor>';
      const page = await newSparkE2EPage({ html });
      const guxPaginationCursorchangeSpy = await page.spyOnEvent(
        'guxPaginationCursorchange'
      );

      await clickButton(page, 'next');
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).toHaveReceivedEventDetail('next');
    });

    it('should not fire guxPaginationCursorchange(previous) event when disabled previous button is clicked', async () => {
      const html = '<gux-pagination-cursor lang="en"></gux-pagination-cursor>';
      const page = await newSparkE2EPage({ html });
      const guxPaginationCursorchangeSpy = await page.spyOnEvent(
        'guxPaginationCursorchange'
      );

      await clickButton(page, 'previous');
      await page.waitForChanges();
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).not.toHaveReceivedEvent();
    });

    it('should not fire guxPaginationCursorchange(next) event when disabled next button is clicked', async () => {
      const html = '<gux-pagination-cursor lang="en"></gux-pagination-cursor>';
      const page = await newSparkE2EPage({ html });
      const guxPaginationCursorchangeSpy = await page.spyOnEvent(
        'guxPaginationCursorchange'
      );

      await clickButton(page, 'next');
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).not.toHaveReceivedEvent();
    });
  });
});
