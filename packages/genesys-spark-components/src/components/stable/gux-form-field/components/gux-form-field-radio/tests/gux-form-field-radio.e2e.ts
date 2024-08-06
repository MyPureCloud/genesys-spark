import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'target-size',
    exclusionReason:
      'COMUI-2949 Fix any of the following: Target has insufficient size (16px by 16px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 20px instead of at least 24px.]'
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

  return page;
}

describe('gux-form-field-radio', () => {
  describe('#render', () => {
    [
      `
        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
      `,
      `
        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza" disabled/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
      `,
      `
        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
          <span slot="error">This is an error message</span>
        </gux-form-field-radio>
      `,
      `
        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza" checked/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
      `,
      `
        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
          <span slot="error">Error message</span>
        </gux-form-field-radio>
      `,
      `
        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza" disabled/>
          <label slot="label">Pizza</label>
          <span slot="error">Error message</span>
        </gux-form-field-radio>
      `,
      `<gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="spaghetti"/>
        <label slot="label">Spaghetti</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-radio>
      `,
      `<gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="spaghetti" disabled/>
        <label slot="label">Spaghetti</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-radio>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-form-field-radio');
        const elementShadowDom = await element.find(
          'pierce/.gux-form-field-container'
        );

        expect(element.outerHTML).toMatchSnapshot();
        expect(elementShadowDom).toMatchSnapshot();
      });

      it(`should be accessible (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page, axeExclusions);
      });
    });
  });

  it('switches between states when clicked', async () => {
    const page = await newSparkE2EPage({
      html: `
        <gux-form-field-radio id="pizza">
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
        <gux-form-field-radio id="pasta">
          <input slot="input" type="radio" name="food-1" value="pasta"/>
          <label slot="label">Pasta</label>
        </gux-form-field-radio>
      `
    });

    const pizzaElement = await page.find('#pizza');
    const pizzaLabel = await pizzaElement.find('label');
    const pizzaInput = await pizzaElement.find('input');

    const pastaElement = await page.find('#pasta');
    const pastaLabel = await pastaElement.find('label');
    const pastaInput = await pastaElement.find('input');

    await a11yCheck(page, axeExclusions, 'Before checking radio');
    await pizzaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(true);
    expect(await pastaInput.getProperty('checked')).toBe(false);

    await a11yCheck(page, axeExclusions, 'After checking radio');
    await pastaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(false);
    expect(await pastaInput.getProperty('checked')).toBe(true);

    await pizzaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(true);
    expect(await pastaInput.getProperty('checked')).toBe(false);
  });
});
