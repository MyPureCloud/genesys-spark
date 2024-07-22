import { Component, State, Element, JSX, Prop, h, Listen } from '@stencil/core';
import { OnMutation } from '@utils/decorator/on-mutation';
import { hasSlot } from '@utils/dom/has-slot';
import { trackComponent } from '@utils/tracking/usage';
import {
  GuxFormFieldError,
  GuxFormFieldContainer,
  GuxFormFieldHelp,
  GuxFormFieldLabel
} from '../../functional-components/functional-components';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import {
  getComputedLabelPosition,
  getSlottedInput,
  validateFormIds
} from '../../gux-form-field.service';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import { onRequiredChange } from '@utils/dom/on-attribute-change';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 * @slot label-info - Optional slot for tooltip
 */

@Component({
  styleUrl: 'gux-form-field-file.scss',
  tag: 'gux-form-field-file',
  shadow: true
})
export class GuxFormFieldFile {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private labelInfo: HTMLGuxLabelInfoBetaElement;
  private requiredObserver: MutationObserver;
  private hideLabelInfoTimeout: ReturnType<typeof setTimeout>;

  @Element()
  private root: HTMLElement;

  @Prop()
  labelPosition: GuxFormFieldLabelPosition;

  @State()
  private computedLabelPosition: GuxFormFieldLabelPosition = 'above';

  @State()
  private hasError: boolean = false;

  @State()
  private hasHelp: boolean = false;

  @State()
  private required: boolean = false;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.labelInfo = this.root.querySelector('[slot=label-info]');
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab': {
        if (this.input.matches(':focus-visible')) {
          void this.labelInfo?.showTooltip();
          this.hideLabelInfoTimeout = setTimeout(() => {
            void this.labelInfo?.hideTooltip();
          }, 6000);
        }
        break;
      }
      default: {
        if (this.input.matches(':focus-visible')) {
          void this.labelInfo?.hideTooltip();
          clearTimeout(this.hideLabelInfoTimeout);
        }
        break;
      }
    }
  }

  @Listen('focusout')
  onFocusout(): void {
    void this.labelInfo?.hideTooltip();
    clearTimeout(this.hideLabelInfoTimeout);
  }

  componentWillLoad(): void {
    this.setInput();
    this.setLabel();

    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
    this.labelInfo = this.root.querySelector('[slot=label-info]');

    trackComponent(this.root, { variant: this.variant });
  }

  disconnectedCallback(): void {
    if (this.requiredObserver) {
      this.requiredObserver.disconnect();
    }
  }

  private setLabel(): void {
    this.label = this.root.querySelector('label[slot="label"]');

    this.computedLabelPosition = getComputedLabelPosition(
      this.label,
      this.labelPosition
    );
  }

  private setInput(): void {
    this.input = getSlottedInput(this.root, 'input[type="file"][slot="input"]');

    preventBrowserValidationStyling(this.input);
    this.required = this.input.required;

    this.requiredObserver = onRequiredChange(
      this.input,
      (required: boolean) => {
        this.required = required;
      }
    );

    validateFormIds(this.root, this.input);
  }

  private get variant(): string {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';

    const type = 'fileInput';

    return `${type}-${labelPositionVariant}`;
  }

  render(): JSX.Element {
    return (
      <GuxFormFieldContainer labelPosition={this.computedLabelPosition}>
        <GuxFormFieldLabel
          position={this.computedLabelPosition}
          required={this.required}
        >
          <slot name="label" onSlotchange={() => this.setLabel()} />
          <gux-form-field-label-indicator
            variant="required"
            required={this.required}
          />
          <slot name="label-info" />
        </GuxFormFieldLabel>
        <div class="gux-input-and-error-container">
          <slot name="input" onSlotchange={() => this.setInput()} />
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
}
