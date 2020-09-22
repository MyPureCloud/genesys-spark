import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-table', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent(`
      <gux-table>
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
      </gux-table>
    `);
    element = await page.find('gux-table');
    expect(element).toHaveClass('hydrated');
  });
});
