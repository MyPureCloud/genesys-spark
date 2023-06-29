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
        description: 'should render with format',
        html: `<gux-phone-input-beta phone-number-format="E164"></gux-phone-input-beta>`
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-phone-input-beta');
        expect(element.outerHTML).toMatchSnapshot();
        await a11yCheck(page);
      });
    });

    it('open country dropdown and select option', async () => {
      const page = await newSparkE2EPage({
        html: `<gux-phone-input-beta></gux-phone-input-beta>`
      });
      const dropdownButton = await page.find('pierce/.gux-field-button');
      const inputField = await page.find('pierce/#tel-input');

      const inputEventSpy = await page.spyOnEvent('input');

      await dropdownButton.press('Enter');
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('true');
      await page.waitForChanges();
      await a11yCheck(page);

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(await inputField.getProperty('value')).toBe('+93');
      expect(inputEventSpy).toHaveReceivedEventDetail('+93');
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('region is set when initialized with value', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-phone-input-beta value="+13175971660"></gux-phone-input-beta>`
    });
    const dropdownButton = await page.find('pierce/.gux-field-button');
    await dropdownButton.click();
    await page.waitForChanges();

    const selected = await page.find('pierce/.gux-selected');

    expect(selected.textContent).toEqual('United States+1');
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

  it('phone validation error is sent as true', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-phone-input-beta></gux-phone-input-beta>
            <input type="text" id="focus-input">`
    });
    const element = await page.find('gux-phone-input-beta');
    const inputField = await page.find('pierce/#tel-input');

    const validationEventSpy = await page.spyOnEvent('phoneValidationError');

    await inputField.focus();
    await inputField.type('+1317');
    await page.waitForChanges();
    element.triggerEvent('focusout');
    await page.waitForChanges();

    expect(validationEventSpy).toHaveReceivedEventDetail(true);
  });
});
