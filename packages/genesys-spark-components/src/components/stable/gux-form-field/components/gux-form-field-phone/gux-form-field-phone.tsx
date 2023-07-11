import { Component, Element, h, JSX, Prop, State, Watch } from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';
import { ILocalizedComponentResources } from '../../../../../i18n/fetchResources';
import { OnMutation } from '@utils/decorator/on-mutation';
import {
  onDisabledChange,
  onRequiredChange
} from '@utils/dom/on-attribute-change';
import { trackComponent } from '@utils/tracking/usage';

import { GuxFormFieldFieldsetContainer } from '../../functional-components/gux-form-field-fieldset-container/gux-form-field-fieldset-container';
import { GuxFormFieldError } from '../../functional-components/gux-form-field-error/gux-form-field-error';
import { GuxFormFieldLegendLabel } from '../../functional-components/gux-form-field-legend-label/gux-form-field-legend-label';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import { hasSlot } from '@utils/dom/has-slot';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';
import {
  getComputedLabelPosition,
  validateFormIds
} from '../../gux-form-field.service';

import componentResources from './i18n/en.json';
import { GuxFormFieldHelp } from '../../functional-components/gux-form-field-help/gux-form-field-help';

/**
 * @slot - Required slot for gux-phone-input-beta tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
@Component({
  styleUrl: 'gux-form-field-phone.less',
  tag: 'gux-form-field-phone',
  shadow: true
})
export class GuxFormFieldPhone {
  private getI18nValue: GetI18nValue;
  private phoneInputElement: HTMLGuxPhoneInputBetaElement;
  private label: HTMLLabelElement;
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
  private required: boolean = false;

  @State()
  private hasError: boolean = false;

  @State()
  private hasHelp: boolean = false;

  @Watch('hasError')
  watchValue(hasError: boolean): void {
    const phoneInputSlot = this.root.querySelector('gux-phone-input-beta');
    if (phoneInputSlot) {
      phoneInputSlot.hasError = hasError;
    }
  }

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
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
    this.disabledObserver.disconnect();
    this.requiredObserver.disconnect();
  }

  render(): JSX.Element {
    return (
      <GuxFormFieldFieldsetContainer labelPosition={this.computedLabelPosition}>
        <GuxFormFieldLegendLabel
          position={this.computedLabelPosition}
          required={this.required}
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

    const type = 'phoneInput';

    return `${type}-${labelPositionVariant}`;
  }

  private setInput(): void {
    this.phoneInputElement = this.root.querySelector('gux-phone-input-beta');

    this.disabled = this.phoneInputElement.disabled;
    this.required = this.phoneInputElement.required;

    this.disabledObserver = onDisabledChange(
      this.phoneInputElement,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );
    this.requiredObserver = onRequiredChange(
      this.phoneInputElement,
      (required: boolean) => {
        this.required = required;
      }
    );

    validateFormIds(this.root, this.phoneInputElement);
  }

  private setLabel(): void {
    this.label = this.root.querySelector('label[slot="label"]');

    this.computedLabelPosition = getComputedLabelPosition(
      this.label,
      this.labelPosition
    );
  }
}
