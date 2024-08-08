import { Component, h, JSX, Element, Prop, State } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import {
  validateFormIds,
  getSlottedInput
} from '../../../stable/gux-form-field/gux-form-field.service';
import { GuxSelectorCardVariant } from './gux-selector-card.types';
import { calculateInputDisabledState } from '@utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '@utils/dom/on-input-disabled-state-change';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import { setSlotAriaDescribedby } from '../../../stable/gux-form-field/gux-form-field.service';

/**
 * @slot icon - Required slot for icon
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot description - Optional slot for additional text description
 * @slot badge - Optional slot for badge
 */

@Component({
  styleUrl: 'gux-selector-card.scss',
  tag: 'gux-selector-card-beta',
  shadow: true
})
export class GuxSelectorCard {
  private input: HTMLInputElement;
  private disabledObserver: MutationObserver;

  @Element()
  private root: HTMLElement;

  @Prop()
  variant: GuxSelectorCardVariant = 'simple';

  @State()
  private disabled: boolean;

  componentWillLoad(): void {
    this.setInput();
    trackComponent(this.root, { variant: this.variant });
  }

  disconnectedCallback(): void {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }

  private setInput(): void {
    this.input = getSlottedInput(
      this.root,
      'input[type="radio"][slot="input"], input[type="checkbox"][slot="input"]'
    );

    preventBrowserValidationStyling(this.input);

    setSlotAriaDescribedby(this.root, this.input, 'description');

    this.disabled = calculateInputDisabledState(this.input);

    this.disabledObserver = onInputDisabledStateChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );

    validateFormIds(this.root, this.input);
  }

  private renderDescription(): JSX.Element | null {
    if (this.variant === 'simple') {
      return (
        <span class="gux-screenreader">
          <slot name="description" />
        </span>
      ) as JSX.Element;
    } else {
      return (
        <gux-truncate class="gux-description" max-lines={3}>
          <slot name="description" />
        </gux-truncate>
      ) as JSX.Element;
    }
  }

  private renderBadge(): JSX.Element | null {
    if (this.variant === 'descriptive') {
      return (<slot name="badge" />) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-selector-card': true,
          [`gux-${this.variant}`]: true,
          'gux-disabled': this.disabled
        }}
      >
        <div class="gux-content">
          <div class="gux-icon">
            <slot name="icon" />
          </div>
          <gux-truncate class="gux-label" max-lines={2}>
            <slot name="label" />
          </gux-truncate>
          <slot name="input" />
          {this.renderDescription()}
          {this.renderBadge()}
        </div>
      </div>
    ) as JSX.Element;
  }
}
