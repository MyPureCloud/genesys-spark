import {
  Component,
  Element,
  forceUpdate,
  h,
  JSX,
  Method,
  Prop,
  State
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';
import { ILocalizedComponentResources } from '../../../../../i18n/fetchResources';

import { calculateInputDisabledState } from '@utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '@utils/dom/on-input-disabled-state-change';
import { OnMutation } from '@utils/decorator/on-mutation';
import { onRequiredChange } from '@utils/dom/on-attribute-change';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import setInputValue from '@utils/dom/set-input-value';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { hasSlot } from '@utils/dom/has-slot';

import {
  GuxFormFieldHelp,
  GuxFormFieldError,
  GuxFormFieldLabel,
  GuxFormFieldContainer
} from '../../functional-components/functional-components';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import {
  clearInput,
  getComputedLabelPosition,
  hasContent,
  validateFormIds,
  getSlottedInput
} from '../../gux-form-field.service';
import { trackComponent } from '@utils/tracking/usage';
import componentResources from './i18n/en.json';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 * @part input-section - Style input container
 */
@Component({
  styleUrl: 'gux-form-field-number.less',
  tag: 'gux-form-field-number',
  shadow: { delegatesFocus: true }
})
export class GuxFormFieldNumber {
  private getI18nValue: GetI18nValue;
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private disabledObserver: MutationObserver;
  private requiredObserver: MutationObserver;

  @Element()
  private root: HTMLElement;

  @Prop()
  clearable: boolean;

  @Prop()
  labelPosition: GuxFormFieldLabelPosition;

  @State()
  private computedLabelPosition: GuxFormFieldLabelPosition = 'above';

  @State()
  private disabled: boolean;

  @State()
  private required: boolean;

  @State()
  private hasContent: boolean = false;

  @State()
  private hasError: boolean = false;

  @State()
  private hasHelp: boolean = false;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxForceUpdate(): Promise<void> {
    this.hasContent = hasContent(this.input);
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');

    forceUpdate(this.root);
  }

  async componentWillLoad(): Promise<void> {
    this.getI18nValue = await buildI18nForComponent(
      this.root,
      componentResources as ILocalizedComponentResources
    );
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
    const showClearButton = this.clearable && this.hasContent && !this.disabled;

    return (
      <GuxFormFieldContainer labelPosition={this.computedLabelPosition}>
        <GuxFormFieldLabel
          position={this.computedLabelPosition}
          required={this.required}
        >
          <slot name="label" onSlotchange={() => this.setLabel()} />
        </GuxFormFieldLabel>
        <div class="gux-input-and-error-container">
          <div
            class={{
              'gux-input': true,
              'gux-input-error': this.hasError
            }}
            part="input-section"
          >
            <div
              class={{
                'gux-input-container': true,
                'gux-disabled': this.disabled,
                'gux-clear': showClearButton
              }}
            >
              <slot name="input" onSlotchange={() => this.setInput()} />
              {showClearButton && (
                <gux-form-field-input-clear-button
                  onClick={() => clearInput(this.input)}
                ></gux-form-field-input-clear-button>
              )}
            </div>
            {this.renderStepButtons(
              this.input,
              this.getI18nValue,
              this.disabled
            )}
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
    const clearableVariant = this.clearable ? 'clearable' : 'unclearable';

    return `${clearableVariant}-${labelPositionVariant}`;
  }

  private setInput(): void {
    this.input = getSlottedInput(
      this.root,
      'input[type="number"][slot="input"]'
    );

    this.hasContent = hasContent(this.input);

    preventBrowserValidationStyling(this.input);

    this.input.addEventListener('input', () => {
      this.hasContent = hasContent(this.input);
    });

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

  private renderStepButtons(
    input: HTMLInputElement,
    getI18nValue: GetI18nValue,
    disabled: boolean
  ): JSX.Element {
    return (
      <div class="gux-step-buttons-container">
        <button
          class="gux-step-button"
          tabIndex={-1}
          type="button"
          title={getI18nValue('increment')}
          disabled={disabled}
          onClick={() => this.stepUp(input)}
        >
          <gux-icon icon-name="chevron-small-up" decorative></gux-icon>
        </button>

        <button
          class="gux-step-button"
          tabIndex={-1}
          type="button"
          title={getI18nValue('decrement')}
          disabled={disabled}
          onClick={() => this.stepDown(input)}
        >
          <gux-icon icon-name="chevron-small-down" decorative></gux-icon>
        </button>
      </div>
    ) as JSX.Element;
  }

  private stepDown(input: HTMLInputElement): void {
    if (input.value === '') {
      setInputValue(input, input.min || '0', false);
    } else {
      input.stepDown();
      this.simulateNativeInputAndChangeEvents(input);
    }
  }

  private stepUp(input: HTMLInputElement): void {
    if (input.value === '') {
      setInputValue(input, input.min || '0', false);
    } else {
      input.stepUp();
      this.simulateNativeInputAndChangeEvents(input);
    }
  }

  private simulateNativeInputAndChangeEvents(input: HTMLInputElement): void {
    simulateNativeEvent(input, 'input');
    simulateNativeEvent(input, 'change');
  }
}
