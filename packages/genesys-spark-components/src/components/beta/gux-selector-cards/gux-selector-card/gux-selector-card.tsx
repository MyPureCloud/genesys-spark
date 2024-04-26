import { Component, h, JSX, Element, Prop, State, Host } from '@stencil/core';

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
 * @slot content - Optional slot for additional text content
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

  //TODO: COMUI-2784 Descriptive variant styling
  @Prop()
  variant: GuxSelectorCardVariant = 'simple';

  @State()
  private disabled: boolean;

  @State()
  private checked: boolean;

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
      'input[type="radio"][slot="input"]'
    );
    this.checked = this.input.checked;
    preventBrowserValidationStyling(this.input);

    setSlotAriaDescribedby(this.root, this.input, 'content');

    this.disabled = calculateInputDisabledState(this.input);

    this.disabledObserver = onInputDisabledStateChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );

    validateFormIds(this.root, this.input);
  }

  private setChecked(): void {
    this.input.checked = true;
    this.checked = true;
  }

  private renderContent(): JSX.Element | null {
    if (this.variant === 'simple') {
      return (
        <span class="gux-screenreader">
          <slot name="content" />
        </span>
      ) as JSX.Element;
    } else {
      return (<slot name="content" />) as JSX.Element; //TODO: COMUI-2784 Descriptive variant
    }
  }

  private renderBadge(): JSX.Element | null {
    if (this.variant === 'descriptive') {
      return (<slot name="badge" />) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host
        class={{
          [`gux-${this.variant}`]: true,
          'gux-checked': this.checked,
          'gux-disabled': this.disabled
        }}
      >
        <div class="gux-content" onClick={() => this.setChecked()}>
          <div class="gux-icon">
            <slot name="icon" />
          </div>
          <gux-truncate max-lines={2}>
            <slot name="label" />
          </gux-truncate>
          <slot name="input" />
          {this.renderContent()}
          {this.renderBadge()}
        </div>
      </Host>
    ) as JSX.Element;
  }
}
