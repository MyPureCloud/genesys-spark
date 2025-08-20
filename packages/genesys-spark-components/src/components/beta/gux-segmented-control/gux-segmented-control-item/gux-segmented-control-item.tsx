import { Component, h, Element, Listen, JSX, Prop } from '@stencil/core';

import { getClosestElement } from '@utils/dom/get-closest-element';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';
import { hasSlot } from '@utils/dom/has-slot';
import { randomHTMLId } from '@utils/dom/random-html-id';

/**
 * @slot icon - optional slot for an icon
 * @slot text - required slot for text
 */

@Component({
  styleUrl: 'gux-segmented-control-item.scss',
  tag: 'gux-segmented-control-item',
  shadow: {
    delegatesFocus: true
  }
})
export class GuxSegmentedControlItem {
  private id: string = randomHTMLId('gux-segmented-control-item');

  @Element()
  root: HTMLGuxSegmentedControlItemElement;

  @Prop()
  value: string;

  @Prop()
  selected: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  iconOnly: boolean = false;

  @Listen('click')
  onClick(e: MouseEvent): void {
    if (this.disabled || this.hasDisabledParent()) {
      e.stopPropagation();
    }
  }

  private hasDisabledParent(): boolean {
    const parentSegmentControl = getClosestElement(
      'gux-segmented-control-beta',
      this.root
    ) as HTMLGuxSegmentedControlBetaElement;

    return parentSegmentControl.disabled;
  }

  private renderTooltip(): JSX.Element {
    if (this.iconOnly) {
      return (
        <gux-tooltip-beta visual-only for={this.id} placement="bottom">
          <div slot="content">{getSlotTextContent(this.root, 'text')}</div>
        </gux-tooltip-beta>
      ) as JSX.Element;
    }
  }

  private renderIconSlot(): JSX.Element {
    if (hasSlot(this.root, 'icon')) {
      return (
        <div
          class={{
            'gux-icon': true,
            'gux-icon-only': this.iconOnly
          }}
        >
          <slot name="icon" />
        </div>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return [
      <button
        class={{
          'gux-segmented-control-item': true,
          'gux-icon-only': this.iconOnly,
          'gux-selected': this.selected,
          'gux-parent-disabled': this.hasDisabledParent()
        }}
        type="button"
        id={this.id}
        aria-current={this.selected ? 'true' : 'false'}
        disabled={this.disabled || this.hasDisabledParent()}
      >
        {this.renderIconSlot()}
        <span
          class={{
            'gux-text': true,
            'gux-icon-only': this.iconOnly
          }}
        >
          <slot name="text" />
        </span>
      </button>,
      this.renderTooltip(),
      <div class="gux-divider"></div>
    ] as JSX.Element;
  }
}
