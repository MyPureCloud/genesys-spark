import { a11yCheck, newSparkE2EPage } from '../../../../test/e2eTestUtils';

describe('gux-phone-input', () => {
  describe('#render', () => {
    [
      {
        description: 'should render phone-input',
        html: `
        <gux-phone-input-beta></gux-phone-input-beta>
        `
      },
      {
        description: 'should render with default region',
        html: `<gux-phone-input-beta default-region="US"></gux-phone-input-beta>`
      },
      {
        description: 'should render with value',
        html: `<gux-phone-input-beta value="+13175971660"></gux-phone-input-beta>`
      },
      {
        description: 'should render with e164 format',
        html: `<gux-phone-input-beta phone-number-format="E164"></gux-phone-input-beta>`
      },
      {
        description: 'should render with international format',
        html: `<gux-phone-input-beta phone-number-format="INTERNATIONAL"></gux-phone-input-beta>`
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-phone-input-beta');
        expect(element.outerHTML).toMatchSnapshot();
        await a11yCheck(page);
      });
    });
  });

  it('open country dropdown and select option with value not starting with +', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-phone-input-beta></gux-phone-input-beta>`
    });
    const dropdownButton = await page.find('pierce/.gux-field-button');
    const inputField = await page.find('pierce/#tel-input');
    const component = await page.find('gux-phone-input-beta');

    await inputField.press('1');

    await dropdownButton.press('Enter');
    expect(dropdownButton.getAttribute('aria-expanded')).toBe('true');
    await page.waitForChanges();
    await a11yCheck(page);

    // First arrow down focuses the currently selected option
    await page.keyboard.press('ArrowDown');
    // Second arrow down to move the selection down one
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    const region = await component.callMethod('getRegion');

    expect(region.alpha2Code).toBe('AF');
    expect(await component.getProperty('value')).toBe('1');
    expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('open country dropdown and select option with value starting with +', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-phone-input-beta></gux-phone-input-beta>`
    });
    const dropdownButton = await page.find('pierce/.gux-field-button');
    const inputField = await page.find('pierce/#tel-input');
    const component = await page.find('gux-phone-input-beta');

    await inputField.press('+');
    await inputField.press('1');

    await dropdownButton.press('Enter');
    expect(dropdownButton.getAttribute('aria-expanded')).toBe('true');
    await page.waitForChanges();
    await a11yCheck(page);

    // First arrow down focuses the currently selected option
    await page.keyboard.press('ArrowDown');
    // Second arrow down to move the selection down one
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    const region = await component.callMethod('getRegion');

    expect(region.alpha2Code).toBe('AD');
    expect(await component.getProperty('value')).toBe('+376');
    expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('region is set when initialized with value', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-phone-input-beta value="+13175971660"></gux-phone-input-beta>`
    });
    const dropdownButtonIcon = await page.find(
      'pierce/.gux-field-button gux-region-icon'
    );
    const component = await page.find('gux-phone-input-beta');

    const region = await component.callMethod('getRegion');

    expect(region.alpha2Code).toBe('US');
    expect(dropdownButtonIcon.getAttribute('screenreader-text')).toBe(
      'United States'
    );
  });

  it('region is set when typing in country code', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-phone-input-beta></gux-phone-input-beta>`
    });
    const dropdownButton = await page.find('pierce/.gux-field-button');
    const inputField = await page.find('pierce/#tel-input');

    await inputField.type('+41');
    await page.waitForChanges();

    await dropdownButton.click();
    await page.waitForChanges();

    const selected = await page.find('pierce/.gux-selected');

    expect(selected.textContent).toEqual('Switzerland+41');
  });
});
