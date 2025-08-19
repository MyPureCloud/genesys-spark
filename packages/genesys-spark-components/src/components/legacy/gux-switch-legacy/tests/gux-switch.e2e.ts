import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-switch-legacy', () => {
  const html = `
  <gux-switch-legacy lang="en" layout="small" value="day">
    <gux-switch-item value="month">Month</gux-switch-item>
    <gux-switch-item value="week">Week</gux-switch-item>
    <gux-switch-item value="day">Day</gux-switch-item>
    <gux-switch-item value="hour" disabled>Hour</gux-switch-item>
    <gux-switch-item value="minute">Minute</gux-switch-item>
  </gux-switch-legacy>
`;
  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-switch-legacy');
      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });

  describe('#interactions', () => {
    it(`should change value on gux-switch-item click`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-switch-legacy');
      const guxSwitchItemMinute = await page.find(
        'gux-switch-item[value=minute]'
      );

      expect(await element.getProperty('value')).toBe('day');

      await guxSwitchItemMinute.click();
      await page.waitForChanges();

      expect(await element.getProperty('value')).toBe(
        await guxSwitchItemMinute.getProperty('value')
      );
    });

    it(`should not change value on gux-switch-item click if it is disabled`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-switch-legacy');
      const guxSwitchItemHour = await page.find('gux-switch-item[value=hour]');
      const currentValue = await element.getProperty('value');

      expect(currentValue).toBe('day');

      await guxSwitchItemHour.click();
      await page.waitForChanges();

      expect(await element.getProperty('value')).toBe(currentValue);
    });

    it(`should emit a 'change' and 'input' event when a new item is selected`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-switch-legacy');
      const guxSwitchItemMinute = await page.find(
        'gux-switch-item[value=minute]'
      );

      const spyOnInputEvent = await element.spyOnEvent('input');
      const spyOnChangeEvent = await element.spyOnEvent('change');

      await guxSwitchItemMinute.click();
      await page.waitForChanges();

      expect(spyOnInputEvent.length).toBe(1);
      expect(spyOnChangeEvent.length).toBe(1);
    });

    it(`should not emit a 'change' or 'input' event when a disabled item is selected`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-switch-legacy');
      const guxSwitchItemHour = await page.find('gux-switch-item[value=hour]');

      const spyOnInputEvent = await element.spyOnEvent('input');
      const spyOnChangeEvent = await element.spyOnEvent('change');

      await guxSwitchItemHour.click();
      await page.waitForChanges();

      expect(spyOnInputEvent.length).toBe(0);
      expect(spyOnChangeEvent.length).toBe(0);
    });
  });

  describe('onSlotchange', () => {
    it(`should set selected item as expected`, async () => {
      const page = await newSparkE2EPage({
        html: `
        <gux-switch-legacy lang="en" layout="small" value="month">
          <gux-switch-item value="week">Week</gux-switch-item>
          <gux-switch-item value="day">Day</gux-switch-item>
          <gux-switch-item value="hour" disabled>Hour</gux-switch-item>
          <gux-switch-item value="minute">Minute</gux-switch-item>
        </gux-switch-legacy>
      `
      });
      const element = await page.find('gux-switch-legacy');

      await page.evaluate(() => {
        const weekElement = document.querySelector(
          'gux-switch-item[value=week]'
        );

        const monthElement = document.createElement('gux-switch-item');
        monthElement.appendChild(document.createTextNode('Month'));
        monthElement.setAttribute('value', 'month');

        weekElement.insertAdjacentElement('beforebegin', monthElement);
      });

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
