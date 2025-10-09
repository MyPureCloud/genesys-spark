import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfig, renderConfigs } from './gux-tree-multi.common';

test.describe('gux-tree-multi', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-tree-multi-beta',
      skip: true
    });
  });

  test('should be accessible', async ({ page }) => {
    await setContent(page, renderConfig.html);

    const tree = page.locator('gux-tree-multi-beta');
    await expect(tree).toMatchAriaSnapshot(`
- tree:
  - treeitem "Select branch Projects":
    - checkbox "Select branch"
    - text: Projects
  - treeitem "Select branch Reports":
    - checkbox "Select branch"
    - text: Reports
  - treeitem "Select item Untitled Documents":
    - checkbox "Select item"
    - text: Untitled Documents`);
  });

  test.describe('keyboard navigation', () => {
    test('should navigate with arrow keys', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch-multi').first();
      await firstBranch.focus();

      // Arrow down should move to next item
      await page.keyboard.press('ArrowDown');
      await expect(page.locator('[tabindex="0"]')).toHaveCount(1);
      await expect(page.locator('gux-branch-multi').nth(1)).toHaveAttribute(
        'tabindex',
        '0'
      );

      // Arrow up should move to previous item
      await page.keyboard.press('ArrowUp');
      await expect(page.locator('[tabindex="0"]')).toHaveCount(1);
      await expect(page.locator('gux-branch-multi').first()).toHaveAttribute(
        'tabindex',
        '0'
      );
    });

    test('should navigate to first and last items with Home/End', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch-multi').first();
      await firstBranch.focus();

      // End should move to last item
      await page.keyboard.press('End');
      await expect(page.locator('[tabindex="0"]')).toHaveCount(1);
      await expect(page.locator('gux-leaf-multi').last()).toHaveAttribute(
        'tabindex',
        '0'
      );

      // Home should move to first item
      await page.keyboard.press('Home');
      await expect(page.locator('[tabindex="0"]')).toHaveCount(1);
      await expect(page.locator('gux-branch-multi').first()).toHaveAttribute(
        'tabindex',
        '0'
      );
    });

    test('should expand/collapse branches with arrow keys', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch-multi').first();
      await firstBranch.focus();

      // Right arrow should expand branch
      await page.keyboard.press('ArrowRight');
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'true');

      // Left arrow should collapse branch
      await page.keyboard.press('ArrowLeft');
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'false');
    });

    test('should handle Enter and Space keys for multi-selection', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch-multi').first();
      await firstBranch.focus();

      // Enter key should toggle selection
      await page.keyboard.press('Enter');
      await expect(firstBranch).toHaveAttribute('aria-selected', 'true');

      // Space key should also toggle selection
      await page.keyboard.press(' ');
      await expect(firstBranch).toHaveAttribute('aria-selected', 'false');
    });
  });

  test.describe('mouse interactions', () => {
    test('should expand/collapse branches on click', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const firstBranch = page.locator('gux-branch-multi').first();

      // Initially collapsed
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'false');

      // Click should expand branch
      await firstBranch.click();
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'true');
    });

    test('should handle multi-selection on leaf clicks', async ({ page }) => {
      await setContent(
        page,
        `
        <gux-tree-multi-beta>
          <gux-branch-multi value="projects" expanded>
            <div slot="label">Projects</div>
            <gux-leaf-multi value="project1">
              <div slot="label">Project-1</div>
            </gux-leaf-multi>
            <gux-leaf-multi value="project2">
              <div slot="label">Project-2</div>
            </gux-leaf-multi>
          </gux-branch-multi>
        </gux-tree-multi-beta>
      `
      );

      // First expand the branch to make leaves visible
      const leaf1 = page.locator('gux-leaf-multi[value="project1"]');
      const leaf2 = page.locator('gux-leaf-multi[value="project2"]');

      await leaf1.click();
      await leaf2.click();

      await expect(leaf1).toHaveAttribute('aria-selected', 'true');
      await expect(leaf2).toHaveAttribute('aria-selected', 'true');

      // Verify the tree value contains both selections
      const treeValue = await page
        .locator('gux-tree-multi-beta')
        .evaluate(el => (el as HTMLGuxTreeMultiBetaElement).value);
      expect(treeValue).toContain('project1');
      expect(treeValue).toContain('project2');
    });

    test.skip('should handle branch selection affecting children', async ({
      page
    }) => {
      await setContent(
        page,
        `
        <gux-tree-multi-beta>
          <gux-branch-multi value="projects" expanded>
            <div slot="label">Projects</div>
            <gux-leaf-multi value="project1">
              <div slot="label">Project-1</div>
            </gux-leaf-multi>
            <gux-leaf-multi value="project2">
              <div slot="label">Project-2</div>
            </gux-leaf-multi>
          </gux-branch-multi>
        </gux-tree-multi-beta>
      `
      );

      const branch = page.locator('gux-branch-multi[value="projects"]');
      const leaf1 = page.locator('gux-leaf-multi[value="project1"]');
      const leaf2 = page.locator('gux-leaf-multi[value="project2"]');

      await branch.click();

      await expect(branch).toHaveAttribute('aria-selected', 'true');
      await expect(leaf1).toHaveAttribute('aria-selected', 'true');
      await expect(leaf2).toHaveAttribute('aria-selected', 'true');
    });
  });

  test.describe('tree structure', () => {
    test('should have correct ARIA roles', async ({ page }) => {
      await setContent(page, renderConfig.html);

      await expect(page.locator('gux-tree-multi-beta')).toHaveAttribute(
        'role',
        'tree'
      );
      await expect(page.locator('gux-branch-multi').first()).toHaveAttribute(
        'role',
        'treeitem'
      );
      await expect(page.locator('gux-leaf-multi').first()).toHaveAttribute(
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

      const firstBranch = page.locator('gux-branch-multi').first();

      // Initially collapsed
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'false');

      // Expand and check
      await firstBranch.click();
      await expect(firstBranch).toHaveAttribute('aria-expanded', 'true');
    });

    test('should support multiselectable attribute', async ({ page }) => {
      await setContent(page, renderConfig.html);

      await expect(page.locator('gux-tree-multi-beta')).toHaveAttribute(
        'aria-multiselectable',
        'true'
      );
    });
  });

  test.describe('value handling', () => {
    test('should emit input and change events on selection', async ({
      page
    }) => {
      await setContent(
        page,
        `
        <gux-tree-multi-beta>
          <gux-branch-multi>
            <div slot="label">Projects</div>
            <gux-leaf-multi value="project1">
              <div slot="label">Project-1</div>
            </gux-leaf-multi>
          </gux-branch-multi>
        </gux-tree-multi-beta>
      `
      );

      // Set up event listeners
      await page.evaluate(() => {
        window['inputEventFired'] = false;
        window['changeEventFired'] = false;
        const tree = document.querySelector('gux-tree-multi-beta');
        tree.addEventListener('input', () => {
          window['inputEventFired'] = true;
        });
        tree.addEventListener('change', () => {
          window['changeEventFired'] = true;
        });
      });

      // Expand branch and click leaf
      const firstBranch = page.locator('gux-branch-multi').first();
      await firstBranch.click();

      const leaf = page.locator('gux-leaf-multi').first();
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

    test('should handle comma-separated values', async ({ page }) => {
      await setContent(
        page,
        `
        <gux-tree-multi-beta value="project1,project2">
          <gux-branch-multi value="projects">
            <div slot="label">Projects</div>
            <gux-leaf-multi value="project1">
              <div slot="label">Project-1</div>
            </gux-leaf-multi>
            <gux-leaf-multi value="project2">
              <div slot="label">Project-2</div>
            </gux-leaf-multi>
          </gux-branch-multi>
        </gux-tree-multi-beta>
      `
      );

      // Verify the tree has the initial value
      const treeValue = await page
        .locator('gux-tree-multi-beta')
        .evaluate(el => (el as HTMLGuxTreeMultiBetaElement).value);
      expect(treeValue).toContain('project1');
      expect(treeValue).toContain('project2');
    });
  });

  test.describe('indeterminate state', () => {
    test.skip('should show indeterminate state when some children are selected', async ({
      page
    }) => {
      await setContent(
        page,
        `
        <gux-tree-multi-beta>
          <gux-branch-multi value="projects">
            <div slot="label">Projects</div>
            <gux-leaf-multi value="project1">
              <div slot="label">Project-1</div>
            </gux-leaf-multi>
            <gux-leaf-multi value="project2">
              <div slot="label">Project-2</div>
            </gux-leaf-multi>
          </gux-branch-multi>
        </gux-tree-multi-beta>
      `
      );

      const branch = page.locator('gux-branch-multi[value="projects"]');

      // Expand branch first
      await branch.click();

      // Select only one child
      const leaf1 = page.locator('gux-leaf-multi[value="project1"]');
      await leaf1.click();

      // Branch should show indeterminate state via checkbox
      const branchCheckbox = branch.locator('> div input[type="checkbox"]');
      const isIndeterminate = await branchCheckbox.evaluate(
        (el: HTMLInputElement) => el.indeterminate
      );
      expect(isIndeterminate).toBe(true);
    });
  });
});
