import { Component, h, Element, Listen, JSX, Prop, State } from '@stencil/core';

import { getClosestElement } from '@utils/dom/get-closest-element';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';
import { hasSlot } from '@utils/dom/has-slot';

import { GuxSegmentedControlItemPosition } from './gux-segmented-control-item.types';

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

  @State()
  position: GuxSegmentedControlItemPosition;

  @Listen('click')
  onClick(e: MouseEvent): void {
    if (this.disabled) {
      e.stopPropagation();
    }
  }

  private isInStartPosition(
    switchItem: HTMLGuxSegmentedControlItemElement
  ): boolean {
    const parentSegmentControl = getClosestElement(
      'gux-segmented-control-beta',
      switchItem
    ) as HTMLGuxSegmentedControlBetaElement;

    const children = Array.from(parentSegmentControl.children);
    const index = children.findIndex(i => i === switchItem);

    return index === 0;
  }

  private isInEndPosition(
    switchItem: HTMLGuxSegmentedControlItemElement
  ): boolean {
    const parentSegmentControl = getClosestElement(
      'gux-segmented-control-beta',
      switchItem
    ) as HTMLGuxSegmentedControlBetaElement;

    const children = Array.from(parentSegmentControl.children);
    const index = children.findIndex(i => i === switchItem);

    return index === children.length - 1;
  }

  private renderTooltip(): JSX.Element {
    if (this.iconOnly) {
      return (
        <gux-tooltip>{getSlotTextContent(this.root, 'text')}</gux-tooltip>
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
          'gux-start': this.isInStartPosition(this.root),
          'gux-end': this.isInEndPosition(this.root)
        }}
      >
        <button
          class={{
            'gux-segmented-control-item': true,
            'gux-icon-only': this.iconOnly,
            'gux-selected': this.selected
          }}
          type="button"
          disabled={this.disabled}
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
