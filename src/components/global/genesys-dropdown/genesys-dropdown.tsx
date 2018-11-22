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
   * Disable the input and prevent interactions.
   */
  @Prop()
  disabled: boolean = false;
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
          this.listElement.focus();
        }
        break;
      case KeyCode.End:
        //
        break;
    }
  }

  _clickHandler () {
    if (!this.disabled) {
      this.opened = !this.opened
    }
  }
  _focusHandler () {
    this.inputIsFocused = true;
    this.opened = true;
  }
  _blurHandler () {
    this.inputIsFocused = false;
  }
  _inputHandler (event: CustomEvent) {
    this.value = event.detail;
  }

  _showDropdownIcon () {
    return (this.filterable ? (!this.value) : (true));
  }

  get filteredItems () {
    return this.items.filter((item) => {
      if (!this.filterable || item.text.startsWith(this.value)) {
        return item;
      }
    });
  }

  get ghost () {
    if (!this.value) {
      return ((this.filterable && this.inputIsFocused) ? this.filteredItems[0].text : this.placeholder);
    } else {
      return '';
    }
  }

  componentDidLoad () {
    if (!this.filterable) {
      this.textFieldElement.readonly = true;
    }
  }

  render() {
    return (
      <div class="genesys-dropdown"
      onKeyDown={(e) => this.onKeyDown(e)}>
        <div class="header">
          <span class="ghost" aria-hidden="true" tabindex="-1">{this.ghost}</span>
          <genesys-text-field
            ref={el => (this.textFieldElement = el as HTMLGenesysTextFieldElement)}
            onMouseDown={() => { this._clickHandler() }}
            onFocus={() => { this._focusHandler() }}
            onBlur={() => { this._blurHandler() }}
            onInput={(e) => { this._inputHandler(e) }}
            value={this.value}
            label={this.label}
            disabled={this.disabled}>
          </genesys-text-field>
          {this._showDropdownIcon() && <button aria-hidden="true" tabindex="-1" type="button" class="genesys-icon-dropdown-arrow"/>}
        </div>
        <genesys-list
          ref={el => (this.listElement = el as HTMLGenesysListElement)}
          onChange={(e) => { this.setValue(e.detail) }}
          class={this.opened ? "opened" : ""}
          items={this.filteredItems}>
        </genesys-list>
      </div>
    );
  }
}
