import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

async function newNonrandomE2EPage(
  {
    html
  }: {
    html: string;
  },
  lang: string = 'en'
): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(`<div lang=${lang}>${html}</div>`);
  await page.waitForChanges();
  return page;
}

describe('gux-table-beta', () => {
  const html = `
    <gux-table-beta object-table selectable-rows>
      <table slot="data">
        <thead>
          <tr>
            <th><gux-all-row-select></gux-all-row-select></th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><gux-row-select></gux-row-select></td>
            <td>John</td>
            <td>Doe</td>
          </tr>
        </tbody>
      </table>
    </gux-table-beta>
  `;

  describe('#render', () => {
    it('renders', async () => {
      const page = await newNonrandomE2EPage({ html });
      const element = await page.find('gux-table-beta');

      expect(element).toHaveAttribute('hydrated');
      expect(element.outerHTML).toMatchSnapshot();
    });
    it('renders with translation strings', async () => {
      const page = await newNonrandomE2EPage({ html }, 'ja');
      const element = await page.find('gux-table-beta');

      expect(element).toHaveAttribute('hydrated');
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
