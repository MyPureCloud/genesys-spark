import { Component, Element, h, JSX, State, Prop, Watch } from '@stencil/core';

import { OnMutation } from '@utils/decorator/on-mutation';
import { hasSlot } from '@utils/dom/has-slot';

import {
  GuxFormFieldError,
  GuxFormFieldHelp,
  GuxFormFieldLegendLabel,
  GuxFormFieldFieldsetContainer
} from '../../functional-components/functional-components';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';

import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot groupError - Optional slot for groupError message
 * @slot groupHelp - Optional slot for groupHelp message
 */
@Component({
  styleUrl: 'gux-form-field-radio-group.scss',
  tag: 'gux-form-field-radio-group',
  shadow: true
})
export class GuxFormFieldRadioGroup {
  private disabledObserver: MutationObserver;
  private label: HTMLLabelElement;

  @Element()
  private root: HTMLElement;

  /**
   *  radio group has error text.
   */
  @State()
  private hasGroupError: boolean = false;

  /**
   *  radio group has help text.
   */
  @State()
  private hasGroupHelp: boolean = false;

  /**
   * Disables the radio buttons in the group.
   */
  @Prop()
  disabled: boolean = false;

  @Watch('hasGroupError')
  watchGroupError(hasGroupError: boolean): void {
    const radioSlots = this.root.querySelectorAll('gux-form-field-radio');
    if (radioSlots) {
      radioSlots.forEach(item => {
        item.hasGroupError = hasGroupError;
      });
    }
  }

  @Watch('disabled')
  watchDisabled(): void {
    this.setDisabledRadio();
  }

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasGroupError = hasSlot(this.root, 'groupError');
    this.hasGroupHelp = hasSlot(this.root, 'groupHelp');
  }

  componentWillLoad(): void {
    this.hasGroupError = hasSlot(this.root, 'groupError');
    this.hasGroupHelp = hasSlot(this.root, 'groupHelp');
    this.setLabel();
    this.setDisabledRadio();

    trackComponent(this.root);
  }

  disconnectedCallback(): void {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }

  private setDisabledRadio(): void {
    const radioSlots = this.root.querySelectorAll('gux-form-field-radio');
    if (radioSlots) {
      radioSlots.forEach(item => {
        item.hasGroupDisabled = this.disabled;
      });
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
      <GuxFormFieldFieldsetContainer labelPosition="above">
        <GuxFormFieldLegendLabel
          position="above"
          required={false}
          labelText={this.label?.textContent}
        >
          <slot name="label" onSlotchange={() => this.setLabel()} />

          {this.renderScreenReaderText(
            getSlotTextContent(this.root, 'groupError'),
            this.hasGroupError
          )}
          {this.renderScreenReaderText(
            getSlotTextContent(this.root, 'groupHelp'),
            this.hasGroupHelp
          )}
        </GuxFormFieldLegendLabel>
        <slot />
        <GuxFormFieldError show={this.hasGroupError}>
          <slot name="groupError" />
        </GuxFormFieldError>
        <GuxFormFieldHelp show={!this.hasGroupError && this.hasGroupHelp}>
          <slot name="groupHelp" />
        </GuxFormFieldHelp>
      </GuxFormFieldFieldsetContainer>
    ) as JSX.Element;
  }

  private setLabel(): void {
    this.label = this.root.querySelector('label[slot="label"]');
  }
  // validateFormIds(this.root, this.input);
}
