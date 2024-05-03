import { Component, Element, h, JSX, Prop, State, Watch } from '@stencil/core';

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
  GuxFormFieldLegendLabel
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
import componentResources from './i18n/en.json';

/**
 * @slot Required slot for gux-time-zone-picker-beta tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
@Component({
  styleUrl: 'gux-form-field-time-zone-picker.scss',
  tag: 'gux-form-field-time-zone-picker',
  shadow: true
})
export class GuxFormFieldTimeZonePicker {
  private getI18nValue: GetI18nValue;
  private timeZonePickerElement: HTMLGuxTimeZonePickerBetaElement;
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
  indicatorMark: GuxFormFieldIndicatorMark;

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
    const timeZonePickerSlot = this.root.querySelector(
      'gux-time-zone-picker-beta'
    );
    if (timeZonePickerSlot) {
      timeZonePickerSlot.hasError = hasError;
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
        <GuxFormFieldLegendLabel
          position={this.computedLabelPosition}
          required={this.required}
          labelText={this.label?.textContent}
          indicatorMark={this.indicatorMark}
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
              'gux-input-error': this.hasError,
              'gux-time-zone-picker-container': true,
              'gux-disabled': this.disabled
            }}
          >
            <slot />
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

    const type = 'timeZonePicker';

    return `${type}-${labelPositionVariant}`;
  }

  private setInput(): void {
    this.timeZonePickerElement = this.root.querySelector(
      'gux-time-zone-picker-beta'
    );

    this.disabled = this.timeZonePickerElement.disabled;
    this.required = this.timeZonePickerElement.required;

    this.disabledObserver = onDisabledChange(
      this.timeZonePickerElement,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );
    this.requiredObserver = onRequiredChange(
      this.timeZonePickerElement,
      (required: boolean) => {
        this.required = required;
      }
    );

    validateFormIds(this.root, this.timeZonePickerElement);
  }

  private setLabel(): void {
    this.label = this.root.querySelector('label[slot="label"]');

    this.computedLabelPosition = getComputedLabelPosition(
      this.label,
      this.labelPosition
    );
  }
}
