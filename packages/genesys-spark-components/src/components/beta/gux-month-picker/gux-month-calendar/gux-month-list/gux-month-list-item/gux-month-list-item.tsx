import { Component, Element, h, Host, JSX, Listen, Prop } from '@stencil/core';

import { GuxISOYearMonth } from '../../../../../../utils/date/year-month-values';
import { getClosestElement } from '../../../../../../utils/dom/get-closest-element';

@Component({
  styleUrl: 'gux-month-list-item.less',
  tag: 'gux-month-list-item',
  shadow: { delegatesFocus: true }
})
export class GuxMonthListItem {
  @Element()
  root: HTMLElement;

  @Prop()
  value: GuxISOYearMonth;

  @Prop()
  disabled: boolean = false;

  @Prop()
  selected: boolean = false;

  @Listen('mouseup')
  onMouseup(): void {
    this.focusParentList();
  }

  @Listen('mouseover')
  onMouseover(): void {
    this.focusParentList();
  }

  private focusParentList(): void {
    const parentList = getClosestElement(
      'gux-month-list',
      this.root
    ) as HTMLElement;

    if (parentList && parentList.shadowRoot.activeElement === null) {
      this.root.blur();
      parentList.focus();
    }
  }

  render(): JSX.Element {
    return (
      <Host role="listitem" value={this.value}>
        <div class="gux-container">
          <button
            class={{ 'gux-selected': this.selected }}
            type="button"
            tabIndex={-1}
            disabled={this.disabled}
          >
            <slot></slot>
          </button>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
