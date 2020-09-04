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

@Component({
  styleUrl: 'gux-dropdown.less',
  tag: 'gux-dropdown'
})
export class GuxDropdown {
  @Element()
  root: HTMLGuxDropdownElement;
  textFieldElement: HTMLGuxTextFieldElement;

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
  @Prop({ mutable: true })
  value: string = '';
  /**
   * The dropdown placeholder.
   */
  @Prop()
  placeholder: string;
  /**
   * Whether the user can filter or not.
   */
  @Prop()
  filterable: boolean;

  @State()
  opened: boolean;

  @State()
  selectionOptions: HTMLGuxOptionElement[];

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
    this.textFieldElement.setLabelledBy(labeledBy);
  }

  onKeyDown(event: KeyboardEvent) {
    const focusIndex = this.getFocusIndex();
    switch (event.keyCode) {
      case KeyCode.Up:
        if (focusIndex > 0) {
          this.selectionOptions[focusIndex - 1].focus();
        }
        break;
      case KeyCode.Down:
        if (this.inputIsFocused) {
          this.opened = true;
        }
        if (focusIndex < this.selectionOptions.length - 1) {
          this.selectionOptions[focusIndex + 1].focus();
        }
        break;
      case KeyCode.Home:
        if (!this.selectionOptions.length) {
          return;
        }
        this.selectionOptions[0].focus();
        break;
      case KeyCode.End:
        if (!this.selectionOptions.length) {
          return;
        }
        this.selectionOptions[this.selectionOptions.length - 1].focus();
        break;
      case KeyCode.Enter:
      case KeyCode.Space:
        break;
      default:
        if (!this.filterable) {
          const arr = this.selectionOptions.filter(item => {
            return item.text.startsWith(event.key);
          });
          if (arr[0]) {
            arr[0].focus();
          }
        }
    }
  }

  setValue(text: string, value: string) {
    this.value = text;
    this.opened = false;
    this.emitChange(value);
  }
  _clickHandler() {
    if (!this.disabled) {
      this.opened = !this.opened;
    }
  }
  _focusHandler() {
    this.inputIsFocused = true;
  }
  _focusOptionItemHandler(text: string) {
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
    let match = [];
    if (this.selectionOptions) {
      match = this.selectionOptions.filter(item => {
        return item.text === this.value;
      });
    }
    const filterableBehavior = !this.value || !!match.length;
    return this.filterable ? filterableBehavior : true;
  }

  get filteredItems() {
    if (this.filterable && this.selectionOptions) {
      const arr = this.selectionOptions.filter(item => {
        return item.text.toLowerCase().startsWith(this.value.toLowerCase());
      });
      return arr;
    } else {
      return this.selectionOptions ? this.selectionOptions : [];
    }
  }

  get ghost() {
    this.searchHighlightAndFilter(this.value);
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
    this.selectionOptions = this.getSelectionOptions();
    for (const option of this.selectionOptions) {
      option.addEventListener('selectedChanged', (e: CustomEvent) => {
        const text = option.text;
        this.setValue(text, e.detail);
      });

      option.addEventListener('onFocus', (e: CustomEvent) => {
        this._focusOptionItemHandler(e.detail);
      });
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
            title={this.value}
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
              class="dropdown-indicator"
              aria-hidden="true"
              tabindex="-1"
              type="button"
            >
              <gux-icon decorative iconName="ic-dropdown-arrow"></gux-icon>
            </button>
          )}
        </div>
        <div class={`gux-options ${this.opened ? 'opened' : ''}`}>
          <slot />
        </div>
      </div>
    );
  }

  private getSelectionOptions(): HTMLGuxOptionElement[] {
    const result: HTMLGuxOptionElement[] = [];
    const options: HTMLElement = this.root.getElementsByClassName(
      'gux-options'
    )[0] as HTMLElement;

    // Hack around TSX not supporting for..of on HTMLCollection, this
    // needs to be tested in IE11
    const childrenElements: any = options.children;
    for (const child of childrenElements) {
      if (child.matches('gux-option')) {
        result.push(child as HTMLGuxOptionElement);
      }
    }
    return result;
  }

  private getFocusIndex(): number {
    return this.selectionOptions.findIndex(option => {
      return option.matches(':focus');
    });
  }

  private searchHighlightAndFilter(searchInput: string) {
    if (this.selectionOptions) {
      for (const option of this.selectionOptions) {
        option.shouldFilter(searchInput).then(isFiltered => {
          if (this.filterable && isFiltered) {
            option.classList.add('filtered');
          } else {
            option.classList.remove('filtered');
          }
        });
      }
    }
  }
}
