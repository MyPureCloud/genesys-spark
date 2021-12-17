import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxDropdown } from '../gux-dropdown';
import { GuxOption } from '../gux-option/gux-option';

describe('gux-dropdown', () => {
  let component: GuxDropdown;

  beforeEach(async () => {
    global.MutationObserver = MutationObserver;

    const page = await newSpecPage({
      components: [GuxDropdown, GuxOption],
      html: `
      <gux-dropdown>
        <gux-option value="en-US">American English</gux-option>
        <gux-option value="es">Latin American Spanish</gux-option>
        <gux-option value="es-ES">European Spanish</gux-option>
        <gux-option value="en-UK">UK English</gux-option>
        <gux-option value="fr-CA" text= "Canadian French">American French</gux-option>
        <gux-option value="fr" text="European French"></gux-option>
        <gux-option>Dutch</gux-option>
      </gux-dropdown>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxDropdown);
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
        const option = document.createElement('gux-option');
        option.setAttribute('text', value);
        const event = { target: option };
        component._optionFocusedHandler(event);
        expect(component.forcedGhostValue).toEqual(value);
      });
      it('_focusListItemHandler ignores events not from options', () => {
        const value = 'dummy';
        const event = {
          target: document.createElement('div')
        };

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
