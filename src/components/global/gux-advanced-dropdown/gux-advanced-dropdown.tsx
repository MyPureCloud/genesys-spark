import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { KeyCode } from '../../../common-enums';
import { IListItem } from '../../../common-interfaces';

@Component({
  styleUrl: 'gux-advanced-dropdown.less',
  tag: 'gux-advanced-dropdown'
})
export class GuxAdvancedDropdown {
  @Element()
  root: HTMLStencilElement;
  searchElement: HTMLGuxSearchElement;

  /**
   * The list items, an item contains a `text` and can be disabled.
   */
  @Prop()
  items: IListItem[] = [];

  /**
   * Disable the input and prevent interactions.
   */
  @Prop()
  disabled: boolean = false;

  /**
   * The dropdown label.
   */
  @Prop()
  label: string;

  /**
   * The dropdown placeholder.
   */
  @Prop()
  placeholder: string;

  @State()
  opened: boolean;
  value: string;
  searchInput: string = '';

  @Listen('focusout')
  onFocusOut(e: FocusEvent) {
    if (!e.relatedTarget || !this.root.contains(e.relatedTarget as Node)) {
      this.opened = false;
    }
  }

  render() {
    return (
      <div
        class={`gux-dropdown ${this.disabled ? 'disabled' : ''} ${
          this.opened ? 'active' : ''
        }`}
      >
        {this.label && <label>{this.label}</label>}
        <div class="gux-select-field">
          <a
            class="gux-select-input"
            tabindex="0"
            onMouseDown={() => {
              this._clickHandler();
            }}
            onKeyDown={e => this._onKeyDown(e)}
          >
            {this.placeholder &&
              !this.value && (
                <span class="select-placeholder">{this.placeholder}</span>
              )}
            {this.value && <span class="select-value">{this.value}</span>}
          </a>
          <button
            aria-hidden="true"
            tabindex="-1"
            type="button"
            class="genesys-icon-dropdown-arrow"
          />
        </div>
        <div class={`advanced-dropdown-menu ${this.opened ? 'opened' : ''}`}>
          <div class="dropdown-menu-container">
            <gux-search
              ref={el => (this.searchElement = el as HTMLGuxSearchElement)}
              class="gux-light-theme"
              dynamic-search="true"
              onSearch={e => this._inputHandler(e)}
            />
            <gux-list
              onChange={e => {
                this._setValue(e.detail);
              }}
              items={this.filteredItems}
              highlight={this.searchInput}
            />
          </div>
        </div>
      </div>
    );
  }

  private _setValue(text: string) {
    this.value = text;
    this.opened = false;
  }

  private _clickHandler() {
    if (this.disabled) {
      return;
    }
    this.opened = !this.opened;
    if (this.opened) {
      this.changeFocusToSearch();
    }
  }

  private _onKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KeyCode.Up:
      case KeyCode.Down:
      case KeyCode.Space:
        this.opened = true;
        this.changeFocusToSearch();
        break;
      default:
    }
  }

  private changeFocusToSearch() {
    setTimeout(() => {
      // this.searchElement.setInputFocus();
    });
  }

  private _inputHandler(event: CustomEvent) {
    this.searchInput = event.detail;
  }

  private get filteredItems() {
    const arr = this.items.filter(item => {
      return item.text.toLowerCase().startsWith(this.searchInput.toLowerCase());
    });

    return arr;
  }
}
