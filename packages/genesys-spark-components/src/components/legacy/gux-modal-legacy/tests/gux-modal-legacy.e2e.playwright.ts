import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfig, renderConfigs } from './gux-modal-legacy.common';

test.describe('gux-modal-legacy', () => {
  test.describe('#render', () => {
    checkRenders(renderConfigs, 'gux-modal-legacy');
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

  // test.describe('focus', () => {
  //   const focusModalHtml = (props = '') => `
  //     <gux-modal-legacy lang="en" size="small" trap-focus="true" ${props}>
  //       <div slot="title">Modal Title</div>
  //       <div slot="content">This contains the modal content.</div>
  //       <div slot="left-align-buttons">
  //           <gux-button id="cancel-button">Cancel</gux-button>
  //       </div>
  //       <div slot="right-align-buttons">
  //         <gux-button id="accept-button" accent="primary">Accept</gux-button>
  //       </div>
  //     </gux-modal-legacy>
  //   `;
  //   const modalContainerHtml = `
  //     <div id="modal-container"></div>
  //     <button id="other-button">Do Nothing</button>
  //     <button id="modal-trigger">Open Modal</button>
  //   `;
  //   const setupContainerPage = async (modalHtml: string) => {
  //     const page = await newNonrandomE2EPage({ html: modalContainerHtml });

  //     await page.evaluate(html => {
  //       document
  //         .getElementById('modal-trigger')
  //         ?.addEventListener('click', () => {
  //           if (document.getElementById('modal-container'))
  //             document.getElementById('modal-container').innerHTML = html;
  //         });
  //     }, modalHtml);
  //     return page;
  //   };

  //   const getFocusedElementText = (page: E2EPage) =>
  //     page.evaluate(() => document.activeElement.textContent);
  //   const getFocusedShadowElementText = (page: E2EPage) =>
  //     page.evaluate(
  //       () =>
  //         document.querySelector('gux-modal-legacy').shadowRoot.activeElement
  //           .textContent
  //     );
  //   const getFocusedShadowElementTagName = (page: E2EPage) =>
  //     page.evaluate(
  //       () =>
  //         document.querySelector('gux-modal-legacy').shadowRoot.activeElement
  //           .tagName
  //     );

  //   test('focuses the dismiss button by defualt', async ({ page }) => {
  //     const page = await setupContainerPage(focusModalHtml());
  //     await page.click('#modal-trigger');
  //     await page.waitForChanges();

  //     expect(await page.find('gux-modal-legacy')).not.toBeNull();
  //     expect(await getFocusedShadowElementText(page)).toBe('');
  //     expect(await getFocusedShadowElementTagName(page)).toBe(
  //       'GUX-DISMISS-BUTTON'
  //     );
  //   });

  //   test('can focus a specific focusable element', async ({ page }) => {
  //     const page = await setupContainerPage(
  //       focusModalHtml('initial-focus="#accept-button"')
  //     );
  //     await page.click('#modal-trigger');
  //     await page.waitForChanges();

  //     expect(await page.find('gux-modal-legacy')).not.toBeNull();
  //     expect(await getFocusedElementText(page)).toBe('Accept');
  //   });

  //   test('focuses the dismiss button if there are no other focusable elements', async ({ page }) => {
  //     const page = await setupContainerPage(`
  //       <gux-modal-legacy lang="en" size="small">
  //         <div slot="content">This contains the modal content.</div>
  //       </gux-modal-legacy>
  //     `);
  //     await page.click('#modal-trigger');
  //     await page.waitForChanges();

  //     expect(await page.find('gux-modal-legacy')).not.toBeNull();
  //     expect(await getFocusedShadowElementText(page)).toBe('');
  //     expect(await getFocusedShadowElementTagName(page)).toBe(
  //       'GUX-DISMISS-BUTTON'
  //     );
  //   });

  //   test('traps focus in the modal', async ({ page }) => {
  //     const page = await setupContainerPage(focusModalHtml());
  //     await page.click('#modal-trigger');
  //     await page.waitForChanges();

  //     expect(await getFocusedShadowElementText(page)).toBe('');
  //     expect(await getFocusedShadowElementTagName(page)).toBe(
  //       'GUX-DISMISS-BUTTON'
  //     );

  //     await page.keyboard.press('Tab');

  //     expect(await getFocusedElementText(page)).toBe('Cancel');

  //     await page.keyboard.press('Tab');

  //     expect(await getFocusedElementText(page)).toBe('Accept');

  //     await page.keyboard.press('Tab');

  //     expect(await getFocusedShadowElementText(page)).toBe('');
  //     expect(await getFocusedShadowElementTagName(page)).toBe(
  //       'GUX-DISMISS-BUTTON'
  //     );

  //     await page.keyboard.down('Shift');
  //     await page.keyboard.press('Tab');

  //     expect(await getFocusedShadowElementText(page)).toBe('');
  //     expect(await getFocusedShadowElementTagName(page)).toBe(
  //       'GUX-DISMISS-BUTTON'
  //     );
  //   });

  //   test('returns focus to the originally focused element when the modal closes', async ({ page }) => {
  //     const page = await setupContainerPage(focusModalHtml());

  //     await page.click('#modal-trigger');
  //     await page.waitForChanges();

  //     expect(await getFocusedShadowElementText(page)).toBe('');
  //     expect(await getFocusedShadowElementTagName(page)).toBe(
  //       'GUX-DISMISS-BUTTON'
  //     );

  //     await page.keyboard.down('Escape');
  //     await page.waitForChanges();

  //     expect(await getFocusedElementText(page)).toBe('Open Modal');
  //   });
  // });
});
