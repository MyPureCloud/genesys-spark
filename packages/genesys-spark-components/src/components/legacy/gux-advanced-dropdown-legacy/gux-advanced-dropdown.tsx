import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { onMutation } from '@utils/dom/on-mutation';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';

import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import advancedDropDownResources from './i18n/en.json';

/**
 * @slot - collection of gux-dropdown-option elements
 */

@Component({
  styleUrl: 'gux-advanced-dropdown.scss',
  tag: 'gux-advanced-dropdown-legacy',
  shadow: true
})
export class GuxAdvancedDropdownLegacy {
  @Element()
  root: HTMLElement;

  searchInput: HTMLInputElement;
  inputBox: HTMLElement;
  filterDebounceTimer: ReturnType<typeof setTimeout>;

  private i18n: GetI18nValue;

  /**
   * Disable the input and prevent interactions.
   */
  @Prop()
  disabled: boolean = false;

  /**
   * The dropdown's placeholder.
   */
  @Prop()
  placeholder: string;

  /**
   * Whether the list should filter its current options.
   */
  @Prop()
  noFilter: boolean = false;

  /**
   * Timeout between filter input changed and event being emitted.
   */
  @Prop()
  filterDebounceTimeout: number = 500;

  /**
   * CSS string used to set the maximum height of the dropdown option container. Default is set to 10 options as defined by UX.
   */
  @Prop()
  dropdownHeight: string = '320px';

  /**
   * Fires when the value of the advanced dropdown changes.
   */
  @Event()
  input: EventEmitter<string>;

  /**
   * Fires when the filter of the advanced dropdown changes.
   */
  @Event()
  filter: EventEmitter<string>;

  @State()
  srLabelledby: string;

  @State()
  opened: boolean;

  @State()
  currentlySelectedOption: HTMLGuxDropdownOptionElement;

  @State()
  selectionOptions: HTMLGuxDropdownOptionElement[];

  slotObserver: MutationObserver;

  @Watch('disabled')
  watchValue(newValue: boolean) {
    if (this.opened && newValue) {
      this.closeDropdown(false);
    }
  }

  get value(): string {
    return this.currentlySelectedOption?.text;
  }

  /**
   * Gets the currently selected values.
   *
   * @returns The array of selected values.
   */
  @Method()
  getSelectedValues(): Promise<string[]> {
    // Once multi-select gets added there will
    // be multiple values selectable.
    return Promise.resolve([this.value]);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async setLabeledBy(id: string) {
    this.srLabelledby = id;
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside() {
    this.closeDropdown(false);
  }

  async componentWillLoad() {
    trackComponent(this.root);

    this.i18n = await buildI18nForComponent(
      this.root,
      advancedDropDownResources
    );

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.updateSelectionState();
    this.addOptionListener();
    this.slotObserver = onMutation(this.root, () =>
      this.updateSelectionState()
    );
  }

  disconnectedCallback() {
    if (this.slotObserver) {
      this.slotObserver.disconnect();
    }
  }

  render(): JSX.Element {
    return (
      <gux-popup expanded={this.opened} disabled={this.disabled}>
        <div
          slot="target"
          class="gux-select-field"
          onMouseDown={() => this.inputMouseDown()}
        >
          <a
            ref={el => (this.inputBox = el)}
            class="gux-select-input"
            aria-labelledby={this.srLabelledby}
            tabindex="0"
            onKeyDown={e => this.inputKeyDown(e)}
          >
            {this.placeholder && !this.value && (
              <span class="gux-select-placeholder" title={this.placeholder}>
                {this.placeholder}
              </span>
            )}
            {this.value && (
              <span class="gux-select-value" title={this.value}>
                {this.value}
              </span>
            )}
          </a>
          <div class="gux-icon-wrapper">
            <gux-icon decorative icon-name="chevron-small-down"></gux-icon>
          </div>
        </div>
        <div slot="popup" class="gux-advanced-dropdown-menu">
          <div class="gux-dropdown-menu-container">
            <gux-form-field-search label-position="screenreader">
              <label slot="label">{this.i18n('searchAria')}</label>
              <input
                slot="input"
                type="search"
                onInput={(event: InputEvent) => {
                  this.handleSearchInput(event);
                }}
                ref={el => (this.searchInput = el)}
              />
            </gux-form-field-search>

            <div
              class="gux-dropdown-options"
              style={{ maxHeight: this.dropdownHeight }}
              onKeyDown={e => this.optionsKeyDown(e)}
            >
              <slot />
            </div>
          </div>
        </div>
      </gux-popup>
    ) as JSX.Element;
  }

  private updateSelectionState(): void {
    this.selectionOptions = this.getSelectionOptions();
    this.currentlySelectedOption = this.selectionOptions.find(
      option => option.selected
    );
  }

  private addOptionListener(): void {
    this.root.addEventListener('selectedChanged', (event: CustomEvent) =>
      this.handleSelectionChange(event)
    );
  }

  private handleSelectionChange({ target }: CustomEvent): void {
    const option = target as HTMLGuxDropdownOptionElement;

    this.closeDropdown(true);

    if (this.currentlySelectedOption === option) {
      return;
    }

    if (this.currentlySelectedOption) {
      this.currentlySelectedOption.selected = false;
    }
    this.currentlySelectedOption = option;
    this.input.emit(option.value);
  }

  private getSelectionOptions(): HTMLGuxDropdownOptionElement[] {
    const options = this.root.querySelectorAll('gux-dropdown-option');

    return Array.from(options);
  }

  private inputMouseDown() {
    if (this.disabled) {
      return;
    }

    if (this.opened) {
      this.closeDropdown(true);
    } else {
      this.openDropdown(false);
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
        event.preventDefault();
        const focusIndex = this.getFocusIndex();
        if (focusIndex > 0) {
          this.selectionOptions[focusIndex - 1].focus();
        }
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
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
        this.openDropdown(true);
        break;
      default:
    }
  }

  private handleSearchInput(event: InputEvent) {
    event.stopPropagation();

    clearTimeout(this.filterDebounceTimer);
    this.filterDebounceTimer = setTimeout(
      () => this.searchRequested(),
      this.filterDebounceTimeout
    );
  }

  private searchRequested() {
    const value = this.searchInput.value;
    this.filter.emit(value);

    this.setFilteredOptions();
  }

  private setFilteredOptions() {
    const value = this.searchInput.value;

    if (!this.noFilter) {
      for (const option of this.selectionOptions) {
        void option.shouldFilter(value).then(isFiltered => {
          option.filtered = isFiltered;
        });
      }
    }
  }

  private changeFocusToSearch() {
    afterNextRenderTimeout(() => {
      this.searchInput.focus();
    });
  }

  private openDropdown(focusSearch: boolean) {
    this.opened = true;

    if (focusSearch) {
      this.changeFocusToSearch();
    }
  }

  private closeDropdown(focus: boolean) {
    this.opened = false;
    this.searchInput.value = '';
    this.setFilteredOptions();

    if (focus) {
      this.inputBox.focus();
    }
  }
}
