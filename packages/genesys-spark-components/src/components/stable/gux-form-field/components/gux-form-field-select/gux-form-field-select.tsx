import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import { calculateInputDisabledState } from '@utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '@utils/dom/on-input-disabled-state-change';
import { OnMutation } from '@utils/decorator/on-mutation';
import { onRequiredChange } from '@utils/dom/on-attribute-change';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import { hasSlot } from '@utils/dom/has-slot';

import {
  GuxFormFieldHelp,
  GuxFormFieldError,
  GuxFormFieldLabel,
  GuxFormFieldContainer
} from '../../functional-components/functional-components';

import {
  GuxFormFieldLabelPosition,
  GuxFormFieldIndicatorMark
} from '../../gux-form-field.types';
import {
  getComputedLabelPosition,
  validateFormIds
} from '../../gux-form-field.service';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
@Component({
  styleUrl: 'gux-form-field-select.scss',
  tag: 'gux-form-field-select',
  shadow: true
})
export class GuxFormFieldSelect {
  private input: HTMLSelectElement;
  private label: HTMLLabelElement;
  private disabledObserver: MutationObserver;
  private requiredObserver: MutationObserver;

  @Element()
  private root: HTMLElement;

  @Prop()
  labelPosition: GuxFormFieldLabelPosition;

  /**
   * Field indicator mark which can show *, (optional) or blank
   * Defaults to required. When set to required, the component will display * for required fields and blank for optional
   * When set to optional, the component will display (optional) for optional and blank for required.
   */
  @Prop()
  indicatorMark: GuxFormFieldIndicatorMark = 'required';

  @State()
  private computedLabelPosition: GuxFormFieldLabelPosition = 'above';

  @State()
  private disabled: boolean;

  @State()
  private required: boolean;

  @State()
  private hasError: boolean = false;

  @State()
  private hasHelp: boolean = false;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }

  componentWillLoad(): void {
    this.setInput();
    this.setLabel();

    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');

    trackComponent(this.root, { variant: this.variant });
  }

  disconnectedCallback(): void {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
    if (this.requiredObserver) {
      this.requiredObserver.disconnect();
    }
  }

  render(): JSX.Element {
    return (
      <GuxFormFieldContainer labelPosition={this.computedLabelPosition}>
        <GuxFormFieldLabel
          position={this.computedLabelPosition}
          required={this.required}
          indicatorMark={this.indicatorMark}
        >
          <slot name="label" onSlotchange={() => this.setLabel()} />
        </GuxFormFieldLabel>
        <div class="gux-input-and-error-container">
          <div
            class={{
              'gux-input': true,
              'gux-input-error': this.hasError
            }}
          >
            <div
              class={{
                'gux-input-container': true,
                'gux-disabled': this.disabled
              }}
            >
              <slot name="input" />
              <gux-icon
                icon-name="custom/chevron-down-small-regular"
                decorative
              ></gux-icon>
            </div>
          </div>
          <GuxFormFieldError show={this.hasError}>
            <slot name="error" />
          </GuxFormFieldError>
          <GuxFormFieldHelp show={!this.hasError && this.hasHelp}>
            <slot name="help" />
          </GuxFormFieldHelp>
        </div>
      </GuxFormFieldContainer>
    ) as JSX.Element;
  }

  private get variant(): string {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';

    const type = this.input.getAttribute('type');

    return `${type}-${labelPositionVariant}`;
  }

  private setInput(): void {
    this.input = this.root.querySelector('select[slot="input"]');

    preventBrowserValidationStyling(this.input);

    this.disabled = calculateInputDisabledState(this.input);
    this.required = this.input.required;

    this.disabledObserver = onInputDisabledStateChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );
    this.requiredObserver = onRequiredChange(
      this.input,
      (required: boolean) => {
        this.required = required;
      }
    );

    validateFormIds(this.root, this.input);
  }

  private setLabel(): void {
    this.label = this.root.querySelector('label[slot="label"]');

    this.computedLabelPosition = getComputedLabelPosition(
      this.label,
      this.labelPosition
    );
  }
}
