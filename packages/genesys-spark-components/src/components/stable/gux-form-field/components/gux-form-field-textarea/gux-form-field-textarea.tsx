import { Component, Element, h, JSX, Listen, Prop, State } from '@stencil/core';

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

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import {
  getComputedLabelPosition,
  validateFormIds
} from '../../gux-form-field.service';
import { GuxFormFieldTextAreaResize } from './gux-form-field-textarea.types';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 * @slot label-info - Optional slot for label tooltip
 */
@Component({
  styleUrl: 'gux-form-field-textarea.scss',
  tag: 'gux-form-field-textarea',
  shadow: true
})
export class GuxFormFieldTextarea {
  private input: HTMLTextAreaElement;
  private label: HTMLLabelElement;
  private labelInfo: HTMLGuxLabelInfoBetaElement;
  private disabledObserver: MutationObserver;
  private requiredObserver: MutationObserver;
  private textareaContainerElement: HTMLDivElement;
  private hideLabelInfoTimeout: ReturnType<typeof setTimeout>;

  @Element()
  private root: HTMLElement;

  @Prop()
  resize: GuxFormFieldTextAreaResize;

  @Prop()
  labelPosition: GuxFormFieldLabelPosition;

  @State()
  private computedLabelPosition: GuxFormFieldLabelPosition = 'above';

  @State()
  private disabled: boolean;

  @State()
  private required: boolean = true;

  @State()
  private hasError: boolean = false;

  @State()
  private hasHelp: boolean = false;

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

    this.labelInfo = this.root.querySelector('[slot=label-info]');
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');

    trackComponent(this.root, { variant: this.variant });
  }

  componentDidLoad(): void {
    this.updateHeight(this.textareaContainerElement, this.input, this.resize);
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
          required={this.required}
          position={this.computedLabelPosition}
        >
          <slot name="label" onSlotchange={() => this.setLabel()} />
          <gux-form-field-label-indicator
            variant="required"
            required={this.required}
          />
          <slot name="label-info" />
        </GuxFormFieldLabel>
        <div class="gux-input-and-error-container">
          <div
            ref={el => (this.textareaContainerElement = el)}
            class={{
              'gux-input': true,
              [`gux-resize-${this.resize}`]: true,
              'gux-disabled': this.disabled,
              'gux-input-error': this.hasError
            }}
          >
            <slot name="input" />
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

    return `${this.resize}-${labelPositionVariant}`;
  }

  private setInput(): void {
    this.input = this.root.querySelector('textarea[slot="input"]');

    preventBrowserValidationStyling(this.input);

    this.updateHeight(this.textareaContainerElement, this.input, this.resize);

    this.input.addEventListener('input', () => {
      this.updateHeight(this.textareaContainerElement, this.input, this.resize);
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

  private updateHeight(
    container: HTMLElement,
    input: HTMLTextAreaElement,
    resize: GuxFormFieldTextAreaResize
  ): void {
    if (resize === 'auto') {
      if (container) {
        container.dataset.replicatedValue = input.value;
        container.style.maxHeight = input.style.maxHeight;
      }
    }
  }
}
