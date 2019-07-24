import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State
} from '@stencil/core';
import { KeyCode } from '../../../common-enums';
import { IListItem } from '../../../common-interfaces';

@Component({
  styleUrl: 'gux-dropdown.less',
  tag: 'gux-dropdown'
})
export class GuxDropdown {
  @Element()
  root: HTMLGuxDropdownElement;
  textFieldElement: HTMLGuxTextFieldElement;
  listElement: HTMLGuxListElement;

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

  @State()
  srLabeledBy: string;

  inputIsFocused: boolean = false;

  /**
   * Emits when selection is changed.
   */
  @Event()
  change: EventEmitter<string>;
  emitChange(value: string) {
    this.change.emit(value);
  }

  @Listen('focusout')
  onFocusOut(e: FocusEvent) {
    if (!e.relatedTarget || !this.root.contains(e.relatedTarget as Node)) {
      this.opened = false;
      this.forcedGhostValue = '';
    }
  }

  @Method()
  async setLabeledBy(labeledBy: string) {
    this.textFieldElement.setLabeledBy(labeledBy);
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KeyCode.Up:
      case KeyCode.Down:
        if (this.inputIsFocused) {
          this.opened = true;
          setTimeout(() => {
            this.listElement.setFocusOnFirstItem();
          });
        }
        break;
      case KeyCode.Enter:
      case KeyCode.Space:
        break;
      default:
        if (!this.filterable) {
          const arr = this.items.filter(item => {
            return item.text.startsWith(event.key);
          });
          if (arr[0]) {
            arr[0].el.focus();
          }
        }
    }
  }

  setValue(text) {
    this.value = text;
    this.opened = false;
    this.emitChange(this.value);
  }
  _clickHandler() {
    if (!this.disabled) {
      this.opened = !this.opened;
    }
  }
  _focusHandler() {
    this.inputIsFocused = true;
  }
  _focusListItemHandler(text: string) {
    this.forcedGhostValue = this.value + text.substring(this.value.length);
  }
  _blurHandler() {
    this.inputIsFocused = false;
    this.forcedGhostValue = '';
  }
  _inputHandler(event: CustomEvent) {
    this.value = event.detail;
    this.opened = true;
  }

  _showDropdownIcon() {
    const match = this.items.filter(item => {
      return item.text === this.value;
    });
    const filterableBehavior = !this.value || !!match.length;
    return this.filterable ? filterableBehavior : true;
  }

  get filteredItems() {
    if (this.filterable) {
      const arr = this.items.filter(item => {
        return item.text.toLowerCase().startsWith(this.value.toLowerCase());
      });
      return arr;
    } else {
      return this.items;
    }
  }

  get ghost() {
    const firstFilteredItem = this.filteredItems.length
      ? this.filteredItems[0].text
      : '';
    const valueGhost =
      this.value + firstFilteredItem.substring(this.value.length);
    const ghost = this.forcedGhostValue ? this.forcedGhostValue : valueGhost;
    const placeholder = !this.value ? this.placeholder : '';
    return this.opened && this.filterable ? ghost : placeholder;
  }

  componentDidLoad() {
    if (!this.filterable) {
      this.textFieldElement.readonly = true;
    }
  }

  render() {
    return (
      <div
        class={`gux-dropdown ${this.mode} ${this.mode} ${
          this.disabled ? 'disabled' : ''
        } ${this.opened ? 'active' : ''}`}
        onKeyDown={e => this.onKeyDown(e)}
      >
        <div class="select-field">
          <span class="ghost" aria-hidden="true">
            {this.ghost}
          </span>
          <gux-text-field
            ref={el => (this.textFieldElement = el as HTMLGuxTextFieldElement)}
            onMouseDown={() => {
              this._clickHandler();
            }}
            onFocus={() => {
              this._focusHandler();
            }}
            onBlur={() => {
              this._blurHandler();
            }}
            onInput={e => {
              this._inputHandler(e);
            }}
            value={this.value}
            disabled={this.disabled}
            class={this._showDropdownIcon() ? 'unclearable' : ''}
          />
          {this._showDropdownIcon() && (
            <button
              aria-hidden="true"
              tabindex="-1"
              type="button"
              class="genesys-icon-dropdown-arrow"
            />
          )}
        </div>
        <gux-list
          ref={el => (this.listElement = el as HTMLGuxListElement)}
          class={this.opened ? 'opened' : ''}
          highlight={this.value}
        >
          {this.filteredItems.map(item => {
            return (
              <gux-list-item
                value={item.text}
                text={item.text}
                onPress={value => {
                  this.setValue(value.detail);
                  if (item.callback) {
                    item.callback();
                  }
                }}
                onFocus={() => {
                  this._focusListItemHandler(item.text);
                }}
              />
            );
          })}
        </gux-list>
      </div>
    );
  }
}
