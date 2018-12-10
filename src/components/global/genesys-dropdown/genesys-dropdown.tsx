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
   * Sets the select mode (default, page or palette).
   */
  @Prop()
  mode: string = 'default';
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
   * The input label position (can be left or top) if not defined the position depends of the label width.
   */
  @Prop({ reflectToAttr: true, mutable: true })
  labelPosition: string = 'left';
  /**
   * The list items, an item contains a `text` and can be disabled.
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

  @State()
  forcedGhostValue: string;

  inputIsFocused: boolean = false;

  @Listen('focusout')
  onFocusOut (e: FocusEvent) {
    if (!e.relatedTarget || !this.root.contains(e.relatedTarget as Node)) {
      this.opened = false;
      this.forcedGhostValue = '';
    }
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KeyCode.Up:
      case KeyCode.Down:
        if (this.inputIsFocused) {
          this.opened = true;
          setTimeout (() => { this.listElement.setFocusOnFirstItem() });
        }
        break;
      case KeyCode.Enter:
      case KeyCode.Space:
        break;
      default:
        if (!this.filterable) {
          const arr = this.items.filter((item) => {
            return item.text.startsWith(event.key);
          });
          if (arr[0]) { arr[0].el.focus(); }
        }
    }
  }

  setValue (text) {
    this.value = text;
    this.opened = false;
  }
  _clickHandler () {
    if (!this.disabled) {
      this.opened = !this.opened;
    }
  }
  _focusHandler () {
    this.inputIsFocused = true;
  }
  _focusListItemHandler (item: IListItem) {
    this.forcedGhostValue = this.value + item.text.substring(this.value.length);
  }
  _blurHandler () {
    this.inputIsFocused = false;
    this.forcedGhostValue = '';
  }
  _inputHandler (event: CustomEvent) {
    this.value = event.detail;
    this.opened = true;
  }

  _showDropdownIcon () {
    return (this.filterable ? (!this.value) : (true));
  }

  get filteredItems () {
    if (this.filterable) {
      const arr = this.items.filter((item) => {
        return item.text.toLowerCase().startsWith(this.value.toLowerCase());
      });
      return arr;
    } else {
      return this.items;
    }
  }

  get ghost () {
    const firstFilteredItem = (this.filteredItems.length) ? this.filteredItems[0].text : '';
    const debug = this.value + firstFilteredItem.substring(this.value.length);
    const ghost = (this.forcedGhostValue) ? this.forcedGhostValue : debug;
    // const firstFilteredItem = (this.filteredItems.length) ? this.filteredItems[0].text : '';
    // const ghost = (this.forcedGhostValue) ? this.forcedGhostValue : firstFilteredItem;
    const placeholder = (!this.value) ? this.placeholder : '';
    return (this.opened && this.filterable) ? ghost : placeholder;
  }

  componentWillLoad () {
    if (this.label && this.label.length > 10) {
      this.labelPosition = 'top';
    }
  }

  componentDidLoad () {
    if (!this.filterable) {
      this.textFieldElement.readonly = true;
    }
  }

  render() {
    return (
      <div class={`genesys-dropdown ${this.mode} ${this.mode} ${this.disabled ? 'disabled' : ''} ${this.opened ? 'active' : ''}`}
        onKeyDown={(e) => this.onKeyDown(e)}>
        {this.label && <label>{this.label}</label>}
        <div class="select-field">
          <span class="ghost" aria-hidden="true">{this.ghost}</span>
          <genesys-text-field
            ref={el => (this.textFieldElement = el as HTMLGenesysTextFieldElement)}
            onMouseDown={() => { this._clickHandler() }}
            onFocus={() => { this._focusHandler() }}
            onBlur={() => { this._blurHandler() }}
            onInput={(e) => { this._inputHandler(e) }}
            value={this.value}
            disabled={this.disabled}>
          </genesys-text-field>
          {this._showDropdownIcon() && <button aria-hidden="true" tabindex="-1" type="button" class="genesys-icon-dropdown-arrow"/>}
        </div>
        <genesys-list
          ref={el => (this.listElement = el as HTMLGenesysListElement)}
          onChange={(e) => { this.setValue(e.detail) }}
          onFocus={(e) => { this._focusListItemHandler(e.detail as IListItem) }}
          class={this.opened ? "opened" : ""}
          items={this.filteredItems}
          highlight={this.value}>
        </genesys-list>
      </div>
    );
  }
}
