import {
  Component,
  Element,
  Prop,
  h,
  Listen,
  forceUpdate,
  State
} from '@stencil/core';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import translationResources from './i18n/en.json';

/**
 * @slot - slot for text.
 */

@Component({
  styleUrl: 'gux-select-all.scss',
  tag: 'gux-select-all',
  shadow: true
})
export class GuxSelectAll {
  private i18n: GetI18nValue;
  private listboxElement: HTMLGuxListboxMultiElement;

  @Element()
  root: HTMLElement;

  @Prop()
  selected: boolean = false;

  @Prop()
  indeterminate: boolean = false;

  @Prop()
  active: boolean = false;

  @State()
  hasScrolled: boolean = false;

  @Listen('internallistboxoptionsupdated', {
    target: 'window',
    passive: true,
    capture: true
  })
  onInternallistboxoptionsupdated(): void {
    forceUpdate(this.root);
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.listboxElement = this.root?.closest('gux-listbox-multi');
    this.applyListboxScrollListener();
  }

  disconnectedCallback(): void {
    this.listboxElement.removeEventListener(
      'scroll',
      this.applyListboxScrollListener
    );
  }

  private applyListboxScrollListener(): void {
    if (this.listboxElement) {
      this.listboxElement.addEventListener('scroll', (event: Event) => {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        this.hasScrolled = target.scrollTop > 0;
      });
    }
  }

  private getCounterText(): string {
    if (!this.listboxElement) {
      return;
    }

    const optionsCount = Array.from(
      this.listboxElement.querySelectorAll('gux-option-multi')
    );
    const selectedCount = optionsCount.filter(option => option.selected).length;

    return `(${selectedCount} ${this.i18n('of')} ${optionsCount.length})`;
  }

  renderSVGCheckbox(): JSX.Element {
    const paths = {
      indeterminate:
        'M11.1429 7.14286C11.6179 7.14286 12 7.525 12 8C12 8.475 11.6179 8.85714 11.1429 8.85714H4.85714C4.38214 8.85714 4 8.475 4 8C4 7.525 4.38214 7.14286 4.85714 7.14286H11.1429ZM0 2.28571C0 1.02321 1.02321 0 2.28571 0H13.7143C14.975 0 16 1.02321 16 2.28571V13.7143C16 14.975 14.975 16 13.7143 16H2.28571C1.02321 16 0 14.975 0 13.7143V2.28571ZM1.71429 2.28571V13.7143C1.71429 14.0286 1.97 14.2857 2.28571 14.2857H13.7143C14.0286 14.2857 14.2857 14.0286 14.2857 13.7143V2.28571C14.2857 1.97 14.0286 1.71429 13.7143 1.71429H2.28571C1.97 1.71429 1.71429 1.97 1.71429 2.28571Z',
      selected:
        'M4 1H11C11.7956 1 12.5587 1.31607 13.1213 1.87868C13.6839 2.44129 14 3.20435 14 4V11C14 11.7956 13.6839 12.5587 13.1213 13.1213C12.5587 13.6839 11.7956 14 11 14H4C3.20435 14 2.44129 13.6839 1.87868 13.1213C1.31607 12.5587 1 11.7956 1 11V4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1ZM5.57018 10.4198C5.7051 10.5547 5.87599 10.6177 6.04689 10.6177C6.22678 10.6177 6.39767 10.5457 6.52359 10.4198L11.7944 5.14905C12.0552 4.88821 12.0552 4.45647 11.7944 4.19563C11.5335 3.93479 11.1018 3.93479 10.841 4.19563L6.04689 8.9897L4.14905 7.08286C3.88821 6.82202 3.45647 6.82202 3.19563 7.08286C2.93479 7.3437 2.93479 7.77544 3.19563 8.03628L5.57018 10.4198Z',
      unselected:
        'M11 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V11C2.5 11.8284 3.17157 12.5 4 12.5H11C11.8284 12.5 12.5 11.8284 12.5 11V4C12.5 3.17157 11.8284 2.5 11 2.5ZM4 1C2.34315 1 1 2.34315 1 4V11C1 12.6569 2.34315 14 4 14H11C12.6569 14 14 12.6569 14 11V4C14 2.34315 12.6569 1 11 1H4Z'
    };

    const pathKey = this.indeterminate
      ? 'indeterminate'
      : this.selected
        ? 'selected'
        : 'unselected';
    const viewBox = this.indeterminate ? '0 0 16 16' : '1 1 13 13';

    return (
      <svg
        class="gux-checkbox-container"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d={paths[pathKey]} />
      </svg>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <div
        role="option"
        aria-selected={this.selected.toString()}
        class={{
          'gux-select-all-container': true,
          'gux-active': this.active,
          'gux-selected': this.selected,
          'gux-indeterminate': this.indeterminate,
          'gux-has-scrolled': this.hasScrolled
        }}
      >
        <div class="gux-select-all-content">
          {this.renderSVGCheckbox()}
          <div class="gux-option-wrapper">
            <gux-truncate max-lines={1}>
              <span>
                <slot>{this.i18n('allOptions')}</slot>
              </span>
            </gux-truncate>
            <gux-truncate
              tooltip-placement="right"
              class="gux-counter-label"
              max-lines={1}
            >
              {this.getCounterText()}
            </gux-truncate>
          </div>
        </div>
      </div>
    ) as JSX.Element;
  }
}
