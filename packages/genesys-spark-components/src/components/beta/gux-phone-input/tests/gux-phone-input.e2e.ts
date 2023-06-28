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
      // const inputField = await page.find('pierce/#tel-input');

      const inputEventSpy = await page.spyOnEvent('input');

      await dropdownButton.press('Enter');
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('true');
      await page.waitForChanges();
      await a11yCheck(page);

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(inputEventSpy).toHaveReceivedEvent();
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');
      // TODO: I would like to use inputField to get its value since that is changed by the dropdown, but getAttribute('value') only ever returns null
    });
  });
});
