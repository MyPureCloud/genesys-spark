import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

@Component({
  styleUrl: 'gux-advanced-dropdown.less',
  tag: 'gux-advanced-dropdown'
})
export class GuxAdvancedDropdown {
  @Element()
  root: HTMLStencilElement;
  searchElement: HTMLGuxSearchElement;
  inputBox: HTMLElement;

  /**
   * Disable the input and prevent interactions.
   */
  @Prop()
  disabled: boolean = false;

  /**
   * The dropdown's label.
   */
  @Prop()
  label: string;

  /**
   * The dropdown's placeholder.
   */
  @Prop()
  placeholder: string;

  /**
   * Fires when the value of the advanced dropdown changes.
   */
  @Event()
  input: EventEmitter<string>;

  @State()
  opened: boolean;
  value: string;
  currentlySelectedOption: HTMLGuxDropdownOptionElement;
  selectionOptions: HTMLGuxDropdownOptionElement[];

  @Watch('disabled')
  watchValue(newValue: boolean) {
    if (this.opened && newValue) {
      this.closeDropdown(false);
    }
  }

  /**
   * Returns the currently selected values
   */
  @Method()
  getSelectedValues(): Promise<string[]> {
    // Once multi-select gets added there will
    // be multiple values selectable.
    return Promise.resolve([this.value]);
  }

  @Listen('focusout')
  onFocusOut(e: FocusEvent) {
    if (!e.relatedTarget || !this.root.contains(e.relatedTarget as Node)) {
      this.closeDropdown(false);
    }
  }

  componentDidLoad() {
    this.selectionOptions = this.getSelectionOptions();
    for (const option of this.selectionOptions) {
      if (option.selected) {
        this.currentlySelectedOption = option;
      }

      option.addEventListener('selectedChanged', async () => {
        this.value = await option.getDisplayedValue();
        this.input.emit(option.value);
        this.closeDropdown(true);

        if (this.currentlySelectedOption) {
          this.currentlySelectedOption.selected = false;
        }
        this.currentlySelectedOption = option;
      });
    }
  }

  render() {
    return (
      <div
        class={`gux-dropdown 
        ${this.disabled ? 'disabled' : ''}
        ${this.opened ? 'active' : ''}`}
      >
        {this.label && <label>{this.label}</label>}
        <div class="gux-select-field">
          <a
            ref={el => (this.inputBox = el)}
            class="gux-select-input"
            tabindex="0"
            onMouseDown={() => this.inputMouseDown()}
            onKeyDown={e => this.inputKeyDown(e)}
          >
            {this.placeholder &&
              !this.value && (
                <span class="gux-select-placeholder">{this.placeholder}</span>
              )}
            {this.value && <span class="gux-select-value">{this.value}</span>}
          </a>
          <button
            aria-hidden="true"
            tabindex="-1"
            type="button"
            class="genesys-icon-dropdown-arrow"
          />
        </div>
        <div
          class={`gux-advanced-dropdown-menu ${this.opened ? 'opened' : ''}`}
        >
          <div class="gux-dropdown-menu-container">
            <gux-search
              ref={el => (this.searchElement = el as HTMLGuxSearchElement)}
              class="gux-light-theme"
              dynamic-search="true"
              onInput={e => e.stopPropagation()}
              onSearch={e => this.searchRequested(e)}
            />
            <div
              class="gux-dropdown-options"
              onKeyDown={e => this.optionsKeyDown(e)}
            >
              <slot />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private getSelectionOptions(): HTMLGuxDropdownOptionElement[] {
    const result: HTMLGuxDropdownOptionElement[] = [];
    const options: HTMLElement = this.root.getElementsByClassName(
      'gux-dropdown-options'
    )[0] as HTMLElement;

    // Hack around TSX not supporting for..of on HTMLCollection, this
    // needs to be tested in IE11
    const childrenElements: any = options.children;
    for (const child of childrenElements) {
      if (child.matches('gux-dropdown-option')) {
        result.push(child as HTMLGuxDropdownOptionElement);
      }
    }

    return result;
  }

  private inputMouseDown() {
    if (this.disabled) {
      return;
    }

    if (this.opened) {
      this.closeDropdown(true);
    } else {
      this.openDropdown();
    }
  }

  private getFocusIndex(): number {
    return this.selectionOptions.findIndex(option => {
      return option.matches(':focus');
    });
  }

  private optionsKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp': {
        const focusIndex = this.getFocusIndex();
        if (focusIndex > 0) {
          this.selectionOptions[focusIndex - 1].focus();
        }
        break;
      }
      case 'ArrowDown': {
        const focusIndex = this.getFocusIndex();
        if (focusIndex < this.selectionOptions.length - 1) {
          this.selectionOptions[focusIndex + 1].focus();
        }
        break;
      }
      case 'Home':
        if (!this.selectionOptions.length) {
          return;
        }
        this.selectionOptions[0].focus();
        break;
      case 'End':
        if (!this.selectionOptions.length) {
          return;
        }
        this.selectionOptions[this.selectionOptions.length - 1].focus();
        break;
      default:
    }
  }

  private inputKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        this.openDropdown();
        break;
      default:
    }
  }

  private searchRequested(event: CustomEvent) {
    for (const option of this.selectionOptions) {
      option.shouldFilter(event.detail).then(isFiltered => {
        option.filtered = isFiltered;
      });
    }
  }

  private changeFocusToSearch() {
    setTimeout(() => {
      this.searchElement.setInputFocus();
    });
  }

  private openDropdown() {
    this.opened = true;
    this.changeFocusToSearch();
  }

  private closeDropdown(focus: boolean) {
    this.opened = false;
    this.searchElement.value = '';

    if (focus) {
      this.inputBox.focus();
    }
  }
}
