import { newSpecPage } from '@stencil/core/testing';

import { GuxSwitch } from '../gux-switch';
import { GuxSwitchItem } from '../gux-switch-item/gux-switch-item';

const components = [GuxSwitch, GuxSwitchItem];
const html = `
  <gux-switch-legacy layout="small" value="day">
    <gux-switch-item value="month">Month</gux-switch-item>
    <gux-switch-item value="week">Week</gux-switch-item>
    <gux-switch-item value="day">Day</gux-switch-item>
    <gux-switch-item value="hour" disabled>Hour</gux-switch-item>
    <gux-switch-item value="minute">Minute</gux-switch-item>
  </gux-switch-legacy>
`;
const language = 'en';

describe('gux-switch-legacy', () => {
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

      expect(page.rootInstance).toBeInstanceOf(GuxSwitch);
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('#interactions', () => {
    it(`should change value on gux-switch-item click`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxSwitchElement;
      const guxSwitchItemMinute: HTMLGuxSwitchItemElement =
        page.root.querySelector('gux-switch-item[value=minute]');

      expect(element.value).toBe('day');

      guxSwitchItemMinute.click();
      await page.waitForChanges();

      expect(element.value).toBe(guxSwitchItemMinute.value);
    });

    it(`should not change value on gux-switch-item click if it is disabled`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxSwitchElement;
      const guxSwitchItemHour: HTMLGuxSwitchItemElement =
        page.root.querySelector('gux-switch-item[value=hour]');
      const currentValue = element.value;

      expect(currentValue).toBe('day');

      guxSwitchItemHour.click();
      await page.waitForChanges();

      expect(element.value).toBe(currentValue);
    });

    it(`should emit a 'change' and 'input' event when a new item is selected`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxSwitchElement;
      const guxSwitchItemMinute: HTMLGuxSwitchItemElement =
        page.root.querySelector('gux-switch-item[value=minute]');
      const changeEventSpy = jest.fn();
      const inputEventSpy = jest.fn();

      element.addEventListener('change', () => {
        changeEventSpy();
      });
      element.addEventListener('input', () => {
        inputEventSpy();
      });

      guxSwitchItemMinute.click();
      await page.waitForChanges();

      expect(changeEventSpy).toHaveBeenCalledWith();
      expect(inputEventSpy).toHaveBeenCalledWith();
    });

    it(`should not emit a 'change' and 'input' event when the selected item is reselected`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxSwitchElement;
      const guxSwitchItemDay: HTMLGuxSwitchItemElement =
        page.root.querySelector('gux-switch-item[value=day]');
      const changeEventSpy = jest.fn();
      const inputEventSpy = jest.fn();

      element.addEventListener('change', () => {
        changeEventSpy();
      });
      element.addEventListener('input', () => {
        inputEventSpy();
      });

      guxSwitchItemDay.click();
      await page.waitForChanges();

      expect(changeEventSpy).not.toHaveBeenCalled();
      expect(inputEventSpy).not.toHaveBeenCalled();
    });

    it(`should not emit a 'change' or 'input' event when a disabled item is selected`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLGuxSwitchElement;
      const guxSwitchItemHour: HTMLGuxSwitchItemElement =
        page.root.querySelector('gux-switch-item[value=hour]');
      const changeEventSpy = jest.fn();
      const inputEventSpy = jest.fn();

      element.addEventListener('change', () => {
        changeEventSpy();
      });
      element.addEventListener('input', () => {
        inputEventSpy();
      });

      guxSwitchItemHour.click();
      await page.waitForChanges();

      expect(changeEventSpy).not.toHaveBeenCalled();
      expect(inputEventSpy).not.toHaveBeenCalled();
    });
  });

  describe('onSlotchange', () => {
    it(`should set selected items as expected`, async () => {
      const page = await newSpecPage({ components, html, language });
      const element = document.querySelector('gux-switch-legacy');

      const newItem = document.createElement('gux-switch-item');
      newItem.appendChild(document.createTextNode('Second'));
      newItem.setAttribute('value', 'second');
      element.appendChild(newItem);

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    // onSlotchange is not getting called as expected in the unit tests so it tested manually below
    it('manually call onSlotchange methods', async () => {
      const page = await newSpecPage({ components, html, language });
      const elementController: GuxSwitch = page.rootInstance;

      expect(elementController.switchItems).toHaveLength(0);

      (elementController as any).slotChanged();
      elementController.componentWillRender();

      expect(elementController.switchItems).toHaveLength(5);
    });
  });
});
