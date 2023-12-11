import { Component, Element, h, JSX, Prop, State, Watch } from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';
import { ILocalizedComponentResources } from '../../../../../i18n/fetchResources';
import { calculateInputDisabledState } from '@utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '@utils/dom/on-input-disabled-state-change';
import { OnMutation } from '@utils/decorator/on-mutation';
import { onRequiredChange } from '@utils/dom/on-attribute-change';
import { hasSlot } from '@utils/dom/has-slot';

import {
  GuxFormFieldHelp,
  GuxFormFieldError,
  GuxFormFieldLegendLabel,
  GuxFormFieldFieldsetContainer
} from '../../functional-components/functional-components';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import {
  getComputedLabelPosition,
  setSlotAriaLabelledby,
  setSlotAriaDescribedby
} from '../../gux-form-field.service';
import { trackComponent } from '@utils/tracking/usage';
import componentResources from './i18n/en.json';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
@Component({
  styleUrl: 'gux-form-field-dropdown.scss',
  tag: 'gux-form-field-dropdown',
  shadow: true
})
export class GuxFormFieldDropdown {
  private getI18nValue: GetI18nValue;
  private listboxElement: HTMLGuxListboxElement | HTMLGuxListboxMultiElement;
  private dropdownElement: HTMLGuxDropdownElement | HTMLGuxDropdownMultiElement;
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
  private required: boolean;

  @State()
  private hasError: boolean = false;

  @State()
  private hasHelp: boolean = false;

  @Watch('hasError')
  watchValue(hasError: boolean): void {
    const dropdownSlot =
      this.root.querySelector('gux-dropdown') ||
      this.root.querySelector('gux-dropdown-multi');
    if (dropdownSlot) {
      dropdownSlot.hasError = hasError;
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
  private renderScreenReaderText(
    text: string,
    condition: boolean = false
  ): JSX.Element {
    if (condition) {
      return (
        <gux-screen-reader-beta>{text}</gux-screen-reader-beta>
      ) as JSX.Element;
    }
  }
  render(): JSX.Element {
    return (
      <GuxFormFieldFieldsetContainer labelPosition={this.computedLabelPosition}>
        <GuxFormFieldLegendLabel
          position={this.computedLabelPosition}
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
          {this.renderScreenReaderText(
            getSlotTextContent(this.root, 'help'),
            this.hasHelp
          )}
        </GuxFormFieldLegendLabel>
        <div class="gux-input-and-error-container">
          <div
            class={{
              'gux-input': true,
              'gux-input-error': this.hasError,
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

  private get variant(): string {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';

    const type = 'dropdown';

    return `${type}-${labelPositionVariant}`;
  }

  private setInput(): void {
    this.dropdownElement =
      this.root.querySelector('gux-dropdown') ||
      this.root.querySelector('gux-dropdown-multi');
    this.listboxElement =
      this.root.querySelector('gux-listbox') ||
      this.root.querySelector('gux-listbox-multi');

    this.disabled = calculateInputDisabledState(this.dropdownElement);
    this.required = this.dropdownElement.required;

    this.disabledObserver = onInputDisabledStateChange(
      this.dropdownElement,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );
    this.requiredObserver = onRequiredChange(
      this.dropdownElement,
      (required: boolean) => {
        this.required = required;
      }
    );

    setSlotAriaLabelledby(this.root, this.listboxElement, 'label');
    setSlotAriaDescribedby(this.root, this.listboxElement, 'error');
    setSlotAriaDescribedby(this.root, this.listboxElement, 'help');
  }

  private setLabel(): void {
    this.label = this.root.querySelector('label[slot="label"]');

    this.computedLabelPosition = getComputedLabelPosition(
      this.label,
      this.labelPosition
    );
  }
}
