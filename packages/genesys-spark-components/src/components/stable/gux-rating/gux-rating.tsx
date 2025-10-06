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
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import ratingResources from './i18n/en.json';
import { OnClickOutside } from '@utils/decorator/on-click-outside';

@Component({
  styleUrl: 'gux-rating.scss',
  tag: 'gux-rating',
  shadow: true
})
export class GuxRating {
  private i18n: GetI18nValue;
  private starContainer: HTMLDivElement;
  private compactRatingElement: HTMLGuxIconElement;

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
  compact: boolean = false;

  @State()
  isOpen: boolean = false;

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.isOpen = false;
  }

  @Listen('focusin')
  onFocusIn(): void {
    if (this.compact) {
      this.compactRatingElement.focus();
    }
  }

  @Listen('click')
  onClick(event: MouseEvent): void {
    event.stopPropagation();

    if (this.disabled || this.readonly || this.compact) {
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

    if (this.disabled || this.readonly || this.isOpen) {
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

  get ariaLabel(): string {
    return this.root?.getAttribute('aria-label');
  }

  get ariaLabelledby(): string {
    return this.root?.getAttribute('aria-labelledby');
  }

  private updateRatingValue(newValue: number): void {
    const clampedNewValue = clamp(newValue, 0, this.maxValue);

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

  private getCompactRatingElement(): JSX.Element {
    let iconName: string;

    if (this.value === 0) {
      iconName = 'fa/star-regular';
    } else {
      iconName = 'fa/star-solid';
    }

    return (
      <div class="gux-star-rating-compact">
        <div class="gux-star-rating-label-value">
          <gux-icon
            tabindex="0"
            ref={(el: HTMLGuxIconElement) => (this.compactRatingElement = el)}
            icon-name={iconName}
            decorative
            size="small"
          ></gux-icon>
          <span class="gux-star-rating-value">{this.value}</span>
        </div>
        {this.renderEditRatingButton()}
      </div>
    ) as JSX.Element;
  }

  private renderEditRatingButton(): JSX.Element {
    if (!this.readonly) {
      return (
        <div class="gux-edit-rating-button">
          <gux-button
            tabindex="-1"
            onClick={() => {
              this.togglePopover();
            }}
            id="popover-target"
            accent="inline"
            disabled={this.disabled}
          >
            {this.i18n('editRating')}
          </gux-button>
          <gux-popover-beta
            position="bottom-start"
            for="popover-target"
            is-open={this.isOpen}
          >
            <gux-rating
              tabindex="-1"
              value={this.value}
              max-value={this.maxValue}
              increment={this.increment}
              readonly={this.readonly}
              onClick={(e: Event) => this.handlePopoverRatingChange(e)}
              aria-label={this.ariaLabel}
              aria-labelledby={this.ariaLabelledby}
            ></gux-rating>
          </gux-popover-beta>
        </div>
      ) as JSX.Element;
    }
  }

  private togglePopover(): void {
    this.isOpen = !this.isOpen;
  }

  private handlePopoverRatingChange(event: Event): void {
    const newValue = (event.target as HTMLGuxRatingElement).value;
    this.value = newValue;
    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
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

  private renderStars(): JSX.Element {
    if (this.compact) {
      return this.getCompactRatingElement();
    }
    return this.getRatingStarElements();
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
            'gux-disabled': this.disabled,
            'gux-compact': this.compact
          }}
        >
          {this.renderStars()}
        </div>
      </Host>
    ) as JSX.Element;
  }
}
