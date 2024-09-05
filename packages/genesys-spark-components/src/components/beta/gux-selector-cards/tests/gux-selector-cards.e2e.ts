import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

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

describe('gux-selector-cards', () => {
  describe('#render', () => {
    [
      `<gux-selector-cards-beta></gux-selector-cards-beta>`,
      `
      <gux-selector-cards-beta>
        <gux-selector-card-beta variant="simple">
          <label slot="label" for="first">First</label>
          <input slot="input" id="first" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="second">Second</label>
          <input slot="input" id="second" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="third">Third</label>
          <input slot="input" id="third" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="fourth">Fourth</label>
          <input slot="input" id="fourth" type="radio" name="example1" disabled />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="fifth">Fifth</label>
          <input slot="input" id="fifth" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>
      </gux-selector-cards-beta>
      `,
      `<gux-selector-cards-beta class="example2">
        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="first">First</label>
          <input slot="input" id="first" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="second">Second</label>
          <input slot="input" id="second" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="third">Third</label>
          <input slot="input" id="third" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="fourth">Fourth</label>
          <input slot="input" id="fourth" type="radio" name="example2" disabled />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="fifth">Fifth</label>
          <input slot="input" id="fifth" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>
      </gux-selector-cards-beta>`,
      `<gux-selector-cards-beta class="example1">
  <gux-selector-card-beta variant="descriptive">
    <label slot="label" for="1-D">First</label>
    <input slot="input" id="1-D" type="checkbox" name="example4" value="1-D" />
    <span slot="description"
      >A label for a sample selector card. Used in Spark WCL.</span
    >
    <gux-badge slot="badge" bold>Badge</gux-badge>
    <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
  </gux-selector-card-beta>

  <gux-selector-card-beta variant="descriptive">
    <label slot="label" for="2-D">Second</label>
    <input slot="input" id="2-D" type="checkbox" name="example4" value="2-D" />
    <span slot="description"
      >A label for a sample selector card. Used in Spark WCL.</span
    >
    <gux-badge slot="badge" bold>Badge</gux-badge>
    <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
  </gux-selector-card-beta>

  <gux-selector-card-beta variant="descriptive">
    <label slot="label" for="3-D">Third</label>
    <input slot="input" id="3-D" type="checkbox" name="example4" value="3-D" />
    <span slot="description"
      >A label for a sample selector card. Used in Spark WCL.</span
    >
    <gux-badge slot="badge" bold>Badge</gux-badge>
    <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
  </gux-selector-card-beta>

  <gux-selector-card-beta variant="descriptive">
    <label slot="label" for="4-D">Fourth</label>
    <input slot="input" id="4-D" type="checkbox" name="example4" disabled value="4-D" />
    <span slot="description"
      >A label for a sample selector card. Used in Spark WCL.</span
    >
    <gux-badge slot="badge" bold>Badge</gux-badge>
    <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
  </gux-selector-card-beta>

  <gux-selector-card-beta variant="descriptive">
    <label slot="label" for="5-D">Fifth</label>
    <input slot="input" id="5-D" type="checkbox" name="example4" value="5-D" />
    <span slot="description"
      >A label for a sample selector card. Used in Spark WCL.</span
    >
    <gux-badge slot="badge" bold>Badge</gux-badge>
    <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
  </gux-selector-card-beta>
</gux-selector-cards-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-selector-cards-beta');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it(`should be accessible (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
      });
    });
  });

  it('switches between states when clicked', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-selector-cards-beta>
          <gux-selector-card-beta variant="simple" id="one">
            <label slot="label" for="first">First</label>
            <input slot="input" id="first" type="radio" name="example1" />
            <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
          </gux-selector-card-beta>

          <gux-selector-card-beta variant="simple" id="two">
            <label slot="label" for="second">Second</label>
            <input slot="input" id="second" type="radio" name="example1" />
            <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
          </gux-selector-card-beta>

          <gux-selector-card-beta variant="simple" id="three">
            <label slot="label" for="third">Third</label>
            <input slot="input" id="third" type="radio" name="example1" disabled />
            <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
          </gux-selector-card-beta>
        </gux-selector-cards-beta>
      `
    });

    const firstElement = await page.find('#one');
    const firstInput = await firstElement.find('input');

    const secondElement = await page.find('#two');
    const secondInput = await secondElement.find('input');

    const thirdElement = await page.find('#three');
    const thirdInput = await thirdElement.find('input');

    await a11yCheck(page, axeExclusions, 'Before checking radio');
    await firstElement.click();
    await page.waitForChanges();
    expect(await firstInput.getProperty('checked')).toBe(true);
    expect(await secondInput.getProperty('checked')).toBe(false);

    await a11yCheck(page, axeExclusions, 'After checking radio');
    await secondElement.click();
    await page.waitForChanges();
    expect(await firstInput.getProperty('checked')).toBe(false);
    expect(await secondInput.getProperty('checked')).toBe(true);

    await firstElement.click();
    await page.waitForChanges();
    expect(await firstInput.getProperty('checked')).toBe(true);
    expect(await secondInput.getProperty('checked')).toBe(false);

    await thirdElement.click();
    await page.waitForChanges();
    expect(await firstInput.getProperty('checked')).toBe(true);
    expect(await thirdInput.getProperty('checked')).toBe(false);
  });
});
