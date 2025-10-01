import {
  checkRenders,
  setContent,
  test,
  expect
} from '@test/playwrightTestUtils';
import {
  renderConfigs,
  emptyTableRenderConfig,
  selectableTableRenderConfig
} from './gux-table.common';

const axeExclusions = [];

test.describe('gux-table', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-table',
      axeExclusions
    });
  });

  // TODO: COMUI-4124 - These tests will intermittently fail due to issues with the i18n files
  // eslint-disable-next-line playwright/no-skipped-test
  test.skip(`${emptyTableRenderConfig.description} with i18n strings`, async ({
    page
  }) => {
    const html = `<div lang="ja">${emptyTableRenderConfig.html}</div>`;
    await setContent(page, html);

    await expect(page.locator('.gux-empty-table')).toMatchAriaSnapshot(`
      - text: "利用可能なデータがありません"
    `);
  });

  // eslint-disable-next-line playwright/no-skipped-test
  test.skip(`${selectableTableRenderConfig.description} with i18n strings`, async ({
    page
  }) => {
    const html = `<div lang="ja">${selectableTableRenderConfig.html}</div>`;
    await setContent(page, html);
    const tableSelectMenuButton = page.locator(
      'gux-table-select-menu .gux-select-menu-button'
    );

    await expect(tableSelectMenuButton).toMatchAriaSnapshot(`
      - button "テーブル オプション"
    `);
  });

  test('should sort table if table header nested element is wrapped in a span tag', async ({
    page
  }) => {
    const html = `<gux-table>
    <table slot="data">
      <thead>
        <tr>
          <th data-column-name="first-name" aria-sort="ascending">
            <span>First name</span>
            <gux-sort-control />
          </th>
          <th data-column-name="last-name">Last name</th>
          <th data-column-name="age" data-cell-numeric>Age</th>
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
          <td data-cell-numeric>21</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr>
          <td>Debbie</td>
          <td>Dog</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
      </tbody>
    </table>
  </gux-table>`;

    await setContent(page, html);

    const columnSortSpy = await page.spyOnEvent('guxsortchanged');
    const headerElement = page.locator('th span');
    // eslint-disable-next-line playwright/no-force-option
    await headerElement.click({ force: true });
    await page.waitForChanges();

    expect(columnSortSpy).toHaveReceivedEventDetail({
      columnName: 'first-name',
      sortDirection: 'descending'
    });
  });

  test('should sort table if table header nested element is not wrapped in a span tag', async ({
    page
  }) => {
    const html = `<gux-table>
    <table slot="data">
      <thead>
        <tr>
          <th data-column-name="first-name" aria-sort="ascending">
            First name
            <gux-sort-control />
          </th>
          <th data-column-name="last-name">Last name</th>
          <th data-column-name="age" data-cell-numeric>Age</th>
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
          <td data-cell-numeric>21</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr>
          <td>Debbie</td>
          <td>Dog</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
      </tbody>
    </table>
  </gux-table>`;

    await setContent(page, html);

    const columnSortEvent = await page.spyOnEvent('guxsortchanged');
    const headerElement = page.locator('th').first();
    await headerElement.click();
    await page.waitForChanges();

    expect(columnSortEvent).toHaveReceivedEventDetail({
      columnName: 'first-name',
      sortDirection: 'descending'
    });
  });

  test('should return two elements as two of the rows are disabled.', async ({
    page
  }) => {
    const html = `<gux-table object-table selectable-rows>
    <table slot="data">
      <thead>
        <tr data-row-id="head">
          <th><gux-all-row-select></gux-all-row-select></th>
          <th data-column-name="first-name">First name</th>
          <th data-column-name="last-name">Last name</th>
          <th data-column-name="age" data-cell-numeric>Age</th>
          <th data-column-name="action" data-cell-action>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr data-row-id="person-id-1">
          <td><gux-row-select disabled></gux-row-select></td>
          <td>John</td>
          <td>Doe</td>
          <td data-cell-numeric>25</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr data-row-id="person-id-2">
          <td><gux-row-select></gux-row-select></td>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr data-row-id="person-id-3">
          <td><gux-row-select disabled></gux-row-select></td>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>21</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr data-row-id="person-id-4">
          <td><gux-row-select></gux-row-select></td>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
      </tbody>
    </table>
  </gux-table>`;

    await setContent(page, html);
    const selectAllEvent = await page.spyOnEvent('guxselectionchanged');
    const selectAllElement = page.locator('thead tr th gux-all-row-select');
    const inputElement = selectAllElement.locator('input');
    await inputElement.click();
    await page.waitForChanges();

    expect(selectAllEvent).toHaveReceivedEventDetail({
      selectedRowIds: ['person-id-2', 'person-id-4']
    });
  });

  test('should return the disabled selected element even if the select all input has been unselected.', async ({
    page
  }) => {
    const html = `<gux-table object-table selectable-rows>
    <table slot="data">
      <thead>
        <tr data-row-id="head">
          <th><gux-all-row-select></gux-all-row-select></th>
          <th data-column-name="first-name">First name</th>
          <th data-column-name="last-name">Last name</th>
          <th data-column-name="age" data-cell-numeric>Age</th>
          <th data-column-name="action" data-cell-action>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr data-row-id="person-id-1">
          <td><gux-row-select selected disabled></gux-row-select></td>
          <td>John</td>
          <td>Doe</td>
          <td data-cell-numeric>25</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr data-row-id="person-id-2">
          <td><gux-row-select></gux-row-select></td>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr data-row-id="person-id-3">
          <td><gux-row-select disabled></gux-row-select></td>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>21</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr data-row-id="person-id-4">
          <td><gux-row-select></gux-row-select></td>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
      </tbody>
    </table>
  </gux-table>`;

    await setContent(page, html);
    const selectAllEvent = await page.spyOnEvent('guxselectionchanged');
    const selectAllElement = page.locator('thead tr th gux-all-row-select');
    const inputElement = selectAllElement.locator('input');
    await inputElement.click();
    await page.waitForChanges();
    await inputElement.click();
    await page.waitForChanges();

    expect(selectAllEvent).toHaveReceivedEventDetail({
      selectedRowIds: ['person-id-1']
    });
  });

  test('should set the state of selectAll checkbox to true when all checkboxes that are not disabled are checked.', async ({
    page
  }) => {
    const html = `<gux-table object-table selectable-rows>
    <table slot="data">
      <thead>
        <tr data-row-id="head">
          <th><gux-all-row-select></gux-all-row-select></th>
          <th data-column-name="first-name">First name</th>
          <th data-column-name="last-name">Last name</th>
          <th data-column-name="age" data-cell-numeric>Age</th>
          <th data-column-name="action" data-cell-action>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr data-row-id="person-id-1">
          <td><gux-row-select disabled></gux-row-select></td>
          <td>John</td>
          <td>Doe</td>
          <td data-cell-numeric>25</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr data-row-id="person-id-2">
          <td><gux-row-select class="person2" ></gux-row-select></td>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr data-row-id="person-id-3">
          <td><gux-row-select disabled></gux-row-select></td>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>21</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr data-row-id="person-id-4">
          <td><gux-row-select class="person4"></gux-row-select></td>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
      </tbody>
    </table>
  </gux-table>`;

    await setContent(page, html);
    const selectAllElement = page.locator('thead tr th gux-all-row-select');
    const inputElement = selectAllElement.locator('input');

    const secondRow = page.locator('.person2');
    const secondRowInput = secondRow.locator('input');

    const fourthRow = page.locator('.person4');
    const fourthRowInput = fourthRow.locator('input');

    await secondRowInput.click();
    await page.waitForChanges();

    await fourthRowInput.click();
    await page.waitForChanges();

    await expect(inputElement).toBeChecked();
  });

  test('should display the table-select-menu in a closed state and then open when select menu button is clicked', async ({
    page
  }) => {
    const html = `
      <gux-table>
        <table slot="data">
          <thead>
            <tr data-row-id="head">
              <th>
                <gux-table-select-menu>
                  <gux-all-row-select></gux-all-row-select>
                  <gux-list slot="select-menu-options">
                    <gux-list-item onclick="notify(event)">
                      All on page
                    </gux-list-item>
                    <gux-list-item onclick="notify(event)"> None </gux-list-item>
                    <gux-list-item onclick="notify(event)">
                      Bring selected to top
                    </gux-list-item>
                  </gux-list>
                </gux-table-select-menu>

              </th>
              <th data-column-name="first-name">First name</th>
              <th data-column-name="last-name">Last name</th>
              <th data-column-name="age" data-cell-numeric>Age</th>
              <th data-column-name="action" data-cell-action>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr data-row-id="person-id-1">
              <td><gux-row-select disabled></gux-row-select></td>
              <td>John</td>
              <td>Doe</td>
              <td data-cell-numeric>25</td>
              <td data-cell-action>Delete</td>
            </tr>
            <tr data-row-id="person-id-2">
              <td><gux-row-select></gux-row-select></td>
              <td>Jane</td>
              <td>Doe</td>
              <td data-cell-numeric>23</td>
              <td data-cell-action>Delete</td>
            </tr>
            <tr data-row-id="person-id-3">
              <td><gux-row-select disabled></gux-row-select></td>
              <td>Jane</td>
              <td>Doe</td>
              <td data-cell-numeric>21</td>
              <td data-cell-action>Delete</td>
            </tr>
            <tr data-row-id="person-id-4">
              <td><gux-row-select></gux-row-select></td>
              <td>Jane</td>
              <td>Doe</td>
              <td data-cell-numeric>23</td>
              <td data-cell-action>Delete</td>
            </tr>
          </tbody>
        </table>
      </gux-table>
    `;

    await setContent(page, html);

    const tableSelectMenuElement = page.locator('gux-table-select-menu');
    const tableSelectMenuButton = tableSelectMenuElement.locator(
      '.gux-select-menu-button'
    );
    const popoverComponent = tableSelectMenuElement.locator('gux-popover-list');

    await page.waitForChanges();

    // Check that the popover is initially hidden
    const popoverList = popoverComponent.locator('div.gux-popover-wrapper');
    await expect(popoverList).toBeHidden();

    await tableSelectMenuButton.click();
    await page.waitForChanges();

    // Check that the popover is now visible
    await expect(popoverList).toBeVisible();
  });
});
