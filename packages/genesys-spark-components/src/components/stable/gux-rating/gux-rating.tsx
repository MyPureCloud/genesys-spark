import {
  Component,
  Element,
  h,
  Host,
  Listen,
  JSX,
  Prop,
  State
} from '@stencil/core';

import simulateNativeEvent from '@utils/dom/simulate-native-event';
import clamp from '@utils/number/clamp';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import ratingResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-rating.scss',
  tag: 'gux-rating',
  shadow: true
})
export class GuxRating {
  private i18n: GetI18nValue;
  private starContainer: HTMLDivElement;
  private popoverElement: HTMLGuxPopoverElement;

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

  @Prop()
  increment: 'default' | 'half' = 'default';

  @Prop()
  shortened: boolean = false;

  @State()
  isOpen: boolean = false;

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
      if (this.increment === 'half') {
        this.updateRatingValue(clickedStarNominalValue - 0.5);
      } else {
        this.updateRatingValue(clickedStarNominalValue);
      }
    } else {
      this.updateRatingValue(clickedStarNominalValue);
    }
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    event.stopPropagation();

    if (this.disabled || this.readonly) {
      return;
    }

    const increment = this.increment === 'half' ? 0.5 : 1;

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        event.preventDefault();
        this.updateRatingValue(this.value + increment);
        break;

      case 'ArrowDown':
      case 'ArrowLeft':
        event.preventDefault();
        this.updateRatingValue(this.value - increment);
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
    const clampedNewValue = clamp(
      newValue,
      0,
      Array.from(this.starContainer.children).length
    );

    const increment = this.increment === 'half' ? 0.5 : 1;

    const validatedNewValue =
      Math.round(clampedNewValue / increment) * increment;

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
          return acc.concat('fa/star-sharp-half-stroke-regular');
        } else if (cv + 1 <= this.value) {
          return acc.concat('fa/star-solid');
        }
        return acc.concat('fa/star-regular');
      }, [] as string[])
      .map(
        iconName =>
          (
            <gux-icon icon-name={iconName} decorative size="small"></gux-icon>
          ) as JSX.Element
      );
  }

  private getShortenedRatingElement(): JSX.Element {
    let iconName: string;

    if (this.value === this.maxValue) {
      iconName = 'fa/star-solid';
    } else if (this.value >= this.maxValue / 2) {
      iconName = 'fa/star-sharp-half-stroke-regular';
    } else {
      iconName = 'fa/star-regular';
    }

    return (
      <div class="gux-star-rating-shortened">
        <div class="gux-star-rating-label-value">
          <gux-icon icon-name={iconName} decorative size="small"></gux-icon>
          <span class="gux-star-rating-value">{this.value}</span>
        </div>
        <gux-button
          onClick={() => this.togglePopover()}
          id="popover-target"
          accent="inline"
        >
          <span>{this.i18n('editRating')}</span>
        </gux-button>
        <gux-popover
          position="bottom"
          for="popover-target"
          ref={el => (this.popoverElement = el)}
          is-open={this.isOpen}
        >
          <span slot="title">Title</span>
        </gux-popover>
      </div>
    ) as JSX.Element;
  }

  private togglePopover(): void {
    this.isOpen = !this.isOpen;
  }

  private getTabIndex(): number {
    return this.disabled ? -1 : 0;
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  async componentWillRender(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, ratingResources);
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
          {this.shortened
            ? this.getShortenedRatingElement()
            : this.getRatingStarElements()}
        </div>
      </Host>
    ) as JSX.Element;
  }
}
