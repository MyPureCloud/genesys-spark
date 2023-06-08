import { Component, Element, h, Host, Listen, JSX, Prop } from '@stencil/core';

import simulateNativeEvent from '../../../utils/dom/simulate-native-event';
import clamp from '../../../utils/number/clamp';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '../../../utils/error/log-error';

@Component({
  styleUrl: 'gux-rating.less',
  tag: 'gux-rating',
  shadow: true
})
export class GuxRating {
  private starContainer: HTMLDivElement;

  @Element()
  root: HTMLElement;

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

    const [clickedElement] = event.composedPath();
    const ratingStar = (clickedElement as HTMLElement).getRootNode();
    const clickedStarIndex = Array.from(this.starContainer.children).findIndex(
      child => child.shadowRoot === ratingStar
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
      Array.from(this.starContainer.children).length
    );

    if (this.value !== validatedNewValue) {
      this.value = validatedNewValue;

      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }

  private getRatingStarElements(): JSX.Element {
    return [...Array(this.maxValue).keys()]
      .reduce((acc, cv) => {
        if (cv + 0.5 === this.value) {
          return acc.concat('rating-partial');
        } else if (cv + 1 <= this.value) {
          return acc.concat('rating-active');
        }

        return acc.concat('rating');
      }, [] as string[])
      .map(
        iconName =>
          (<gux-icon icon-name={iconName} decorative></gux-icon>) as JSX.Element
      );
  }

  private getTabIndex(): number {
    return this.disabled ? -1 : 0;
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    if (
      !(
        this.root.getAttribute('aria-label') ||
        this.root.getAttribute('aria-labelledby')
      )
    ) {
      logWarn(
        this.root,
        '`gux-rating` requires a label. Either provide a label and associate it with the gux-rating element using `aria-labelledby` or add an `aria-label` attribute to the gux-rating element.'
      );
    }
  }

  render(): JSX.Element {
    return (
      <Host
        role="spinbutton"
        tabindex={this.getTabIndex()}
        aria-readonly={this.readonly.toString()}
        aria-valuenow={this.value}
        aria-valuemin="0"
        aria-valuemax={this.maxValue}
      >
        <div
          ref={(el: HTMLDivElement) => (this.starContainer = el)}
          class={{
            'gux-rating-star-container': true,
            'gux-disabled': this.disabled
          }}
        >
          {this.getRatingStarElements()}
        </div>
      </Host>
    ) as JSX.Element;
  }
}
