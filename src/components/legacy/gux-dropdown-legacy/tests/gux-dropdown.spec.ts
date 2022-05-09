import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxDropdownLegacy } from '../gux-dropdown';
import { GuxOptionLegacy } from '../gux-option-legacy/gux-option';

describe('gux-dropdown-legacy', () => {
  let component: GuxDropdownLegacy;

  beforeEach(async () => {
    global.MutationObserver = MutationObserver;

    const page = await newSpecPage({
      components: [GuxDropdownLegacy, GuxOptionLegacy],
      html: `
      <gux-dropdown-legacy>
        <gux-option-legacy value="en-US">American English</gux-option-legacy>
        <gux-option-legacy value="es">Latin American Spanish</gux-option-legacy>
        <gux-option-legacy value="es-ES">European Spanish</gux-option-legacy>
        <gux-option-legacy value="en-UK">UK English</gux-option-legacy>
        <gux-option-legacy value="fr-CA" text= "Canadian French">American French</gux-option-legacy>
        <gux-option-legacy value="fr" text="European French"></gux-option-legacy>
        <gux-option-legacy>Dutch</gux-option-legacy>
      </gux-dropdown-legacy>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxDropdownLegacy);
  });

  describe('Class Logic', () => {
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
      it('_focusListItemHandler responds to events from options', () => {
        const value = 'dummy';
        const option = document.createElement('gux-option-legacy');
        option.setAttribute('text', value);
        const event = { target: option } as unknown as FocusEvent;
        component._optionFocusedHandler(event);
        expect(component.forcedGhostValue).toEqual(value);
      });
      it('_focusListItemHandler ignores events not from options', () => {
        const value = 'dummy';
        const event = {
          target: document.createElement('div')
        } as unknown as FocusEvent;

        component._optionFocusedHandler(event);
        expect(component.forcedGhostValue).not.toEqual(value);
      });
      it('_blurHandler', () => {
        component._blurHandler();
        expect(component.inputIsFocused).toEqual(false);
        expect(component.forcedGhostValue).toEqual('');
      });

      it('getFilteredItems()', () => {
        component.filterable = false;
        expect(component.getFilteredItems().map(opt => opt.text)).toEqual([
          'American English',
          'Latin American Spanish',
          'European Spanish',
          'UK English',
          'Canadian French',
          'European French',
          'Dutch'
        ]);
        component.filterable = true;
        component.value = 'Eu';
        expect(component.getFilteredItems().map(opt => opt.text)).toEqual([
          'European Spanish',
          'European French'
        ]);
        component.filterable = true;
        component.value = 'eu';
        expect(component.getFilteredItems().map(opt => opt.text)).toEqual([
          'European Spanish',
          'European French'
        ]);
        component.value = 'Ame';
        expect(component.getFilteredItems().map(opt => opt.text)).toEqual([
          'American English'
        ]);
        component.value = 'Ind';
        expect(component.getFilteredItems().map(opt => opt.text)).toEqual([]);
      });

      it('getSuggestionText', () => {
        const filter = 'Ame';
        component.opened = true;
        component.filterable = true;
        expect(component.getSuggestionText(filter)).toEqual('rican English');
        component.opened = false;
        component.value = '';
        component.filterable = false;
        component.placeholder = 'Select...';
        expect(component.getSuggestionText(filter)).toEqual('');
      });
    });
  });
});
