import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'scrollable-region-focusable',
    exclusionReason: 'Will be addressed in COMUI-735 ticket'
  }
];

async function newNonrandomE2EPage({
  html
}: {
  html: string;
}): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(html);
  await page.waitForChanges();
  await page.addScriptTag({
    path: 'node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();

  return page;
}

describe('gux-table-beta', () => {
  const tableContent = `
    <table slot="data">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th data-cell-numeric>Age</th>
          <th data-cell-action>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td data-cell-numeric>25</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>21</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
      </tbody>
    </table>
  `;

  describe('#render', () => {
    [
      {
        description: 'empty table',
        html: `
        <gux-table-beta lang="en">
          <table slot="data">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th data-cell-numeric>Age</th>
                <th data-cell-action>Action</th>
              </tr>
            </thead>
          </table>
        </gux-table-beta>
        `
      },
      {
        description: 'should render data table',
        html: `<gux-table-beta lang="en">${tableContent}</gux-table-beta>`
      },
      {
        description: 'should render compact data table',
        html: `<gux-table-beta compact lang="en">${tableContent}</gux-table-beta>`
      },
      {
        description: 'should render object table',
        html: `<gux-table-beta object-table lang="en">${tableContent}</gux-table-beta>`
      },

      {
        description: 'should render table with vertical scroll',
        html: `<gux-table-beta style="height: 150px" lang="en">${tableContent}</gux-table-beta>`
      },
      {
        description: 'should render table with horizontal scroll',
        html: `<gux-table-beta style="width: 300px" lang="en">${tableContent}</gux-table-beta>`
      },
      {
        description: 'should render table with rows selection',
        html: `<gux-table-beta object-table selectable-rows lang="en">${tableContent}</gux-table-beta>`
      },
      {
        description: 'should render empty table with rows selection',
        html: `
          <gux-table-beta object-table selectable-rows lang="en">
            <table slot="data">
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th data-cell-numeric>Age</th>
                  <th data-cell-action>Action</th>
                </tr>
              </thead>
            </table>
          </gux-table-beta>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-table-beta');
        await a11yCheck(page, axeExclusions);

        expect(element).toHaveClass('hydrated');
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
