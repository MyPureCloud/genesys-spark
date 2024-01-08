import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Prop,
  Watch,
  State
} from '@stencil/core';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import translationResources from './i18n/en.json';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * @slot - text
 * @slot subtext - Optional slot for subtext
 */

@Component({
  styleUrl: 'gux-option-multi.scss',
  tag: 'gux-option-multi',
  shadow: true
})
export class GuxOptionMulti {
  private truncateElement: HTMLGuxTruncateElement;
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  value: string;

  @Prop()
  active: boolean = false;

  @Prop({ mutable: true })
  selected: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  filtered: boolean = false;

  @Prop()
  custom: boolean = false;

  @State()
  private hasSubtext: boolean = false;

  @Event()
  guxremovecustomoption: EventEmitter<string>;

  @Event()
  internalselectcustomoption: EventEmitter<string>;

  @Watch('selected')
  emitRemoveCustomOption() {
    if (!this.selected && this.custom) {
      this.guxremovecustomoption.emit();
    }
  }
  @Watch('active')
  handleActive(active: boolean) {
    if (active) {
      void this.truncateElement?.setShowTooltip();
    } else {
      void this.truncateElement?.setHideTooltip();
    }
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.root.id = this.root.id || randomHTMLId('gux-option-multi');
    if (this.custom) {
      this.internalselectcustomoption.emit(this.value);
    }
  }

  componentWillRender(): void {
    this.hasSubtext = hasSlot(this.root, 'subtext');
  }

  // SVGs must be in DOM for tokenization to work
  renderSVGCheckbox(): JSX.Element {
    return this.selected
      ? ((
          <svg
            class="gux-checkbox-container"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="1 1 13 13"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 1H11C11.7956 1 12.5587 1.31607 13.1213 1.87868C13.6839 2.44129 14 3.20435 14 4V11C14 11.7956 13.6839 12.5587 13.1213 13.1213C12.5587 13.6839 11.7956 14 11 14H4C3.20435 14 2.44129 13.6839 1.87868 13.1213C1.31607 12.5587 1 11.7956 1 11V4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1ZM5.57018 10.4198C5.7051 10.5547 5.87599 10.6177 6.04689 10.6177C6.22678 10.6177 6.39767 10.5457 6.52359 10.4198L11.7944 5.14905C12.0552 4.88821 12.0552 4.45647 11.7944 4.19563C11.5335 3.93479 11.1018 3.93479 10.841 4.19563L6.04689 8.9897L4.14905 7.08286C3.88821 6.82202 3.45647 6.82202 3.19563 7.08286C2.93479 7.3437 2.93479 7.77544 3.19563 8.03628L5.57018 10.4198Z"
            />
          </svg>
        ) as JSX.Element)
      : ((
          <svg
            class="gux-checkbox-container"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="1 1 13 13"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V11C2.5 11.8284 3.17157 12.5 4 12.5H11C11.8284 12.5 12.5 11.8284 12.5 11V4C12.5 3.17157 11.8284 2.5 11 2.5ZM4 1C2.34315 1 1 2.34315 1 4V11C1 12.6569 2.34315 14 4 14H11C12.6569 14 14 12.6569 14 11V4C14 2.34315 12.6569 1 11 1H4Z"
            />
          </svg>
        ) as JSX.Element);
  }

  renderCustomOptionInstructions(): JSX.Element {
    if (this.custom) {
      return (
        <span class="gux-screenreader">
          {this.i18n('removeCustomElementInstructions')}
        </span>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host
        role="option"
        class={{
          'gux-active': this.active,
          'gux-disabled': this.disabled,
          'gux-filtered': this.filtered,
          'gux-selected': this.selected,
          'gux-show-subtext': this.hasSubtext
        }}
        aria-selected={this.selected.toString()}
        aria-disabled={this.disabled.toString()}
      >
        {this.renderSVGCheckbox()}
        {/* The gux-slot-container attribute is used in gux-listbox-multi and gux-dropdown-multi as a selector to get the slotted gux-option-multi text.
        This attribute is required because we need to get the slotted text and exclude the screen reader text. */}
        <div class="gux-option-wrapper">
          <gux-truncate ref={el => (this.truncateElement = el)}>
            <slot />
          </gux-truncate>
          <slot name="subtext"></slot>
        </div>
        {this.renderCustomOptionInstructions()}
      </Host>
    ) as JSX.Element;
  }
}
