import {
  Component,
  Element,
  h,
  JSX,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';
import { ILocalizedComponentResources } from '../../../../../i18n/fetchResources';
import { OnMutation } from '@utils/decorator/on-mutation';
import {
  onDisabledChange,
  onRequiredChange
} from '@utils/dom/on-attribute-change';
import { hasSlot } from '@utils/dom/has-slot';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';

import {
  GuxFormFieldHelp,
  GuxFormFieldError,
  GuxFormFieldFieldsetContainer,
  GuxFormFieldLegendLabel,
  GuxFormFieldLegendLabelContainer
} from '../../functional-components/functional-components';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import {
  getComputedLabelPosition,
  validateFormIds
} from '../../gux-form-field.service';
import { trackComponent } from '@utils/tracking/usage';
import componentResources from './i18n/en.json';

/**
 * @slot Required slot for gux-time-picker tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 * @slot label-info - Optional slot for label tooltip
 */
@Component({
  styleUrl: 'gux-form-field-time-picker.scss',
  tag: 'gux-form-field-time-picker',
  shadow: true
})
export class GuxFormFieldTimePicker {
  private getI18nValue: GetI18nValue;
  private input: HTMLGuxTimePickerElement;
  private label: HTMLLabelElement;
  private labelInfo: HTMLGuxLabelInfoBetaElement;
  private disabledObserver: MutationObserver;
  private requiredObserver: MutationObserver;

  @Element()
  private root: HTMLElement;

  @Prop()
  labelPosition: GuxFormFieldLabelPosition;

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

  @Watch('hasError')
  watchValue(hasError: boolean): void {
    const timePickerSlot = this.root.querySelector('gux-time-picker');
    if (timePickerSlot) {
      timePickerSlot.hasError = hasError;
    }
  }

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.labelInfo = this.root.querySelector('gux-label-info-beta');
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab': {
        if (this.input.matches(':focus-visible')) {
          void this.labelInfo?.showTooltip();
          setTimeout(() => {
            void this.labelInfo?.hideTooltip();
          }, 6000);
        }
        break;
      }
      default: {
        if (this.input.matches(':focus-visible')) {
          void this.labelInfo?.hideTooltip();
        }
        break;
      }
    }
  }

  @Listen('focusout')
  onFocusout(): void {
    void this.labelInfo?.hideTooltip();
  }

  async componentWillLoad(): Promise<void> {
    this.getI18nValue = await buildI18nForComponent(
      this.root,
      componentResources as ILocalizedComponentResources
    );

    this.setInput();
    this.setLabel();

    this.labelInfo = this.root.querySelector('gux-label-info-beta');
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
      <GuxFormFieldFieldsetContainer labelPosition={this.computedLabelPosition}>
        <GuxFormFieldLegendLabelContainer
          labelPosition={this.computedLabelPosition}
        >
          <GuxFormFieldLegendLabel
            required={this.required}
            labelText={this.label?.textContent}
          >
            <slot name="label" onSlotchange={() => this.setLabel()} />

            {this.renderScreenReaderText(
              this.getI18nValue('required'),
              this.required
            )}
            {this.renderScreenReaderText(
              getSlotTextContent(this.root, 'error'),
              this.hasError
            )}
          </GuxFormFieldLegendLabel>
          <slot name="label-info" />
        </GuxFormFieldLegendLabelContainer>
        <div class="gux-input-and-error-container">
          <div
            class={{
              'gux-input': true,
              'gux-input-error': this.hasError
            }}
          >
            <div
              class={{
                'gux-time-picker-container': true,
                'gux-disabled': this.disabled
              }}
            >
              <slot />
            </div>
          </div>
          <GuxFormFieldError show={this.hasError}>
            <slot name="error" />
          </GuxFormFieldError>
          <GuxFormFieldHelp show={!this.hasError && this.hasHelp}>
            <slot name="help" />
          </GuxFormFieldHelp>
        </div>
      </GuxFormFieldFieldsetContainer>
    ) as JSX.Element;
  }

  private renderScreenReaderText(
    text: string,
    condition: boolean = true
  ): JSX.Element {
    if (condition) {
      return (
        <gux-screen-reader-beta>{text}</gux-screen-reader-beta>
      ) as JSX.Element;
    }
  }

  private get variant(): string {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';

    const type = 'timePicker';

    return `${type}-${labelPositionVariant}`;
  }

  private setInput(): void {
    this.input = this.root.querySelector('gux-time-picker');

    this.disabled = this.input.disabled;
    this.required = this.input.required;

    this.disabledObserver = onDisabledChange(
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
