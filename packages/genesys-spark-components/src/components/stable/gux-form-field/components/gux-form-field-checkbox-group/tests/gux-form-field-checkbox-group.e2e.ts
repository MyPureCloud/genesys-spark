import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'color-contrast',
    target: 'gux-form-field-checkbox-group-beta,span',
    exclusionReason:
      'WCAG 1.4.3 Contrast (Minimum), inactive user interface components do not need to meet contrast minimum'
  },
  {
    issueId: 'color-contrast',
    target: 'gux-form-field-checkbox-group-beta,span[role="presentation"]',
    exclusionReason:
      'WCAG 1.4.3 Contrast (Minimum), inactive user interface components do not need to meet contrast minimum'
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

describe('gux-form-field-checkbox-group-beta', () => {
  describe('#render', () => {
    [
      `
      <gux-form-field-checkbox-group-beta>
        <label slot="group-label">Food</label>
        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
      </gux-form-field-checkbox-group-beta>
       `,
      `
       <gux-form-field-checkbox-group-beta>
       <label slot="group-label">Food</label>
   
       <gux-form-field-checkbox>
         <input slot="input" type="checkbox" name="food-1" value="pizza" />
         <label slot="label">Pizza</label>
       </gux-form-field-checkbox>
   
       <gux-form-field-checkbox>
         <input
           slot="input"
           type="checkbox"
           name="food-1"
           value="sandwich"
           disabled
         />
         <label slot="label">Sandwich</label>
       </gux-form-field-checkbox>
   
       <gux-form-field-checkbox>
         <input slot="input" type="checkbox" name="food-1" value="spaghetti" />
         <label slot="label">Spaghetti</label>
         <span slot="help">This is a help message</span>
       </gux-form-field-checkbox>
       <span slot="group-error">Subject to availibility</span>
     </gux-form-field-checkbox-group-beta>
       `,
      `<gux-form-field-checkbox-group-beta>
       <label slot="group-label">Food</label>
   
       <gux-form-field-checkbox>
         <input slot="input" type="checkbox" name="food-1" value="pizza" />
         <label slot="label">Pizza</label>
       </gux-form-field-checkbox>
   
       <gux-form-field-checkbox>
         <input
           slot="input"
           type="checkbox"
           name="food-1"
           value="sandwich"
           disabled
         />
         <label slot="label">Sandwich</label>
       </gux-form-field-checkbox>
   
       <gux-form-field-checkbox>
         <input slot="input" type="checkbox" name="food-1" value="sushi" />
         <label slot="label">Sushi</label>
         <span slot="error">Subject to availibility</span>
       </gux-form-field-checkbox>
   
       <gux-form-field-checkbox>
         <input slot="input" type="checkbox" name="food-1" value="spaghetti" />
         <label slot="label">Spaghetti</label>
         <span slot="help">This is a help message</span>
       </gux-form-field-checkbox>
       <span slot="group-help">This is a group help message</span>
     </gux-form-field-checkbox-group-beta>`,
      ` <gux-form-field-checkbox-group-beta disabled>
     <span label="group-label">Food</span>
 
     <gux-form-field-checkbox>
       <input slot="input" type="checkbox" name="food-1" value="pizza" />
       <label slot="label">Pizza</label>
     </gux-form-field-checkbox>
 
     <gux-form-field-checkbox>
       <input
         slot="input"
         type="checkbox"
         name="food-1"
         value="sandwich"
         disabled
       />
       <label slot="label">Sandwich</label>
     </gux-form-field-checkbox>
 
     <gux-form-field-checkbox>
       <input slot="input" type="checkbox" name="food-1" value="sushi" />
       <label slot="label">Sushi</label>
       <span slot="error">Subject to availibility</span>
     </gux-form-field-checkbox>
 
     <gux-form-field-checkbox>
       <input slot="input" type="checkbox" name="food-1" value="spaghetti" />
       <label slot="label">Spaghetti</label>
       <span slot="help">This is a help message</span>
     </gux-form-field-checkbox>
   </gux-form-field-checkbox-group-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-form-field-checkbox');
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
      <gux-form-field-checkbox-group-beta>
        <label slot="label">Food</label>
        <gux-form-field-checkbox id="pizza">
          <input slot="input" type="checkbox" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
        <gux-form-field-checkbox id="pasta">
          <input slot="input" type="checkbox" name="food-1" value="pasta"/>
          <label slot="label">Pasta</label>
        </gux-form-field-checkbox>
      </gux-form-field-checkbox-group-beta>

      `
    });

    const pizzaElement = await page.find('#pizza');
    const pizzaLabel = await pizzaElement.find('label');
    const pizzaInput = await pizzaElement.find('input');

    const pastaElement = await page.find('#pasta');
    const pastaLabel = await pastaElement.find('label');
    const pastaInput = await pastaElement.find('input');

    await a11yCheck(page, axeExclusions, 'Before checking checkbox');
    await pizzaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(true);
    expect(await pastaInput.getProperty('checked')).toBe(false);

    await a11yCheck(page, axeExclusions, 'After checking checkbox');
    await pastaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(true);
    expect(await pastaInput.getProperty('checked')).toBe(true);
  });
  it('disables the slotted form field checkbox inputs', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-form-field-checkbox-group-beta disabled>
        <label slot="label">Food</label>
        <gux-form-field-checkbox id="pizza">
          <input slot="input" type="checkbox" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
        <gux-form-field-checkbox id="pasta">
          <input slot="input" type="checkbox" name="food-1" value="pasta"/>
          <label slot="label">Pasta</label>
        </gux-form-field-checkbox>
      </gux-form-field-checkbox-group-beta>

      `
    });

    const pizzaElement = await page.find('#pizza');
    const pizzaLabel = await pizzaElement.find('label');
    const pizzaInput = await pizzaElement.find('input');

    const pastaElement = await page.find('#pasta');
    const pastaLabel = await pastaElement.find('label');
    const pastaInput = await pastaElement.find('input');

    await a11yCheck(page, axeExclusions, 'Before checking checkbox');
    await pizzaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(false);
    expect(await pastaInput.getProperty('checked')).toBe(false);

    await a11yCheck(page, axeExclusions, 'After checking checkbox');
    await pastaLabel.click();
    await page.waitForChanges();
    expect(await pizzaInput.getProperty('checked')).toBe(false);
    expect(await pastaInput.getProperty('checked')).toBe(false);
  });
});
