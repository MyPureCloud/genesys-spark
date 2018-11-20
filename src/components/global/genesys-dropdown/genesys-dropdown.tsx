import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { KeyCode } from '../../../common-enums';
import { IListItem } from '../../../common-interfaces';

@Component({
  tag: 'genesys-dropdown',
  styleUrl: 'genesys-dropdown.less'
})
export class GenesysDropdown {
  @Element()
  root: HTMLStencilElement;
  textFieldElement: HTMLGenesysTextFieldElement;
  listElement: HTMLGenesysListElement;

  /**
   * Indicate the dropdown input value
   */
  @Prop({ mutable: true, reflectToAttr: true })
  value: string = '';
  /**
   * The dropdown placeholder.
   */
  @Prop()
  placeholder: string;
  /**
   * The dropdown label.
   */
  @Prop()
  label: string;
  /**
   * The list.
   * each item should contain a text and a type
   * an item could have the property isDisabled
   */
  @Prop()
  items: IListItem[] = [];
  /**
   * Whether the user can filter or not.
   */
  @Prop()
  filterable: boolean;

  @State()
  opened: boolean;

  inputIsFocused: boolean = false;

  @Listen('focusout')
  onFocusOut (e: FocusEvent) {
    if (!this.root.contains(e.relatedTarget as Node)) {
      this.opened = false;
      return;
    }
  }

  setValue (text) {
    this.value = text;
    this.opened = false;
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KeyCode.Enter:
      case KeyCode.Space:
        //
        break;
      case KeyCode.Up:
        //
        break;
      case KeyCode.Home:
        //
        break;
      case KeyCode.Down:
        if (this.inputIsFocused) {
          this.listElement.focusFirstFocusable();
        }
        break;
      case KeyCode.End:
        //
        break;
    }
  }

  _focusHandler () {
    this.inputIsFocused = true;
    this.opened = true;
    if (!this.filterable) {
      this.listElement.focusFirstFocusable();
    }
  }
  _blurHandler () {
    this.inputIsFocused = false;
  }

  _inputHandler (event: CustomEvent) {
    this.value = event.detail;
    if (!this.filterable) {
      // Cancel event
      this.value = '';
      event.preventDefault();
      event.stopPropagation();
    }
  }

  render() {
    return (
      <div class="genesys-dropdown"
      onKeyDown={(e) => this.onKeyDown(e)}>
        <div class="header">
          <genesys-text-field
            ref={el => (this.textFieldElement = el as HTMLGenesysTextFieldElement)}
            onMouseDown={() => { this.opened = !this.opened }}
            onFocus={() => { this._focusHandler() }}
            onBlur={() => { this._blurHandler() }}
            onInput={(e) => { this._inputHandler(e) }}
            value={this.value}
            label={this.label}
            placeholder={this.placeholder}>
          </genesys-text-field>
          {!this.value && <button aria-hidden="true" tabindex="-1" type="button" class="genesys-icon-dropdown-arrow"/>}
        </div>
        <genesys-list
          ref={el => (this.listElement = el as HTMLGenesysListElement)}
          onChange={(e) => { this.setValue(e.detail.text) }}
          class={this.opened ? "opened" : ""}
          items={this.items}>
        </genesys-list>
      </div>
    );
  }
}
