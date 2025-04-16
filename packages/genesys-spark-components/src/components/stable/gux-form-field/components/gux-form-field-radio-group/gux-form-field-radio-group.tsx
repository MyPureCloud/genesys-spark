import {
  Component,
  Element,
  h,
  JSX,
  State,
  Prop,
  Watch,
  Listen
} from '@stencil/core';

import { OnMutation } from '@utils/decorator/on-mutation';
import { hasSlot } from '@utils/dom/has-slot';
import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';
import { ILocalizedComponentResources } from '../../../../../i18n/fetchResources';

import {
  GuxFormFieldError,
  GuxFormFieldHelp,
  GuxFormFieldScreenreaderLabel,
  GuxFormFieldFieldsetContainer,
  GuxFormFieldVisualLabel
} from '../../functional-components/functional-components';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';

import { trackComponent } from '@utils/tracking/usage';

import { GuxFormFieldIndicatorMark } from '../../gux-form-field.types';
import componentResources from './i18n/en.json';

/**
 * @slot group-label - Required slot for label tag
 * @slot group-error - Optional slot for error message
 * @slot group-help - Optional slot for help message
 * @slot label-info - Optional slot for tooltip
 */
@Component({
  styleUrl: 'gux-form-field-radio-group.scss',
  tag: 'gux-form-field-radio-group-beta',
  shadow: true
})
export class GuxFormFieldRadioGroupBeta {
  private getI18nValue: GetI18nValue;
  private disabledObserver: MutationObserver;
  private label: HTMLLabelElement;
  private groupLabelInfo: HTMLGuxLabelInfoBetaElement;
  private hideTooltipTimeout: ReturnType<typeof setTimeout>;

  @Element()
  private root: HTMLElement;

  @Prop()
  required: boolean = false;

  /**
   * Field indicator mark which can show *, (optional) or blank
   * Defaults to required. When set to required, the component will display * for required fields and blank for optional
   * When set to optional, the component will display (optional) for optional and blank for required.
   */
  @Prop()
  indicatorMark: GuxFormFieldIndicatorMark = 'required';

  /**
   *  Radio group has error text.
   */
  @State()
  private hasGroupError: boolean = false;

  /**
   *  radio group has help text.
   */
  @State()
  private hasGroupHelp: boolean = false;

  /**
   *  radio group has label info tooltip
   */
  @State()
  private hasGroupLabelInfo: boolean = false;

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
        const radioInput = item.querySelector('input');
        if (hasGroupError) {
          radioInput.setAttribute('aria-invalid', 'true');
        } else {
          radioInput.removeAttribute('aria-invalid');
        }
      });
    }
  }

  @Watch('disabled')
  watchDisabled(): void {
    this.setDisabledRadio();
  }

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.groupLabelInfo = this.root.querySelector('[slot=group-label-info]');
    this.hasGroupError = hasSlot(this.root, 'group-error');
    this.hasGroupHelp = hasSlot(this.root, 'group-help');
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab': {
        if (this.root.matches(':focus-within')) {
          void this.groupLabelInfo?.showTooltip();
          this.hideTooltipTimeout = setTimeout(() => {
            void this.groupLabelInfo?.hideTooltip();
          }, 6000);
        }
        break;
      }
      default: {
        if (this.root.matches(':focus-within')) {
          void this.groupLabelInfo?.hideTooltip();
          clearTimeout(this.hideTooltipTimeout);
        }
        break;
      }
    }
  }

  @Listen('focusout')
  onFocusout(): void {
    void this.groupLabelInfo?.hideTooltip();
    clearTimeout(this.hideTooltipTimeout);
  }

  async componentWillLoad(): Promise<void> {
    this.getI18nValue = await buildI18nForComponent(
      this.root,
      componentResources as ILocalizedComponentResources
    );

    this.groupLabelInfo = this.root.querySelector('[slot=group-label-info]');
    this.hasGroupError = hasSlot(this.root, 'group-error');
    this.hasGroupHelp = hasSlot(this.root, 'group-help');
    this.hasGroupLabelInfo = hasSlot(this.root, 'group-label-info');
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

  private renderText(text: string, condition: boolean = false): string {
    if (condition) {
      return ' ' + text;
    }
  }

  render(): JSX.Element {
    return (
      <GuxFormFieldFieldsetContainer
        labelPosition="above"
        disabled={this.disabled}
      >
        <GuxFormFieldScreenreaderLabel>
          {this.label?.textContent}
          {this.renderText(this.getI18nValue('required'), this.required)}
          {this.renderText(
            getSlotTextContent(this.root, 'group-error'),
            this.hasGroupError
          )}
          {this.renderText(
            getSlotTextContent(this.root, 'group-help'),
            this.hasGroupHelp
          )}
          {this.renderText(
            getSlotTextContent(this.root, 'group-label-info'),
            this.hasGroupLabelInfo
          )}
        </GuxFormFieldScreenreaderLabel>
        <GuxFormFieldVisualLabel position="above" required={this.required}>
          <slot name="group-label" onSlotchange={() => this.setLabel()} />
          <gux-form-field-label-indicator
            variant={this.indicatorMark}
            required={this.required}
          />
          <slot name="group-label-info"></slot>
        </GuxFormFieldVisualLabel>
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
    this.label = this.root.querySelector('label[slot="group-label"]');
  }
}
