import { Component, Element, h, JSX, Prop, State, Watch } from '@stencil/core';

import { calculateInputDisabledState } from '@utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '@utils/dom/on-input-disabled-state-change';
import { OnMutation } from '@utils/decorator/on-mutation';
import { onRequiredChange } from '@utils/dom/on-attribute-change';
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
import { trackComponent } from '../../../../../usage-tracking';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
@Component({
  styleUrl: 'gux-form-field-dropdown.less',
  tag: 'gux-form-field-dropdown',
  shadow: true
})
export class GuxFormFieldDropdown {
  private listboxElement: HTMLGuxListboxElement | HTMLGuxListboxMultiElement;
  private dropdownElement:
    | HTMLGuxDropdownElement
    | HTMLGuxDropdownMultiBetaElement;
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
      this.root.querySelector('gux-dropdown-multi-beta');
    if (dropdownSlot) {
      dropdownSlot.hasError = hasError;
    }
  }

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
        >
          <slot name="label" onSlotchange={() => this.setLabel()} />
        </GuxFormFieldLabel>
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
      </GuxFormFieldContainer>
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
      this.root.querySelector('gux-dropdown-multi-beta');
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

    validateFormIds(this.root, this.listboxElement);
  }

  private setLabel(): void {
    this.label = this.root.querySelector('label[slot="label"]');

    this.computedLabelPosition = getComputedLabelPosition(
      this.label,
      this.labelPosition
    );
  }
}
