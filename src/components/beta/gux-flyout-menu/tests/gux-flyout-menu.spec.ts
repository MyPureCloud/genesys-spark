import { newSpecPage } from '@stencil/core/testing';

import { GuxFlyoutMenu } from '../gux-flyout-menu';
import { GuxMenu } from '../gux-menu/gux-menu';
import { GuxSubmenu } from '../gux-menu/gux-submenu/gux-submenu';
import { GuxMenuOption } from '../gux-menu/gux-menu-option/gux-menu-option';

const components = [GuxFlyoutMenu, GuxMenu, GuxSubmenu, GuxMenuOption];
const html = `
  <gux-flyout-menu-beta>
    <span slot="target">Example Target Element</span>
    <gux-menu slot="menu">
      <gux-menu-option>Option One</gux-menu-option>
      <gux-submenu label="Submenu Two">
        <gux-menu-option>Option One</gux-menu-option>
        <gux-submenu label="Submenu Two">
          <gux-menu-option>Option One</gux-menu-option>
          <gux-menu-option>Option Two</gux-menu-option>
          <gux-menu-option>Option Three</gux-menu-option>
        </gux-submenu>
        <gux-menu-option>Option Three</gux-menu-option>
      </gux-submenu>
      <gux-menu-option>Option Three</gux-menu-option>
      <gux-menu-option>Option Four</gux-menu-option>
      <gux-submenu label="Submenu Five">
        <gux-menu-option>Option One</gux-menu-option>
        <gux-menu-option>Option Two</gux-menu-option>
        <gux-submenu label="Submenu Three">
          <gux-menu-option>Option One</gux-menu-option>
          <gux-submenu label="Submenu Two">
            <gux-menu-option>Option One</gux-menu-option>
            <gux-submenu label="Submenu Two">
              <gux-menu-option>Option One</gux-menu-option>
              <gux-menu-option>Option Two</gux-menu-option>
              <gux-menu-option>Option Three</gux-menu-option>
            </gux-submenu>
            <gux-menu-option>Option Three</gux-menu-option>
          </gux-submenu>
          <gux-menu-option>Option Three</gux-menu-option>
        </gux-submenu>
      </gux-submenu>
    </gux-menu>
  </gux-flyout-menu-beta>
`;
const language = 'en';

describe('gux-flyout-menu', () => {
  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxFlyoutMenu);
      expect(page.root).toMatchSnapshot();
    });
  });

  // describe('#interactions', () => {
  //   it(`should change value on gux-switch-item click`, async () => {
  //     const page = await newSpecPage({ components, html, language });
  //     const element = page.root as HTMLGuxSwitchBetaElement;
  //     const guxSwitchItemMinute = page.root.querySelector(
  //       'gux-switch-item[value=minute]'
  //     ) as HTMLGuxSwitchItemElement;

  //     expect(element.value).toBe('day');

  //     guxSwitchItemMinute.click();
  //     await page.waitForChanges();

  //     expect(element.value).toBe(guxSwitchItemMinute.value);
  //   });

  //   it(`should not change value on gux-switch-item click if it is disabled`, async () => {
  //     const page = await newSpecPage({ components, html, language });
  //     const element = page.root as HTMLGuxSwitchBetaElement;
  //     const guxSwitchItemHour = page.root.querySelector(
  //       'gux-switch-item[value=hour]'
  //     ) as HTMLGuxSwitchItemElement;
  //     const currentValue = element.value;

  //     expect(currentValue).toBe('day');

  //     guxSwitchItemHour.click();
  //     await page.waitForChanges();

  //     expect(element.value).toBe(currentValue);
  //   });

  //   it(`should emit a 'guxvaluechanged' event when a new item is selected`, async () => {
  //     const page = await newSpecPage({ components, html, language });
  //     const element = page.root as HTMLGuxSwitchBetaElement;
  //     const guxSwitchItemMinute = page.root.querySelector(
  //       'gux-switch-item[value=minute]'
  //     ) as HTMLGuxSwitchItemElement;
  //     const eventSpy = jest.fn();

  //     element.addEventListener('guxvaluechanged', () => {
  //       eventSpy();
  //     });

  //     guxSwitchItemMinute.click();
  //     await page.waitForChanges();

  //     expect(eventSpy).toHaveBeenCalledWith();
  //   });

  //   it(`should not emit a 'guxvaluechanged' event when a disabled item is selected`, async () => {
  //     const page = await newSpecPage({ components, html, language });
  //     const element = page.root as HTMLGuxSwitchBetaElement;
  //     const guxSwitchItemHour = page.root.querySelector(
  //       'gux-switch-item[value=hour]'
  //     ) as HTMLGuxSwitchItemElement;
  //     const eventSpy = jest.fn();

  //     element.addEventListener('guxvaluechanged', () => {
  //       eventSpy();
  //     });

  //     guxSwitchItemHour.click();
  //     await page.waitForChanges();

  //     expect(eventSpy).not.toHaveBeenCalled();
  //   });
  // });
});
