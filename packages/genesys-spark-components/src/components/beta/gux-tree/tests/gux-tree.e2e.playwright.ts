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

  test.describe('#render', () => {
    test('should be accessible', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const tree = page.locator('gux-tree-beta');
      await expect(tree).toMatchAriaSnapshot(`
- tree:
  - treeitem "Projects":
    - button "Projects"
    - group:
      - treeitem "Project-1":
        - button "Project-1"
      - treeitem "Project-2":
        - button "Project-2"
  - treeitem "Reports":
    - button "Reports"
    - group:
      - treeitem "2025":
        - button "2025"
        - group:
          - treeitem "doc 1":
            - button "doc 1"
          - treeitem "doc 2":
            - button "doc 2"
          - treeitem "doc 3":
            - button "doc 3"
      - treeitem "2024":
        - button "2024"
        - group
  - treeitem "Untitled Documents":
    - button "Untitled Documents"`);
    });
  });
});
