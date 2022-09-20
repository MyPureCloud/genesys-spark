import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-time-picker-beta', () => {
  describe('#render', () => {
    it('renders', async () => {
      const html = `<gux-time-picker-beta value="15:00" lang="en"></gux-time-picker-beta>`;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-time-picker-beta');
      expect(element).toHaveAttribute('hydrated');
    });
  });

  it('updates the hours and minutes values', async () => {
    const html = `<gux-time-picker-beta lang="en" value="09:00"></gux-time-picker-beta>`;
    const page = await newSparkE2EPage({ html });
    const timePicker = await page.find('gux-time-picker-beta');

    const inputHours = await timePicker.find('pierce/.gux-input-time-hours');
    const inputMinutes = await timePicker.find(
      'pierce/.gux-input-time-minutes'
    );
    const valueHours = await inputHours.getProperty('value');
    const valueMinutes = await inputMinutes.getProperty('value');

    await a11yCheck(page);
    expect(valueHours).toBe('9');
    expect(valueMinutes).toBe('00');
  });

  it('opens the suggested times when the clock button is clicked', async () => {
    const html = `<gux-time-picker-beta value="15:00" lang="en"></gux-time-picker-beta>`;
    const page = await newSparkE2EPage({ html });
    const timePicker = await page.find('gux-time-picker-beta');

    const clockButton = await timePicker.find('pierce/.gux-clock-button');
    await clockButton.click();
    await page.waitForChanges();
    expect(clockButton.className).toContain('gux-active');
  });

  it('should not open the suggested tims when the clock button is clicked when disabled', async () => {
    const html = `<gux-time-picker-beta value="15:00" lang="en" disabled></gux-time-picker-beta>`;
    const page = await newSparkE2EPage({ html });
    const timePicker = await page.find('gux-time-picker-beta');

    const clockButton = await timePicker.find('pierce/.gux-clock-button');
    await clockButton.click();
    await page.waitForChanges();
    expect(clockButton.className).toBe('gux-clock-button');
  });
});
