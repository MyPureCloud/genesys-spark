import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../../test/e2eTestUtils';

const axeExclusions = [];

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

describe('gux-selector-card', () => {
  describe('#render', () => {
    [
      `<gux-selector-card-beta variant="simple">
          <label slot="label" for="first">First</label>
          <input slot="input" id="first" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>
      `,
      `<gux-selector-card-beta variant="descriptive">
          <label slot="label" for="first">First</label>
          <input slot="input" id="first" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
      </gux-selector-card-beta>`,
      `<gux-selector-card-beta variant="simple">
          <label slot="label" for="1-C">First</label>
          <input slot="input" id="1-C" type="checkbox" name="example3" />
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-selector-card-beta');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it(`should be accessible (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
      });
    });
  });

  it('can select and deselect checkbox', async () => {
    const page = await newSparkE2EPage({
      html: `
        <gux-selector-card-beta variant="simple">
          <label slot="label" for="1-C">First</label>
          <input slot="input" id="1-C" type="checkbox" name="example3" />
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>
      `
    });

    const element = await page.find('gux-selector-card-beta');
    const input = await element.find('input');

    await a11yCheck(page, axeExclusions, 'Before checking checkbox');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);

    await a11yCheck(page, axeExclusions, 'After checking checkbox');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);

    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });
});
