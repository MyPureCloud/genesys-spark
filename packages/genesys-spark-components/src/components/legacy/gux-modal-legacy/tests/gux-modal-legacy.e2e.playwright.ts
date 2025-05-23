import {
  checkRenders,
  E2EPage,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfig, renderConfigs } from './gux-modal-legacy.common';

test.describe('gux-modal-legacy', () => {
  test.describe('#render', () => {
    checkRenders({ renderConfigs, element: 'gux-modal-legacy' });
  });

  test.describe('#interactions', () => {
    test('click dismiss button', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(page.locator('[slot="content"]')).toBeVisible();

      await page.locator('gux-dismiss-button').locator('button').click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(page.locator('[slot="content"]')).not.toBeVisible();
    });

    test('click dismiss button and prevent default', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      await page.evaluate(() => {
        document.addEventListener('guxdismiss', event => {
          event.preventDefault();
        });
      });

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(page.locator('[slot="content"]')).toBeVisible();

      await page.locator('gux-dismiss-button').locator('button').click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(page.locator('[slot="content"]')).toBeVisible();
    });

    test('escape key dismiss', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(page.locator('[slot="content"]')).toBeVisible();

      await page.locator('gux-modal-legacy').press('Escape');
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(page.locator('[slot="content"]')).not.toBeVisible();
    });
  });

  test.describe('#focus', () => {
    function getFocusModalHtml(props = '') {
      return `
        <gux-modal-legacy lang="en" size="small" trap-focus="true" ${props}>
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <div slot="left-align-buttons">
              <gux-button id="cancel-button">Cancel</gux-button>
          </div>
          <div slot="right-align-buttons">
            <gux-button id="accept-button" accent="primary">Accept</gux-button>
          </div>
        </gux-modal-legacy>
      `;
    }

    async function setupContainerPage(
      page: E2EPage,
      modalHtml: string
    ): Promise<void> {
      await setContent(
        page,
        `
        <div id="modal-container"></div>
        <button id="other-button">Do Nothing</button>
        <button id="modal-trigger">Open Modal</button>
      `
      );

      await page.evaluate(html => {
        document
          .getElementById('modal-trigger')
          ?.addEventListener('click', () => {
            document.getElementById('modal-container').innerHTML = html;
          });
      }, modalHtml);
    }

    test('focuses the dismiss button by defualt', async ({ page }) => {
      const focusModalHtml = getFocusModalHtml();
      await setupContainerPage(page, focusModalHtml);

      await page.locator('#modal-trigger').click();
      await page.waitForChanges();

      expect(page.locator('gux-modal-legacy')).not.toBeNull();
      await expect(page.locator('gux-dismiss-button')).toBeFocused();
    });

    test('can focus a specific focusable element', async ({ page }) => {
      const focusModalHtml = getFocusModalHtml(
        'initial-focus="#accept-button"'
      );
      await setupContainerPage(page, focusModalHtml);

      await page.locator('#modal-trigger').click();
      await page.waitForChanges();

      expect(page.locator('gux-modal-legacy')).not.toBeNull();
      await expect(page.getByText('Accept')).toBeFocused();
    });

    test('focuses the dismiss button if there are no other focusable elements', async ({
      page
    }) => {
      await setupContainerPage(
        page,
        `
        <gux-modal-legacy lang="en" size="small">
          <div slot="content">This contains the modal content.</div>
        </gux-modal-legacy>
      `
      );

      await page.locator('#modal-trigger').click();
      await page.waitForChanges();

      expect(page.locator('gux-modal-legacy')).not.toBeNull();
      await expect(page.locator('gux-dismiss-button')).toBeFocused();
    });

    test('traps focus in the modal', async ({ page }) => {
      const focusModalHtml = getFocusModalHtml();
      await setupContainerPage(page, focusModalHtml);

      await page.locator('#modal-trigger').click();
      await page.waitForChanges();

      await expect(page.locator('gux-dismiss-button')).toBeFocused();

      await page.keyboard.press('Tab');

      await expect(page.getByText('Cancel')).toBeFocused();

      await page.keyboard.press('Tab');

      await expect(page.getByText('Accept')).toBeFocused();

      await page.keyboard.press('Tab');

      await expect(page.locator('gux-dismiss-button')).toBeFocused();

      await page.keyboard.press('Shift+Tab');

      await expect(page.locator('gux-dismiss-button')).toBeFocused();
    });

    test('returns focus to the originally focused element when the modal closes', async ({
      page
    }) => {
      const focusModalHtml = getFocusModalHtml();
      await setupContainerPage(page, focusModalHtml);

      await page.locator('#modal-trigger').click();
      await page.waitForChanges();

      await expect(page.locator('gux-dismiss-button')).toBeFocused();

      await page.keyboard.press('Escape');
      await page.waitForChanges();

      await expect(page.getByText('Open Modal')).toBeFocused();
    });
  });
});
