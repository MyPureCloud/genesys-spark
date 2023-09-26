import { newSpecPage } from '@stencil/core/testing';

import { GuxSegmentedControl } from '../gux-segmented-control';
import { GuxSegmentedControlItem } from '../gux-segmented-control-item/gux-segmented-control-item';

const components = [GuxSegmentedControl, GuxSegmentedControlItem];
const html = `
  <gux-segmented-control-beta value="day">
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
const language = 'en';

describe('gux-segmented-control-beta', () => {
  beforeAll(async () => {
    (
      global as NodeJS.Global & {
        InputEvent: typeof Event;
      }
    ).InputEvent = Event;
  });

  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxSegmentedControl);
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('#interactions', () => {
    it(`should change value on gux-segmented-control-item click`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxSegmentedControlBetaElement;
      const guxSegmentedControlItemMinute: HTMLGuxSegmentedControlItemElement =
        page.root.querySelector('gux-segmented-control-item[value=minute]');

      expect(element.value).toBe('day');

      guxSegmentedControlItemMinute.click();
      await page.waitForChanges();

      expect(element.value).toBe(guxSegmentedControlItemMinute.value);
    });

    it(`should not change value on gux-segmented-control-item click if it is disabled`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxSegmentedControlBetaElement;
      const guxSegmentedControlItemHour: HTMLGuxSegmentedControlItemElement =
        page.root.querySelector('gux-segmented-control-item[value=hour]');
      const currentValue = element.value;

      expect(currentValue).toBe('day');

      guxSegmentedControlItemHour.click();
      await page.waitForChanges();

      expect(element.value).toBe(currentValue);
    });

    it(`should emit a 'change' and 'input' event when a new item is selected`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxSegmentedControlBetaElement;
      const guxSegmentedControlItemMinute: HTMLGuxSegmentedControlItemElement =
        page.root.querySelector('gux-segmented-control-item[value=minute]');
      const changeEventSpy = jest.fn();
      const inputEventSpy = jest.fn();

      element.addEventListener('change', () => {
        changeEventSpy();
      });
      element.addEventListener('input', () => {
        inputEventSpy();
      });

      guxSegmentedControlItemMinute.click();
      await page.waitForChanges();

      expect(changeEventSpy).toHaveBeenCalledWith();
      expect(inputEventSpy).toHaveBeenCalledWith();
    });

    it(`should not emit a 'change' and 'input' event when the selected item is reselected`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxSegmentedControlBetaElement;
      const guxSegmentedControlItemDay: HTMLGuxSegmentedControlItemElement =
        page.root.querySelector('gux-segmented-control-item[value=day]');
      const changeEventSpy = jest.fn();
      const inputEventSpy = jest.fn();

      element.addEventListener('change', () => {
        changeEventSpy();
      });
      element.addEventListener('input', () => {
        inputEventSpy();
      });

      guxSegmentedControlItemDay.click();
      await page.waitForChanges();

      expect(changeEventSpy).not.toHaveBeenCalled();
      expect(inputEventSpy).not.toHaveBeenCalled();
    });

    it(`should not emit a 'change' or 'input' event when a disabled item is selected`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxSegmentedControlBetaElement;
      const guxSegmentedControlItemHour: HTMLGuxSegmentedControlItemElement =
        page.root.querySelector('gux-segmented-control-item[value=hour]');
      const changeEventSpy = jest.fn();
      const inputEventSpy = jest.fn();

      element.addEventListener('change', () => {
        changeEventSpy();
      });
      element.addEventListener('input', () => {
        inputEventSpy();
      });

      guxSegmentedControlItemHour.click();
      await page.waitForChanges();

      expect(changeEventSpy).not.toHaveBeenCalled();
      expect(inputEventSpy).not.toHaveBeenCalled();
    });
  });

  describe('onSlotchange', () => {
    it(`should set selected items as expected`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = document.querySelector('gux-segmented-control-beta');

      const newItem = document.createElement('gux-segmented-control-item');
      newItem.appendChild(document.createTextNode('Second'));
      newItem.setAttribute('value', 'second');
      element.appendChild(newItem);

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    // onSlotchange is not getting called as expected in the unit tests so it tested manually below
    it('manually call onSlotchange methods', async () => {
      const page = await newSpecPage({ components, html, language });
      const elementController: GuxSegmentedControl = page.rootInstance;

      expect(elementController.items).toHaveLength(0);

      (elementController as any).slotChanged();
      elementController.componentWillRender();

      expect(elementController.items).toHaveLength(5);
    });
  });
});
