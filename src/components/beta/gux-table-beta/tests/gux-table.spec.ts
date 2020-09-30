import { newSpecPage } from '@stencil/core/testing';
import { GuxTable } from '../gux-table';

describe('gux-table-beta', () => {
  let component: GuxTable;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTable],
      html: `
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
      `,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxTable);
  });
});
