import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-table-beta', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent(`
      <gux-table-beta lang="en">
        <table slot="data">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>Doe</td>
            </tr>
          </tbody>
        </table>
      </gux-table-beta>
    `);
    element = await page.find('gux-table-beta');

    expect(element).toHaveClass('hydrated');
  });
});
