import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfig, renderConfigs } from './gux-tree.common';

test.describe('gux-tree', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-tree-beta'
    });
  });

  test('should be accessible', async ({ page }) => {
    await setContent(page, renderConfig.html);

    const tree = page.locator('gux-tree-beta');
    await expect(tree).toMatchAriaSnapshot(`
- tree:
  - treeitem "Projects"
  - treeitem "Reports"
  - treeitem "Untitled Documents"`);
  });

  // TODO: Below tests are AI generated and have not been fully reviewed yet.
  test.describe('keyboard navigation', () => {
    test('should navigate with arrow keys', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch').first();
      await firstBranch.focus();

      // Arrow down should move to next item
      await page.keyboard.press('ArrowDown');
      await expect(page.locator('[tabindex="0"]')).toHaveCount(1);
      await expect(page.locator('gux-branch').nth(1)).toHaveAttribute(
        'tabindex',
        '0'
      );

      // Arrow up should move to previous item
      await page.keyboard.press('ArrowUp');
      await expect(page.locator('[tabindex="0"]')).toHaveCount(1);
      await expect(page.locator('gux-branch').first()).toHaveAttribute(
        'tabindex',
        '0'
      );
    });

    test('should navigate to first and last items with Home/End', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch').first();
      await firstBranch.focus();

      // End should move to last item
      await page.keyboard.press('End');
      await expect(page.locator('[tabindex="0"]')).toHaveCount(1);
      await expect(page.locator('gux-leaf').last()).toHaveAttribute(
        'tabindex',
        '0'
      );

      // Home should move to first item
      await page.keyboard.press('Home');
      await expect(page.locator('[tabindex="0"]')).toHaveCount(1);
      await expect(page.locator('gux-branch').first()).toHaveAttribute(
        'tabindex',
        '0'
      );
    });

    test('should expand/collapse branches with arrow keys', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch').first();
      await firstBranch.focus();

      // Right arrow should expand branch
      await page.keyboard.press('ArrowRight');
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'true');

      // Left arrow should collapse branch
      await page.keyboard.press('ArrowLeft');
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'false');
    });

    test('should handle Enter key on branches', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch').first();
      await firstBranch.focus();

      // Enter key should trigger selection logic
      await page.keyboard.press('Enter');
      await expect(page.locator('[tabindex="0"]')).toHaveCount(1);
      await expect(firstBranch).toHaveAttribute('tabindex', '0');
    });
  });

  test.describe('mouse interactions', () => {
    test('should expand/collapse branches on click', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch').first();

      // Click should expand branch
      await firstBranch.click();
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'true');

      // Click again should collapse branch
      await firstBranch.click();
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'false');
    });

    test('should handle leaf clicks', async ({ page }) => {
      await setContent(
        page,
        `
        <gux-tree-beta>
          <gux-branch>
            <div slot="label">Projects</div>
            <gux-leaf value="project1">
              <div slot="label">Project-1</div>
            </gux-leaf>
          </gux-branch>
        </gux-tree-beta>
      `
      );

      // First expand the branch to make leaf visible
      const firstBranch = page.locator('gux-branch').first();
      await firstBranch.click();

      const leaf = page.locator('gux-leaf').first();
      await leaf.click();

      // Verify the tree value was set
      const treeValue = await page
        .locator('gux-tree-beta')
        .evaluate(el => (el as HTMLGuxTreeBetaElement).value);
      expect(treeValue).toBe('project1');
    });
  });

  test.describe('tree structure', () => {
    test('should have correct ARIA roles', async ({ page }) => {
      await setContent(page, renderConfig.html);

      await expect(page.locator('gux-tree-beta')).toHaveAttribute(
        'role',
        'tree'
      );
      await expect(page.locator('gux-branch').first()).toHaveAttribute(
        'role',
        'treeitem'
      );
      await expect(page.locator('gux-leaf').first()).toHaveAttribute(
        'role',
        'treeitem'
      );
    });

    test('should have correct tabindex management', async ({ page }) => {
      await setContent(page, renderConfig.html);

      // Only one item should be focusable initially
      const focusableItems = page.locator('[tabindex="0"]');
      await expect(focusableItems).toHaveCount(1);
    });

    test('should update aria-expanded for branches', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch').first();

      // Initially collapsed
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'false');

      // Expand and check
      await firstBranch.click();
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test.describe('value handling', () => {
    test('should emit input and change events on leaf selection', async ({
      page
    }) => {
      await setContent(
        page,
        `
        <gux-tree-beta>
          <gux-branch>
            <div slot="label">Projects</div>
            <gux-leaf value="project1">
              <div slot="label">Project-1</div>
            </gux-leaf>
          </gux-branch>
        </gux-tree-beta>
      `
      );

      // Set up event listeners
      await page.evaluate(() => {
        window['inputEventFired'] = false;
        window['changeEventFired'] = false;
        const tree = document.querySelector('gux-tree-beta');
        tree.addEventListener('input', () => {
          window['inputEventFired'] = true;
        });
        tree.addEventListener('change', () => {
          window['changeEventFired'] = true;
        });
      });

      // Expand branch and click leaf
      const firstBranch = page.locator('gux-branch').first();
      await firstBranch.click();

      const leaf = page.locator('gux-leaf').first();
      await leaf.click();

      const inputEventFired = await page.evaluate(
        () => window['inputEventFired']
      );
      const changeEventFired = await page.evaluate(
        () => window['changeEventFired']
      );

      expect(inputEventFired).toBe(true);
      expect(changeEventFired).toBe(true);
    });
  });
});
