import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-modal.common';

test.describe('gux-modal', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-modal'
  });

  test.describe('dismiss', () => {
    test('click dismiss button', async ({ page }) => {
      const html = `
        <gux-button id="openModalButton" onclick="document.getElementById('example1').showModal()">
          Open
        </gux-button>
        <gux-modal id="example1" lang="en" size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <gux-cta-group slot="footer" align="end">
            <gux-button slot="primary">Primary</gux-button>
            <gux-button slot="dismiss">Cancel</gux-button>
          </gux-cta-group>
        </gux-modal>
      `;
      await setContent(page, html);

      const element = page.locator('gux-modal');
      const openModalButton = page.locator('#openModalButton');

      await openModalButton.click();
      await page.waitForChanges();

      const dismissButtonElement = element.locator('gux-dismiss-button');

      const dismissButton = dismissButtonElement.locator('button');
      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      await dismissButton.click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).toHaveReceivedEvent();
      expect(page.locator('gux-modal')).not.toBeNull();
    });

    test('escape key dismiss', async ({ page }) => {
      const html = `
        <gux-modal id="example1" lang="en" size="small" open>
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <gux-cta-group slot="footer" align="end">
            <gux-button slot="primary">Primary</gux-button>
            <gux-button slot="dismiss">Cancel</gux-button>
          </gux-cta-group>
        </gux-modal>
      `;
      await setContent(page, html);

      const guxdismissSpy = await page.spyOnEvent('guxdismiss');

      expect(guxdismissSpy).not.toHaveReceivedEvent();

      const dialog = page.locator('dialog');
      await dialog.waitFor({ state: 'visible' });

      await page.keyboard.down('Escape');
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();

      await dialog.waitFor({ state: 'hidden' });
    });
  });

  test.describe('focus', () => {
    test('focuses the dismiss button by default', async ({ page }) => {
      const html = `
        <gux-modal id="example1" lang="en" size="small" open>
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <gux-cta-group slot="footer" align="end">
            <gux-button slot="primary">Primary</gux-button>
            <gux-button slot="dismiss">Cancel</gux-button>
          </gux-cta-group>
        </gux-modal>
      `;
      await setContent(page, html);

      const dialog = page.locator('dialog');
      await dialog.waitFor({ state: 'visible' });

      await expect(page.locator('gux-dismiss-button')).toBeFocused();
    });
    test('can focus a specific focusable element', async ({ page }) => {
      const html = `
        <gux-modal id="example1" lang="en" size="small" open>
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <gux-cta-group slot="footer" align="end">
            <gux-button-slot slot="primary">
              <button type="button" autofocus>Primary</button>
            </gux-button-slot>
            <gux-button slot="dismiss">Cancel</gux-button>
          </gux-cta-group>
        </gux-modal>
      `;
      await setContent(page, html);

      const dialog = page.locator('dialog');
      await dialog.waitFor({ state: 'visible' });
      await expect(page.locator('*:focus')).toHaveText('Primary');
    });

    test('focuses the dismiss button if there are no other focusable elements', async ({
      page
    }) => {
      const html = `
        <gux-modal id="example1" lang="en" size="small" open>
          <div slot="content">This contains the modal content.</div>
        </gux-modal>
      `;
      await setContent(page, html);

      const dialog = page.locator('dialog');
      await dialog.waitFor({ state: 'visible' });

      await expect(page.locator('gux-dismiss-button')).toBeFocused();
    });

    test('returns focus to the originally focused element when the modal closes', async ({
      page
    }) => {
      const html = `
        <gux-button-slot>
          <button id="openModalButton" tyep="button" onclick="document.getElementById('example1').showModal()">Open Modal</button>
        </gux-button-slot>
        <gux-modal id="example1" lang="en" size="small">
          <div slot="title">Modal Title</div>
          <div slot="content">This contains the modal content.</div>
          <gux-cta-group slot="footer" align="end">
            <gux-button slot="primary">Primary</gux-button>
            <gux-button slot="dismiss">Cancel</gux-button>
          </gux-cta-group>
        </gux-modal>
      `;
      await setContent(page, html);

      const openModalButton = page.locator('#openModalButton');
      await openModalButton.click();
      await page.waitForChanges();

      await expect(page.locator('gux-dismiss-button')).toBeFocused();

      await page.keyboard.down('Escape');
      await page.waitForChanges();

      await expect(page.locator('*:focus')).toHaveText('Open Modal');
    });
  });
});
