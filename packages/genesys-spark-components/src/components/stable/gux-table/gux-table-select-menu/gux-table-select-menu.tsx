import {
  Component,
  h,
  Host,
  Element,
  JSX,
  Listen,
  Prop,
  State
} from '@stencil/core';

import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { eventIsFrom } from '@utils/dom/event-is-from';
import { randomHTMLId } from '@utils/dom/random-html-id';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';

import tableResources from '../i18n/en.json';

/**
 * @slot default - Required slot for gux-all-row-select element
 * @slot select-menu-options - Optional slot for gux-list containing gux-list-item children
 */

@Component({
  styleUrl: 'gux-table-select-menu.scss',
  tag: 'gux-table-select-menu',
  //cannot link Popper element with an element in the Shadow Dom
  shadow: false
})
export class GuxTableSelectMenu {
  private tableSelectMenuButtonElement: HTMLButtonElement;
  private dropdownOptionsButtonId: string = randomHTMLId(
    'gux-table-select-menu'
  );
  private hasSelectMenuOptions: boolean = false;

  @Element()
  root: HTMLElement;

  private i18n: GetI18nValue;

  @Prop()
  dropdownDisabled: boolean = false;

  @State()
  private popoverHidden: boolean = true;

  private focusFirstItemInPopupList(): void {
    const listElement: HTMLGuxListElement = this.root.querySelector('gux-list');

    afterNextRenderTimeout(() => {
      void listElement?.guxFocusFirstItem();
    });
  }

  async componentWillLoad(): Promise<void> {
    this.hasSelectMenuOptions = !!this.root.querySelector(
      '[slot="select-menu-options"]'
    );
    this.i18n = await buildI18nForComponent(
      this.root,
      tableResources,
      'gux-table'
    );
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        if (eventIsFrom('.gux-select-menu-button', event)) {
          this.toggleOptions();
          this.focusFirstItemInPopupList();
        }
        break;
      case 'Enter':
        if (eventIsFrom('.gux-select-menu-button', event)) {
          void this.focusFirstItemInPopupList();
        }
        break;
      case 'Escape':
        if (eventIsFrom('gux-list', event)) {
          event.stopPropagation();
          this.popoverHidden = true;
          this.tableSelectMenuButtonElement?.focus();
        }
        break;
      case 'Tab':
        this.popoverHidden = true;
        break;
    }
  }

  @Listen('keyup')
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        if (eventIsFrom('.gux-select-menu-button', event)) {
          this.focusFirstItemInPopupList();
        }
    }
  }
  private toggleOptions(): void {
    this.popoverHidden = !this.popoverHidden;
  }

  private renderSelectDropdown(): JSX.Element {
    if (this.hasSelectMenuOptions) {
      return [
        <button
          id={this.dropdownOptionsButtonId}
          aria-haspopup="listbox"
          aria-expanded={(!this.popoverHidden).toString()}
          type="button"
          class="gux-select-menu-button"
          ref={el => (this.tableSelectMenuButtonElement = el)}
          onClick={() => this.toggleOptions()}
          disabled={this.dropdownDisabled}
        >
          <gux-icon
            icon-name="custom/chevron-down-small-regular"
            screenreader-text={this.i18n('tableOptions')}
          ></gux-icon>
        </button>,
        <gux-popover-list
          for={this.dropdownOptionsButtonId}
          isOpen={!this.popoverHidden}
          closeOnClickOutside={true}
          onGuxdismiss={() => (this.popoverHidden = true)}
        >
          <div>
            <slot name="select-menu-options" />
          </div>
        </gux-popover-list>
      ] as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host>
        <slot />
        {this.renderSelectDropdown()}
      </Host>
    ) as JSX.Element;
  }
}
