import { E2EPage, newE2EPage } from '@stencil/core/testing';

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

  return page;
}

describe('gux-form-field', () => {
  it('renders', async () => {
    const html = `
      <gux-form-field lang="en">
        <input slot="input" type="text">
        <label slot="label">Text</label>
      </gux-form-field>
    `;
    const page = await newE2EPage({ html });

    const element = await page.find('gux-form-field');
    expect(element).toHaveClass('hydrated');
  });

  describe('#render', () => {
    describe('input tag', () => {
      [
        { type: 'checkbox', value: 'true' },
        { type: 'color', value: '#000000' },
        { type: 'email', value: 'test@example.com' },
        { type: 'number', value: '2' },
        { type: 'password', value: 'text' },
        { type: 'radio', value: 'true' },
        { type: 'range', value: '5' },
        { type: 'search', value: 'text' },
        { type: 'text', value: 'text' },
        { type: 'unknown', value: 'text' }
      ].forEach(({ type, value }) => {
        it(`should render component type "${type}"`, async () => {
          const html = `
            <gux-form-field lang="en">
              <input
                slot="input"
                type="${type}"
                value="${value}"
              />
              <label slot="label">Test</label>
            </gux-form-field>
          `;
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-form-field');

          expect(element.innerHTML).toMatchSnapshot();
        });

        it(`should render component type "${type}" with an error slot`, async () => {
          const html = `
              <gux-form-field lang="en">
                <input
                  slot="input"
                  type="${type}"
                  value="${value}"
                />
                <label slot="label">Test</label>
                <span slot="error">Error</span>
              </gux-form-field>
            `;
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-form-field');

          expect(element.innerHTML).toMatchSnapshot();
        });
      });
    });
  });

  describe('select tag', () => {
    it(`should render component type "select"`, async () => {
      const html = `
          <gux-form-field lang="en">
            <select slot="input" name="select">
              <option value="option1">Option 1</option>
              <option value="option1">Option 2</option>
              <option value="option1">Option 3</option>
            </select>
            <label slot="label">Select</label>
          </gux-form-field>
        `;
      const page = await newNonrandomE2EPage({ html });
      const element = await page.find('gux-form-field');

      expect(element.innerHTML).toMatchSnapshot();
    });
    it(`should render component type "select" with an error slot`, async () => {
      const html = `
          <gux-form-field lang="en">
            <select slot="input" name="select">
              <option value="option1">Option 1</option>
              <option value="option1">Option 2</option>
              <option value="option1">Option 3</option>
            </select>
            <label slot="label">Select</label>
            <span slot="error">Error</span>
          </gux-form-field>
        `;
      const page = await newNonrandomE2EPage({ html });
      const element = await page.find('gux-form-field');

      expect(element.innerHTML).toMatchSnapshot();
    });
  });
});
