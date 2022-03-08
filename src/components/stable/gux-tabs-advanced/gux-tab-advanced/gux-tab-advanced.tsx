import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  writeTask
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import { eventIsFrom } from '../../../../utils/dom/event-is-from';
import { randomHTMLId } from '../../../../utils/dom/random-html-id';

import tabsResources from '../i18n/en.json';

@Component({
  styleUrl: 'gux-tab-advanced.less',
  tag: 'gux-tab-advanced'
})
export class GuxTabAdvanced {
  private buttonElement: HTMLButtonElement;
  private dropdownOptionsButtonId: string = randomHTMLId();
  private moveFocusDelay: number = 100;
  private tabTitle: string = '';
  /**
   * unique id for the tab
   */
  @Prop()
  tabId: string;

  /**
   * indicates whether or not the tab is selected
   */
  @State()
  active: boolean = false;

  /**
   * indicates the gux-icon to display on the left side of the tab (similar to a favicon in the browser)
   */
  @Prop()
  tabIconName: string;

  @Prop()
  guxDisabled: boolean = false;

  @State()
  private popoverHidden: boolean = true;

  @State()
  private hasAnimated: boolean = false;

  @State()
  private focusedOptionIndex: number = 0;

  @Element()
  private root: HTMLElement;

  @Listen('focusout')
  onFocusout(event: FocusEvent) {
    if (
      !this.root.querySelector('.gux-tab').contains(event.relatedTarget as Node)
    ) {
      this.popoverHidden = true;
    }
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        if (eventIsFrom('.gux-tab-options-button', event)) {
          this.popoverHidden = false;
          setTimeout(() => {
            (
              this.root.querySelectorAll(
                '.tab-dropdown-option'
              )[0] as HTMLElement
            ).focus();
          }, this.moveFocusDelay);
        }
        if (
          eventIsFrom('.gux-dropdown-option-container', event) &&
          this.focusedOptionIndex <
            this.root.querySelectorAll('.tab-dropdown-option').length - 1
        ) {
          this.focusedOptionIndex++;
          (
            this.root.querySelectorAll('.tab-dropdown-option')[
              this.focusedOptionIndex
            ] as HTMLElement
          ).focus();
        }
        break;
      case 'ArrowUp':
        if (
          eventIsFrom('.gux-dropdown-option-container', event) &&
          this.focusedOptionIndex > 0
        ) {
          this.focusedOptionIndex--;
          (
            this.root.querySelectorAll('.tab-dropdown-option')[
              this.focusedOptionIndex
            ] as HTMLElement
          ).focus();
        }
        break;
      case 'Escape':
        if (eventIsFrom('.gux-dropdown-option-container', event)) {
          this.popoverHidden = true;
          setTimeout(() => {
            (
              this.root.querySelectorAll(
                '.gux-tab-options-button'
              )[0] as HTMLElement
            ).focus();
          }, this.moveFocusDelay);
        }
        break;
    }
  }

  @Listen('keyup')
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        if (eventIsFrom('.gux-tab-options-button', event)) {
          setTimeout(() => {
            (
              this.root.querySelectorAll(
                '.tab-dropdown-option'
              )[0] as HTMLElement
            ).focus();
          }, this.moveFocusDelay);
        }
    }
  }

  @Listen('click')
  onClick(event: MouseEvent) {
    if (eventIsFrom('.gux-tab-options-button', event)) {
      return;
    }
    if (!this.active && !this.guxDisabled) {
      this.internalactivatetabpanel.emit(this.tabId);
    }
  }

  @Event()
  internalactivatetabpanel: EventEmitter<string>;

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxSetActive(active: boolean): Promise<void> {
    this.active = active;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxGetActive() {
    return this.active;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxFocus(): Promise<void> {
    this.buttonElement.focus();
  }

  private get hasDropdownOptions(): boolean {
    return Boolean(this.root.querySelector('[slot="dropdown-options"]'));
  }

  private toggleOptions(): void {
    this.popoverHidden = !this.popoverHidden;
  }

  private onSelectDropdownOption(e: MouseEvent): void {
    this.popoverHidden = true;
    e.stopPropagation();
  }

  private i18n: GetI18nValue;

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, tabsResources);
    this.tabTitle = this.root.querySelector('span').textContent.trim();
  }

  private popoverOnClick(e: MouseEvent): void {
    e.stopPropagation();
  }

  private getDropdownOptions(): JSX.Element {
    if (this.hasDropdownOptions) {
      return [
        <button
          id={this.dropdownOptionsButtonId}
          aria-expanded={(!this.popoverHidden).toString()}
          type="button"
          class="gux-tab-options-button"
          onClick={() => this.toggleOptions()}
          tabIndex={this.active ? 0 : -1}
        >
          <gux-icon
            icon-name="menu-kebab-vertical"
            screenreader-text={this.i18n('options', {
              tabTitle: this.tabTitle
            })}
          ></gux-icon>
        </button>,
        <gux-popover-list
          position="top-end"
          for={this.dropdownOptionsButtonId}
          displayDismissButton={false}
          hidden={this.popoverHidden}
          closeOnClickOutside={true}
          onGuxdismiss={() => (this.popoverHidden = true)}
          onClick={(e: MouseEvent) => this.popoverOnClick(e)}
        >
          <div
            class="gux-dropdown-option-container"
            onClick={(e: MouseEvent) => this.onSelectDropdownOption(e)}
          >
            <slot name="dropdown-options" />
          </div>
        </gux-popover-list>
      ] as JSX.Element;
    }

    return null;
  }

  componentDidLoad(): void {
    if (!this.hasAnimated) {
      writeTask(() => {
        this.root.querySelector('.gux-tab').classList.add('gux-show');
        this.hasAnimated = true;
      });
    }
  }

  render(): JSX.Element {
    return [
      <div
        class={`gux-tab ${this.active ? 'gux-selected' : ''}`}
        aria-disabled={this.guxDisabled.toString()}
      >
        <button
          class="gux-tab-button"
          type="button"
          role="tab"
          aria-selected={this.active.toString()}
          aria-controls={`gux-${this.tabId}-panel`}
          ref={el => (this.buttonElement = el)}
          tabIndex={this.active ? 0 : -1}
          id={`gux-${this.tabId}-tab`}
        >
          {this.tabIconName ? (
            <div class="tab-icon-container">
              <gux-icon
                icon-name={this.tabIconName}
                decorative={true}
              ></gux-icon>
            </div>
          ) : null}
          <span class="tab-title">
            <slot name="title" />
          </span>
        </button>

        {this.getDropdownOptions()}
      </div>
    ] as JSX.Element;
  }
}
