import {
  Component,
  Element,
  h,
  JSX,
  Prop,
  State,
  Method,
  forceUpdate,
  Listen
} from '@stencil/core';

import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { calculateInputDisabledState } from '@utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '@utils/dom/on-input-disabled-state-change';
import { OnMutation } from '@utils/decorator/on-mutation';
import { onRequiredChange } from '@utils/dom/on-attribute-change';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import { hasSlot } from '@utils/dom/has-slot';
import { getSlot } from '@utils/dom/get-slot';

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
  clearInput,
  hasContent,
  getComputedLabelPosition,
  validateFormIds,
  getSlottedInput
} from '../../gux-form-field.service';
import { trackComponent } from '@utils/tracking/usage';
import { focusInputElement } from '@utils/dom/focus-input-element';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 * @slot label-info - Optional slot for label tooltip
 */
@Component({
  styleUrl: 'gux-form-field-date.scss',
  tag: 'dux-form-field-date-beta',
  shadow: true
})
export class GuxFormFieldDate {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private labelInfo: HTMLGuxLabelInfoBetaElement;
  private disabledObserver: MutationObserver;
  private requiredObserver: MutationObserver;
  private hideLabelInfoTimeout: ReturnType<typeof setTimeout>;
  private inputEventHandler: () => void;

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
  private clearable: boolean = true;

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

  @State()
  expanded: boolean = false;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.labelInfo = getSlot(
      this.root,
      'label-info'
    ) as HTMLGuxLabelInfoBetaElement;
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    const isFocusVisible = this.input.matches(':focus-visible');

    switch (event.key) {
      case 'Tab': {
        if (isFocusVisible) {
          void this.labelInfo?.showTooltip();
          this.hideLabelInfoTimeout = setTimeout(() => {
            void this.labelInfo?.hideTooltip();
          }, 6000);
        }
        break;
      }
      default: {
        if (isFocusVisible) {
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

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxForceUpdate(): Promise<void> {
    this.hasContent = hasContent(this.input);
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');

    forceUpdate(this.root);
  }

  componentWillLoad(): void {
    this.setInput();
    this.setLabel();

    this.labelInfo = this.root.querySelector('[slot=label-info]');
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
    if (this.input && this.inputEventHandler) {
      this.input.removeEventListener('input', this.inputEventHandler);
    }

    clearTimeout(this.hideLabelInfoTimeout);
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
            variant={this.indicatorMark}
            required={this.required}
          />
          <slot name="label-info" />
        </GuxFormFieldLabel>
        <div class="gux-input-and-error-container">
          <gux-popup
            expanded={this.expanded}
            disabled={this.disabled}
            inline={true}
            offset={4}
          >
            {this.renderTarget()}
            {this.renderPopup()}
          </gux-popup>

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

  private renderTarget(): JSX.Element {
    return (
      <div
        slot="target"
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
          onClick={() => focusInputElement(this.input)}
        >
          <slot name="input" />

          {this.clearable && this.hasContent && !this.disabled && (
            <gux-form-field-input-clear-button
              onClick={() => clearInput(this.input)}
            ></gux-form-field-input-clear-button>
          )}

          <gux-button-slot accent="input-icon">
            <button
              type="button"
              data-testid="picker-button"
              disabled={this.disabled}
              onClick={() => this.showCalendar()}
              aria-expanded={this.expanded.toString()}
            >
              <gux-icon icon-name="fa/calendar-regular" decorative></gux-icon>
              <gux-screen-reader-beta>Open date picker</gux-screen-reader-beta>
            </button>
          </gux-button-slot>
        </div>
      </div>
    ) as JSX.Element;
  }

  private renderPopup(): JSX.Element {
    return (
      <div
        slot="popup"
        class="gux-popup-container"
        role="dialog"
        aria-label="Date picker"
      >
        <gux-calendar-beta>
          <input type="date" />
        </gux-calendar-beta>
      </div>
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
    this.input = getSlottedInput(this.root, 'input[type="date"][slot="input"]');

    this.hasContent = hasContent(this.input);

    preventBrowserValidationStyling(this.input);

    this.inputEventHandler = () => {
      this.hasContent = hasContent(this.input);
    };
    this.input.addEventListener('input', this.inputEventHandler);

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

  private showCalendar(): void {
    this.expanded = !this.expanded;
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside() {
    this.expanded = false;
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
      case 'Tab':
        this.expanded = false;
        break;
    }
  }
}
