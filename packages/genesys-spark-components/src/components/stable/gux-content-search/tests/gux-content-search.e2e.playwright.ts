import {
  checkRenders,
  test,
  AxeExclusion,
  expect,
  setContent
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-content-search.common';

const axeExclusions: AxeExclusion[] = [
  {
    issueId: 'target-size',
    target: 'gux-content-search,.gux-previous-button',
    exclusionReason:
      'COMUI-2945 Fix any of the following: Target has insufficient size (134px by 14px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 0px instead of at least 24px.'
  },
  {
    issueId: 'target-size',
    target: 'gux-content-search,.gux-next-button',
    exclusionReason:
      'COMUI-2945 Fix any of the following: Target has insufficient size (134px by 14px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 0px instead of at least 24px.'
  }
];

test.describe('gux-content-search', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-content-search',
    axeExclusions
  });

  test.describe('#clear button', () => {
    test('should only be displayed when input has content', async ({
      page
    }) => {
      await setContent(
        page,
        '<gux-content-search><input aria-label="Search" type="text"/></gux-content-search>'
      );

      const clearButton = page
        .locator('gux-content-search')
        .locator('.gux-clear-button');
      const input = page.locator('input');

      await expect(clearButton).toBeHidden();

      await input.fill('test content');
      await expect(clearButton).toBeVisible();

      await input.clear();
      await expect(clearButton).toBeHidden();
    });

    test('should not be disabled when input is disabled', async ({ page }) => {
      await setContent(
        page,
        `
        <gux-content-search lang="en" current-match="1" match-count="20" >
          <input type="text" disabled value="TEST" />
        </gux-content-search>`
      );

      const clearButton = page
        .locator('gux-content-search')
        .locator('.gux-clear-button');

      await expect(clearButton).toBeDisabled();
    });
  });

  test.describe('#navigation buttons', () => {
    test('should only be displayed when input has content', async ({
      page
    }) => {
      await setContent(
        page,
        '<gux-content-search lang="en" current-match="1" match-count="3"><input type="text"/></gux-content-search>'
      );

      const nextButton = page
        .locator('gux-content-search')
        .locator('.gux-next-button');
      const previousButton = page
        .locator('gux-content-search')
        .locator('.gux-previous-button');
      const input = page.locator('input');

      await expect(nextButton).toBeHidden();
      await expect(previousButton).toBeHidden();

      await input.fill('test content');
      await expect(nextButton).toBeVisible();
      await expect(previousButton).toBeVisible();

      await input.clear();
      await expect(nextButton).toBeHidden();
      await expect(previousButton).toBeHidden();
    });

    test('should be disabled when the match is zero', async ({ page }) => {
      await setContent(
        page,
        `
        <gux-content-search lang="en" current-match="0" match-count="0">
          <input type="text" value="Test"/>
        </gux-content-search>
      `
      );

      const nextButton = page
        .locator('gux-content-search')
        .locator('.gux-next-button');
      const previousButton = page
        .locator('gux-content-search')
        .locator('.gux-previous-button');

      await expect(nextButton).toBeVisible();
      await expect(previousButton).toBeVisible();
      await expect(nextButton).toBeDisabled();
      await expect(previousButton).toBeDisabled();
    });

    test('should not be disabled when input is disabled', async ({ page }) => {
      await setContent(
        page,
        `
        <gux-content-search lang="en" current-match="1" match-count="20" >
          <input type="text" disabled value="TEST" />
        </gux-content-search>`
      );

      const nextButton = page
        .locator('gux-content-search')
        .locator('.gux-next-button');
      const previousButton = page
        .locator('gux-content-search')
        .locator('.gux-previous-button');

      await expect(nextButton).toBeVisible();
      await expect(previousButton).toBeVisible();
      await expect(nextButton).toBeDisabled();
      await expect(previousButton).toBeDisabled();
    });
  });
});
