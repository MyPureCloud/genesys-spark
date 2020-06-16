import { newSpecPage } from '@stencil/core/testing';
import { GuxDropdown } from '../gux-dropdown';

describe('gux-dropdown', () => {
  let component: GuxDropdown;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxDropdown],
      html: `<gux-dropdown></gux-dropdown>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxDropdown);
  });

  describe('Class Logic', () => {
    // const items = [{ text: 'Belgium' }, { text: 'Brazil' }];
    // const thirdItem = { text: 'France' };

    // beforeEach(async () => {
    //   // component.items = [...items, thirdItem];
    // });

    describe('methods', () => {
      it('setValue', () => {
        const value = 'dummy';
        const text = 'dummyText';
        spyOn(component, 'emitChange').and.callFake(() => {
          return;
        });
        component.setValue(text, value);
        expect(component.value).toEqual(text);
        expect(component.emitChange).toHaveBeenCalledWith(value);
      });
      it('_clickHandler', () => {
        component.disabled = false;
        component.opened = true;
        component._clickHandler();
        expect(component.opened).toEqual(false);
      });
      it('_focusHandler', () => {
        component._focusHandler();
        expect(component.inputIsFocused).toEqual(true);
      });
      it('_focusListItemHandler', () => {
        const value = 'dummy';
        component._focusOptionItemHandler(value);
        expect(component.forcedGhostValue).toEqual(value);
      });
      it('_blurHandler', () => {
        component._blurHandler();
        expect(component.inputIsFocused).toEqual(false);
        expect(component.forcedGhostValue).toEqual('');
      });
      it('_inputHandler', () => {
        const value = 'dummy';
        component._inputHandler({ detail: value } as CustomEvent);
        expect(component.value).toEqual(value);
      });
    });
    describe('getters', () => {
      // it('filteredItems', () => {
      //   component.filterable = false;
      //   expect(component.filteredItems).toEqual([...items, thirdItem]);
      //   component.filterable = true;
      //   component.value = 'B';
      //   expect(component.filteredItems).toEqual(items);
      // });
      it('ghost', () => {
        component.opened = true;
        component.filterable = true;
        component.forcedGhostValue = 'Bel';
        expect(component.ghost).toEqual(component.forcedGhostValue);
        component.opened = false;
        component.value = '';
        component.filterable = false;
        component.placeholder = 'Select...';
        expect(component.ghost).toEqual(component.placeholder);
      });
    });
  });
});
