import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import { calculateInputDisabledState } from '../../../../../utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '../../../../../utils/dom/on-input-disabled-state-change';
import { OnMutation } from '../../../../../utils/decorator/on-mutation';
import { onRequiredChange } from '../../../../../utils/dom/on-attribute-change';
import { trackComponent } from '../../../../../usage-tracking';

import { GuxFormFieldContainer } from '../../functional-components/gux-form-field-container/gux-form-field-container';
import { GuxFormFieldError } from '../../functional-components/gux-form-field-error/gux-form-field-error';
import { GuxFormFieldLabel } from '../../functional-components/gux-form-field-label/gux-form-field-label';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import {
  hasErrorSlot,
  getComputedLabelPosition,
  validateFormIds
} from '../../gux-form-field.service';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
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

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasError = hasErrorSlot(this.root);
  }

  componentWillLoad(): void {
    this.setInput();
    this.setLabel();

    this.hasError = hasErrorSlot(this.root);

    trackComponent(this.root, { variant: this.variant });
  }

  disconnectedCallback(): void {
    this.disabledObserver.disconnect();
    this.requiredObserver.disconnect();
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
          <GuxFormFieldError hasError={this.hasError}>
            <slot name="error" />
          </GuxFormFieldError>
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
