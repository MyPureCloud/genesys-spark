import { Component, Element, h, Host, Listen, JSX, Prop } from '@stencil/core';

import simulateNativeEvent from '../../../utils/dom/simulate-native-event';
import clamp from '../../../utils/number/clamp';

@Component({
  styleUrl: 'gux-rating.less',
  tag: 'gux-rating-beta'
})
export class GuxRating {
  @Element() root: HTMLElement;

  @Prop({ mutable: true })
  value: number = 0;

  @Prop()
  maxValue: number = 5;

  @Prop()
  disabled: boolean = false;

  @Prop()
  readonly: boolean = false;

  @Listen('click')
  onClick(event: MouseEvent): void {
    event.stopPropagation();

    if (this.disabled || this.readonly) {
      return;
    }

    const ratingStar = (event.target as HTMLElement).closest('gux-rating-star');
    const clickedStarIndex = Array.from(this.root.children).findIndex(
      child => child === ratingStar
    );
    const clickedStarNominalValue = clickedStarIndex + 1;

    if (clickedStarNominalValue === this.value + 0.5) {
      this.updateRatingValue(clickedStarNominalValue);
    } else if (clickedStarNominalValue === this.value) {
      this.updateRatingValue(0);
    } else if (clickedStarNominalValue !== Math.floor(this.value)) {
      this.updateRatingValue(clickedStarNominalValue - 0.5);
    }
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    event.stopPropagation();

    if (this.disabled || this.readonly) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.updateRatingValue(this.value - 0.5);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.updateRatingValue(this.value + 0.5);
        break;
      case 'End':
        event.preventDefault();
        this.updateRatingValue(Infinity);
        break;
      case 'Home':
        event.preventDefault();
        this.updateRatingValue(-Infinity);
        break;
    }
  }

  private updateRatingValue(newValue: number): void {
    const validatedNewValue = clamp(
      newValue,
      0,
      Array.from(this.root.children).length
    );

    if (this.value !== validatedNewValue) {
      this.value = validatedNewValue;

      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }

  private getRatingStarElements(): JSX.Element {
    return [...Array(this.maxValue).keys()].reduce((acc, cv) => {
      if (cv + 0.5 === this.value) {
        return acc.concat(<gux-rating-star fill="half"></gux-rating-star>);
      } else if (cv + 1 <= this.value) {
        return acc.concat(<gux-rating-star fill="full"></gux-rating-star>);
      }

      return acc.concat(<gux-rating-star fill="empty"></gux-rating-star>);
    }, []);
  }

  private getTabIndex(): number {
    return this.disabled ? -1 : 0;
  }

  render(): JSX.Element {
    return (
      <Host
        role="spinbutton"
        tabindex={this.getTabIndex()}
        class={{ 'gux-disabled': this.disabled }}
        aria-readonly={this.readonly}
        aria-valuenow={this.value}
        aria-valuemin="0"
        aria-valuemax={this.maxValue}
      >
        {this.getRatingStarElements()}
      </Host>
    );
  }
}
