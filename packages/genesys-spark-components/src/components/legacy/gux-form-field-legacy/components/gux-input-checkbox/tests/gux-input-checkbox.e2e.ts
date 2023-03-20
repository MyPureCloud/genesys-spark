import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

describe('gux-input-checkbox', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `
        <gux-input-checkbox>
          <input slot="input" type="checkbox" id="pizza" name="food" value="pizza">
          <label slot="label" for="pizza">Pizza</label>
        </gux-input-checkbox>
      `
    });

    const element = await page.find('gux-input-checkbox');

    expect(element).toHaveAttribute('hydrated');
  });

  it('switches between states when clicked', async () => {
    const page = await newSparkE2EPage({
      html: `
        <gux-input-checkbox>
          <input slot="input" type="checkbox" id="pizza" name="food" value="pizza">
          <label slot="label" for="pizza">Pizza</label>
        </gux-input-checkbox>
      `
    });

    const component = await page.find('gux-input-checkbox');
    const label = await component.find('label');
    const input = await component.find('input');

    await a11yCheck(page, [], 'Before checking checkbox');
    await label.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);

    await a11yCheck(page, [], 'After checking checkbox');
    await label.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);

    await label.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('should render the assigned label', async () => {
    const page = await newSparkE2EPage({
      html: `
        <gux-input-checkbox>
          <input slot="input" type="checkbox" id="pizza" name="food" value="pizza">
          <label slot="label" for="pizza">Pizza</label>
        </gux-input-checkbox>
      `
    });

    const component = await page.find('gux-input-checkbox');
    const label = await component.find('label');

    expect(label.textContent).toContain('Pizza');
  });
});
