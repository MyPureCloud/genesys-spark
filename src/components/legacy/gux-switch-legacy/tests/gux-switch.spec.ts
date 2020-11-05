import { newSpecPage } from '@stencil/core/testing';
import { KeyCode } from '../../../../common-enums';
import { GuxSwitch } from '../gux-switch';
import { ISwitchItem } from '../gux-switch.constants';

describe('gux-switch', () => {
  let component: GuxSwitch;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxSwitch],
      html: `<gux-switch-legacy></gux-switch-legacy>`,
      language: 'en'
    });

    component = page.rootInstance;

    component.items = [
      {
        displayName: 'Month',
        value: 'Month'
      },
      {
        displayName: 'Week',
        value: 'Week'
      },
      {
        displayName: 'Day',
        value: 'Day'
      },
      {
        displayName: 'Hour',
        isDisabled: true,
        value: 'Hour'
      }
    ];
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxSwitch);
  });

  describe('Class Logic', () => {
    describe('selectSwitchAtIndex', () => {
      it('should set the `selectedValue` property', () => {
        const changedSpy = jest.fn();
        component.selectionChanged = {
          emit: changedSpy
        };
        spyOn(component.selectionChanged, 'emit');

        component.selectSwitchAtIndex(2);

        expect(component.selectedValue).toEqual(component.items[2].value);
        expect(component.selectionChanged.emit).toHaveBeenCalledWith(
          component.items[2].value
        );
      });
    });

    describe('onKeyDownAtIndex', () => {
      it('should set the `selectedValue` property on keypress only if the key is enter', () => {
        const event = { keyCode: KeyCode.Enter } as KeyboardEvent;
        const changedSpy = jest.fn();
        component.selectionChanged = {
          emit: changedSpy
        };
        spyOn(component.selectionChanged, 'emit');

        component.selectedValue = component.items[0].value;

        component.onKeyDownAtIndex(2, event);

        expect(component.selectedValue).toEqual(component.items[2].value);
        expect(component.selectionChanged.emit).toHaveBeenCalledWith(
          component.items[2].value
        );
      });

      it('should set the `selectedValue` property on keypress only if the key is space', () => {
        const event = { keyCode: KeyCode.Space } as KeyboardEvent;
        const changedSpy = jest.fn();
        component.selectionChanged = {
          emit: changedSpy
        };
        spyOn(component.selectionChanged, 'emit');

        component.selectedValue = component.items[0].value;

        component.onKeyDownAtIndex(2, event);

        expect(component.selectedValue).toEqual(component.items[2].value);
        expect(component.selectionChanged.emit).toHaveBeenCalledWith(
          component.items[2].value
        );
      });

      it('should not change the `selectedValue` property on keypress it is not enter/space', () => {
        const event = { keyCode: KeyCode.Up } as KeyboardEvent;
        const changedSpy = jest.fn();
        component.selectionChanged = {
          emit: changedSpy
        };
        spyOn(component.selectionChanged, 'emit');

        component.selectedValue = component.items[0].value;

        component.onKeyDownAtIndex(2, event);

        expect(component.selectedValue).toEqual(component.items[0].value);
        expect(component.selectionChanged.emit).not.toHaveBeenCalled();
      });

      it('should not change the `selectedValue` property on keypress it is disabled', () => {
        const event = {
          keyCode: KeyCode.Up,
          stopPropagation: jest.fn()
        } as any;
        const changedSpy = jest.fn();
        component.selectionChanged = {
          emit: changedSpy
        };
        spyOn(component.selectionChanged, 'emit');

        component.selectedValue = component.items[0].value;

        component.onKeyDownAtIndex(3, event);

        expect(component.selectedValue).toEqual(component.items[0].value);
        expect(component.selectionChanged.emit).not.toHaveBeenCalled();
      });
    });

    describe('classForSwtichItemAtIndex', () => {
      it('should return the correct class string for a small switch that is not disabled', () => {
        component.layout = 'small';
        component.selectedValue = 'test';
        const item: ISwitchItem = {
          displayName: 'testVal',
          isDisabled: false,
          value: 'val'
        };
        expect(component.classForSwtichItemAtIndex(item)).toEqual(
          'gux-switch small'
        );
      });

      it('should return the correct class string for a medium switch that is disabled', () => {
        component.layout = 'medium';
        component.selectedValue = 'test';
        const item: ISwitchItem = {
          displayName: 'testVal',
          isDisabled: true,
          value: 'val'
        };
        expect(component.classForSwtichItemAtIndex(item)).toEqual(
          'gux-switch medium disabled'
        );
      });

      it('should return the correct class string for a medium switch that is selected', () => {
        component.layout = 'large';
        component.selectedValue = 'test';
        const item: ISwitchItem = {
          displayName: 'testVal',
          isDisabled: false,
          value: 'test'
        };
        expect(component.classForSwtichItemAtIndex(item)).toEqual(
          'gux-switch large selected'
        );
      });
    });
  });
});
