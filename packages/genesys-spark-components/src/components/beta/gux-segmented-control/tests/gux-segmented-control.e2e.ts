import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-segmented-control-beta', () => {
  const html = `
  <gux-segmented-control-beta lang="en" value="day">
    <gux-segmented-control-item value="month">
      <div slot="text">Month</div>
    </gux-segmented-control-item>
    <gux-segmented-control-item value="week">
      <div slot="text">Week</div>
    </gux-segmented-control-item>
    <gux-segmented-control-item value="day">
      <div slot="text">Day</div>
    </gux-segmented-control-item>
    <gux-segmented-control-item value="hour" disabled>
      <div slot="text">Hour</div>
    </gux-segmented-control-item>
    <gux-segmented-control-item value="minute">
      <div slot="text">Minute</div>
    </gux-segmented-control-item>
  </gux-segmented-control-beta>
`;
  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-segmented-control-beta');
      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });

  describe('#interactions', () => {
    it(`should change value on gux-segmented-control-item click`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-segmented-control-beta');
      const guxSegmentedControlItemMinute = await page.find(
        'gux-segmented-control-item[value=minute]'
      );

      expect(await element.getProperty('value')).toBe('day');

      await guxSegmentedControlItemMinute.click();
      await page.waitForChanges();

      expect(await element.getProperty('value')).toBe(
        await guxSegmentedControlItemMinute.getProperty('value')
      );
    });

    it(`should not change value on gux-segmented-control-item click if it is disabled`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-segmented-control-beta');
      const guxSegmentedControlItemHour = await page.find(
        'gux-segmented-control-item[value=hour]'
      );
      const currentValue = await element.getProperty('value');

      expect(currentValue).toBe('day');

      await guxSegmentedControlItemHour.click();
      await page.waitForChanges();

      expect(await element.getProperty('value')).toBe(currentValue);
    });

    it(`should emit a 'change' and 'input' event when a new item is selected`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-segmented-control-beta');
      const guxSegmentedControlItemMinute = await page.find(
        'gux-segmented-control-item[value=minute]'
      );

      const spyOnInputEvent = await element.spyOnEvent('input');
      const spyOnChangeEvent = await element.spyOnEvent('change');

      await guxSegmentedControlItemMinute.click();
      await page.waitForChanges();

      expect(spyOnInputEvent.length).toBe(1);
      expect(spyOnChangeEvent.length).toBe(1);
    });

    it(`should not emit a 'change' or 'input' event when a disabled item is selected`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-segmented-control-beta');
      const guxSegmentedControlItemHour = await page.find(
        'gux-segmented-control-item[value=hour]'
      );

      const spyOnInputEvent = await element.spyOnEvent('input');
      const spyOnChangeEvent = await element.spyOnEvent('change');

      await guxSegmentedControlItemHour.click();
      await page.waitForChanges();

      expect(spyOnInputEvent.length).toBe(0);
      expect(spyOnChangeEvent.length).toBe(0);
    });
  });

  describe('onSlotchange', () => {
    it(`should set selected item as expected`, async () => {
      const page = await newSparkE2EPage({
        html: `
        <gux-segmented-control-beta lang-"en" value="month">
          <gux-segmented-control-item value="week">
            <div slot="text">Week</div>
          </gux-segmented-control-item>
          <gux-segmented-control-item value="day">
            <div slot="text">Day</div>
          </gux-segmented-control-item>
          <gux-segmented-control-item value="hour" disabled>
            <div slot="text">Hour</div>
          </gux-segmented-control-item>
          <gux-segmented-control-item value="minute">
            <div slot="text">Minute</div>
          </gux-segmented-control-item>
        </gux-segmented-control-beta>
      `
      });
      const element = await page.find('gux-segmented-control-beta');

      await page.evaluate(() => {
        const weekElement = document.querySelector(
          'gux-segmented-control-item[value=week]'
        );

        const monthElement = document.createElement(
          'gux-segmented-control-item'
        );
        const textElement = document.createElement('div');
        textElement.setAttribute('slot', 'text');
        textElement.appendChild(document.createTextNode('Month'));
        monthElement.appendChild(textElement);

        monthElement.setAttribute('value', 'month');

        weekElement.insertAdjacentElement('beforebegin', monthElement);
      });

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
