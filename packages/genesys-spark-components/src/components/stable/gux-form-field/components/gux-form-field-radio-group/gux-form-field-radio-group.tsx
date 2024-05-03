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
 * @slot group-label - Required slot for label tag
 * @slot group-error - Optional slot for group-error message
 * @slot group-help - Optional slot for group-help message
 */
@Component({
  styleUrl: 'gux-form-field-radio-group.scss',
  tag: 'gux-form-field-radio-group-beta',
  shadow: true
})
export class GuxFormFieldRadioGroupBeta {
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
    this.hasGroupError = hasSlot(this.root, 'group-error');
    this.hasGroupHelp = hasSlot(this.root, 'group-help');
  }

  componentWillLoad(): void {
    this.hasGroupError = hasSlot(this.root, 'group-error');
    this.hasGroupHelp = hasSlot(this.root, 'group-help');
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
          <slot name="group-label" onSlotchange={() => this.setLabel()} />

          {this.renderScreenReaderText(
            getSlotTextContent(this.root, 'group-error'),
            this.hasGroupError
          )}
          {this.renderScreenReaderText(
            getSlotTextContent(this.root, 'group-help'),
            this.hasGroupHelp
          )}
        </GuxFormFieldLegendLabel>
        <slot />
        <GuxFormFieldError show={this.hasGroupError}>
          <slot name="group-error" />
        </GuxFormFieldError>
        <GuxFormFieldHelp show={!this.hasGroupError && this.hasGroupHelp}>
          <slot name="group-help" />
        </GuxFormFieldHelp>
      </GuxFormFieldFieldsetContainer>
    ) as JSX.Element;
  }

  private setLabel(): void {
    this.label = this.root.querySelector('label[slot="label"]');
  }
}
