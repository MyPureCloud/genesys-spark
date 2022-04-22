import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  JSX,
  Method,
  Prop,
  State
} from '@stencil/core';

import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
import { whenEventIsFrom } from '../../../utils/dom/when-event-is-from';
import { trackComponent } from '../../../usage-tracking';
import { OnMutation } from '../../../utils/decorator/on-mutation';

@Component({
  styleUrl: 'gux-dropdown.less',
  tag: 'gux-dropdown',
  shadow: false
})
export class GuxDropdown {
  @Element()
  root: HTMLElement;

  textFieldElement: HTMLInputElement;

  /**
   * Sets the select mode (default, page or palette).
   */
  @Prop()
  mode: 'default' | 'page' | 'palette' = 'default';
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
  forcedGhostValue: string;

  @State()
  srLabeledBy: string;

  inputIsFocused: boolean = false;

  valueEdited: boolean = false;

  /**
   * Emits when selection is changed.
   */
  @Event()
  change: EventEmitter<string>;
  emitChange(value: string) {
    this.change.emit(value);
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(e: MouseEvent) {
    if (!e.relatedTarget || !this.root.contains(e.relatedTarget as Node)) {
      this.opened = false;
      this.forcedGhostValue = '';
      const selectionOptions = this.getSelectionOptions();
      const match = selectionOptions.some(item => {
        return item.text === this.value;
      });
      if (!match) {
        this.value = '';
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async setLabeledBy(id: string): Promise<void> {
    this.srLabeledBy = id;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async setSelected(): Promise<void> {
    const selectionOptions = this.getSelectionOptions();
    const selectedOptionIndex = selectionOptions
      .map(selectionOption => selectionOption.selected)
      .lastIndexOf(true);

    if (selectedOptionIndex >= 0) {
      const option = selectionOptions[selectedOptionIndex];
      this.value = option.text;
      return;
    }

    const selectedOption = selectionOptions.find(
      selectionOption => this.value === selectionOption.value
    );

    if (selectedOption) {
      this.value = selectedOption.text;
      return;
    }

    this.value = '';
  }

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    forceUpdate(this.root);
    void this.setSelected();
  }

  // TODO: Fix the keyboard navigation I broke
  onKeyDown(event: KeyboardEvent) {
    const selectionOptions = this.getSelectionOptions();
    const focusIndex = this.getFocusIndex(selectionOptions);
    switch (event.key) {
      case 'ArrowUp':
        // prevent arrow key from triggering a page scroll
        event.preventDefault();
        if (focusIndex > 0) {
          selectionOptions[focusIndex - 1].focus();
        }
        break;
      case 'ArrowDown':
        // prevent arrow key from triggering a page scroll
        event.preventDefault();
        if (this.inputIsFocused) {
          this.opened = true;
        }
        if (focusIndex < selectionOptions.length - 1) {
          selectionOptions[focusIndex + 1].focus();
        }
        break;
      case 'Home':
        if (!selectionOptions.length) {
          return;
        }
        selectionOptions[0].focus();
        break;
      case 'End':
        if (!selectionOptions.length) {
          return;
        }
        selectionOptions[selectionOptions.length - 1].focus();
        break;
      case 'Escape':
        this.textFieldElement.focus();
        this.opened = false;
        break;
      case 'Tab':
        this.textFieldElement.focus();
        this.opened = false;
        break;
      case 'Enter':
      case 'Space':
        break;
      default:
        this.valueEdited = true;
        if (!this.filterable) {
          const arr = selectionOptions.filter(item => {
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
    this.valueEdited = false;
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

  _optionFocusedHandler(e: FocusEvent) {
    whenEventIsFrom('gux-option', e, elem => {
      const option = elem as HTMLGuxOptionElement;
      this.forcedGhostValue =
        this.value + option.text.substring(this.value.length);
    });
  }

  private optionSelectedHandler(e: Event) {
    whenEventIsFrom('gux-option', e, elem => {
      const option = elem as HTMLGuxOptionElement;
      const selectionOptions = this.getSelectionOptions();

      selectionOptions.forEach(selectionOption => {
        if (selectionOption === option) {
          selectionOption.selected = true;
          this.setValue(
            selectionOption.text,
            selectionOption.value || selectionOption.text
          );
        } else {
          selectionOption.selected = false;
        }
      });
    });
  }

  private optionKeyDownHandler(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.optionSelectedHandler(e);
    }
  }

  _blurHandler() {
    this.inputIsFocused = false;
    this.forcedGhostValue = '';
  }

  _inputHandler(inputEvent: Event) {
    this.value = (inputEvent.target as HTMLInputElement).value;
    this.opened = true;
  }

  getFilteredItems() {
    const selectionOptions = this.getSelectionOptions();
    if (this.filterable) {
      const arr = selectionOptions.filter(item => {
        return item.text.toLowerCase().startsWith(this.value.toLowerCase());
      });
      return arr;
    } else {
      return selectionOptions;
    }
  }

  getSuggestionText(filter: string = '') {
    this.searchHighlightAndFilter(this.value);
    const filterLength = filter.length;
    const firstFilteredItem = this.getFilteredItems().length
      ? this.getFilteredItems()[0].text
      : '';
    if (filterLength > 0) {
      const option = firstFilteredItem;
      if (option) {
        return this.opened && this.filterable
          ? option.substring(filterLength)
          : '';
      }
    }
    return '';
  }

  componentWillLoad(): void {
    trackComponent(this.root, {
      variant: this.filterable ? 'filterable' : 'full'
    });
  }

  componentDidLoad(): void {
    void this.setSelected();

    if (!this.filterable) {
      this.textFieldElement.readOnly = true;
    }
  }

  private getSelectionOptions(): HTMLGuxOptionElement[] {
    const result: HTMLGuxOptionElement[] = [];
    const options: HTMLElement = this.root.getElementsByClassName(
      'gux-options'
    )[0] as HTMLElement;

    if (!options) {
      return [];
    }

    const childrenElements = Array.from(options.children);
    childrenElements.forEach(child => {
      if (child.matches('gux-option')) {
        result.push(child as HTMLGuxOptionElement);
      }
    });

    return result;
  }

  render(): JSX.Element {
    return (
      <div
        class={`gux-dropdown gux-${this.mode} ${
          this.disabled ? 'gux-disabled' : ''
        } ${this.opened ? 'gux-active' : ''}`}
        onKeyDown={e => this.onKeyDown(e)}
      >
        <div class="gux-select-field">
          <span
            class={`gux-filter-suggestion ${this.opened ? 'gux-active' : ''}`}
            aria-hidden="true"
          >
            <span class="gux-filter-text">{this.value}</span>
            <span class="gux-filter-typeahead">
              {this.getSuggestionText(this.value)}
            </span>
          </span>

          <gux-input-text-like>
            <input
              placeholder={this.placeholder}
              slot="input"
              value={this.value}
              aria-labelledby={this.srLabeledBy}
              disabled={this.disabled}
              ref={ref => (this.textFieldElement = ref)}
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
            />
          </gux-input-text-like>

          <button
            class="gux-dropdown-indicator"
            aria-hidden="true"
            tabindex="-1"
            type="button"
          >
            <gux-icon decorative icon-name="chevron-small-down"></gux-icon>
          </button>
        </div>
        <div
          class={`gux-options ${this.opened ? 'gux-opened' : ''}`}
          onClick={this.optionSelectedHandler.bind(this)}
          onFocusin={this._optionFocusedHandler.bind(this)}
          onKeyDown={this.optionKeyDownHandler.bind(this)}
        >
          <slot />
        </div>
      </div>
    ) as JSX.Element;
  }

  private getFocusIndex(selectionOptions: HTMLGuxOptionElement[]): number {
    return selectionOptions.findIndex(option => {
      return option.matches(':focus');
    });
  }

  private searchHighlightAndFilter(searchInput: string) {
    const selectionOptions = this.getSelectionOptions();
    if (selectionOptions) {
      for (const option of selectionOptions) {
        void option.shouldFilter(searchInput).then(isFiltered => {
          if (this.filterable && isFiltered && this.valueEdited) {
            option.classList.add('gux-filtered');
          } else {
            option.classList.remove('gux-filtered');
          }
        });
      }
    }
  }
}
