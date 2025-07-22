import {
  checkRenders,
  setContent,
  test,
  expect
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-sort-control.common';

test.describe('gux-sort-control', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-sort-control'
  });

  test.describe('User Interactions', () => {
    test('should emit guxsortchanged event when clicked', async ({ page }) => {
      const html = `
                <gux-table">
                <table slot="data">
                    <thead>
                    <tr>
                        <th data-column-name="name">Name <gux-sort-control /></th>
                        <th data-column-name="last-name">
                        Last name
                        </th>
                        <th data-column-name="age" data-cell-numeric>
                        Age
                        </th>
                        <th data-column-name="action" data-cell-action>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Adam</td>
                        <td>Ant</td>
                        <td data-cell-numeric>25</td>
                        <td data-cell-action>Delete</td>
                    </tr>
                    <tr>
                        <td>Billy</td>
                        <td>Bat</td>
                        <td data-cell-numeric>28</td>
                        <td data-cell-action>Delete</td>
                    </tr>
                    <tr>
                        <td>Cathy</td>
                        <td>Cat</td>
                        <td data-cell-numeric>31</td>
                        <td data-cell-action>Delete</td>
                    </tr>
                    <tr>
                        <td>Debbie</td>
                        <td>Dog</td>
                        <td data-cell-numeric>33</td>
                        <td data-cell-action>Delete</td>
                    </tr>
                    </tbody>
                </table>
                </gux-table>
      `;
      await setContent(page, html);
      const sortSpy = await page.spyOnEvent('guxsortchanged');

      const sortButton = page.locator('gux-sort-control .gux-sort-button');
      await sortButton.click();
      await page.waitForChanges();

      expect(sortSpy).toHaveReceivedEvent();
    });

    test('should show correct icon for ascending sort', async ({ page }) => {
      const html = `
        <table>
          <thead>
            <tr>
              <th data-column-name="name" aria-sort="ascending">Name <gux-sort-control /></th>
            </tr>
          </thead>
        </table>
      `;
      await setContent(page, html);

      const icon = page.locator('gux-sort-control gux-icon');
      await expect(icon).toHaveAttribute('icon-name', 'fa/caret-up-solid');
    });

    test('should show correct icon for descending sort', async ({ page }) => {
      const html = `
        <table>
          <thead>
            <tr>
              <th data-column-name="name" aria-sort="descending">Name <gux-sort-control /></th>
            </tr>
          </thead>
        </table>
      `;
      await setContent(page, html);

      const icon = page.locator('gux-sort-control gux-icon');
      await expect(icon).toHaveAttribute('icon-name', 'fa/caret-down-solid');
    });

    test('should position icon on left for numeric columns', async ({
      page
    }) => {
      const html = `
        <table>
          <thead>
            <tr>
              <th data-column-name="age" data-cell-numeric>Age <gux-sort-control /></th>
            </tr>
          </thead>
        </table>
      `;
      await setContent(page, html);

      const icon = page.locator('gux-sort-control gux-icon');
      await expect(icon).toHaveClass(/gux-left/);
    });

    test('should position icon on left for action columns', async ({
      page
    }) => {
      const html = `
        <table>
          <thead>
            <tr>
              <th data-column-name="actions" data-cell-action>Actions <gux-sort-control /></th>
            </tr>
          </thead>
        </table>
      `;
      await setContent(page, html);

      const icon = page.locator('gux-sort-control gux-icon');
      await expect(icon).toHaveClass(/gux-left/);
    });

    test('should have correct aria-label for screen readers', async ({
      page
    }) => {
      const html = `
        <table>
          <thead>
            <tr>
              <th data-column-name="name">Name <gux-sort-control /></th>
            </tr>
          </thead>
        </table>
      `;
      await setContent(page, html);

      const sortButton = page.locator('gux-sort-control .gux-sort-button');
      const ariaLabel = await sortButton.getAttribute('aria-label');
      expect(ariaLabel).toContain('Name');
    });
  });
});
