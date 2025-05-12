import { Component, h, Element, Listen, JSX, Prop } from '@stencil/core';

import { getClosestElement } from '@utils/dom/get-closest-element';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';
import { hasSlot } from '@utils/dom/has-slot';

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

  private isInStartPosition(): boolean {
    const parentSegmentControl = getClosestElement(
      'gux-segmented-control-beta',
      this.root
    ) as HTMLGuxSegmentedControlBetaElement;

    const children = Array.from(parentSegmentControl.children);
    const index = children.findIndex(i => i === this.root);

    return index === 0;
  }

  private isInEndPosition(): boolean {
    const parentSegmentControl = getClosestElement(
      'gux-segmented-control-beta',
      this.root
    ) as HTMLGuxSegmentedControlBetaElement;

    const children = Array.from(parentSegmentControl.children);
    const index = children.findIndex(i => i === this.root);

    return index === children.length - 1;
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
        <gux-tooltip>
          <div slot="content">{getSlotTextContent(this.root, 'text')}</div>
        </gux-tooltip>
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
    return (
      <div
        class={{
          'gux-container': true,
          'gux-parent-disabled': this.hasDisabledParent(),
          'gux-start': this.isInStartPosition(),
          'gux-end': this.isInEndPosition()
        }}
      >
        <button
          class={{
            'gux-segmented-control-item': true,
            'gux-icon-only': this.iconOnly,
            'gux-selected': this.selected
          }}
          type="button"
          aria-current={this.selected ? 'true' : 'false'}
          disabled={this.disabled || this.hasDisabledParent()}
        >
          {this.renderIconSlot()}
          <div
            class={{
              'gux-text': true,
              'gux-icon-only': this.iconOnly
            }}
          >
            <slot name="text" />
          </div>
        </button>
        {this.renderTooltip()}
      </div>
    ) as JSX.Element;
  }
}
