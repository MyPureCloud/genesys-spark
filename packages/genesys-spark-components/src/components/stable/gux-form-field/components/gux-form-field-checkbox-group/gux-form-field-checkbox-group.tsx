import {
  Component,
  Element,
  forceUpdate,
  h,
  JSX,
  State,
  Prop,
  Watch
} from '@stencil/core';

import { OnMutation } from '@utils/decorator/on-mutation';
import { hasSlot } from '@utils/dom/has-slot';
import { logWarn } from '@utils/error/log-error';
import { ILocalizedComponentResources } from '../../../../../i18n/fetchResources';
import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';

import {
  setAllCheckboxInputs,
  setParentCheckboxElementCheckedState
} from './gux-form-field-checkbox-group.service';

import {
  GuxFormFieldError,
  GuxFormFieldHelp,
  GuxFormFieldScreenreaderLabel,
  GuxFormFieldVisualLabel,
  GuxFormFieldFieldsetContainer
} from '../../functional-components/functional-components';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';

import { GuxFormFieldIndicatorMark } from '../../gux-form-field.types';

import { trackComponent } from '@utils/tracking/usage';
import componentResources from './i18n/en.json';

/**
 * @slot group-label - Required slot for label tag
 * @slot group-checkbox - Optional slot
 * @slot group-error - Optional slot for error message
 * @slot group-help - Optional slot for help message
 */
@Component({
  styleUrl: 'gux-form-field-checkbox-group.scss',
  tag: 'gux-form-field-checkbox-group-beta',
  shadow: true
})
export class GuxFormFieldCheckboxGroupBeta {
  private getI18nValue: GetI18nValue;
  private disabledObserver: MutationObserver;
  private label: HTMLLabelElement;

  @Element()
  private root: HTMLElement;

  /**
   * Field indicator mark which can show *, (optional) or blank
   * Defaults to required. When set to required, the component will display * for required fields and blank for optional
   * When set to optional, the component will display (optional) for optional and blank for required.
   */
  @Prop()
  indicatorMark: GuxFormFieldIndicatorMark = 'required';

  @Prop()
  required: boolean = false;

  /**
   *  Checkbox group has error text.
   */
  @State()
  private hasGroupError: boolean = false;

  /**
   *  Checkbox group has help text.
   */
  @State()
  private hasGroupHelp: boolean = false;

  /**
   *  radio group has label info tooltip
   */
  @State()
  private hasGroupLabelInfo: boolean = false;

  /**
   * Disables the checkboxes in the group.
   */
  @Prop()
  disabled: boolean = false;

  @Watch('hasGroupError')
  watchGroupError(hasGroupError: boolean): void {
    const checkboxSlots = this.root.querySelectorAll('gux-form-field-checkbox');
    if (checkboxSlots) {
      checkboxSlots.forEach(item => {
        item.hasGroupError = hasGroupError;
      });
    }
  }

  @Watch('disabled')
  watchDisabled(): void {
    this.setDisabledCheckboxes();
  }

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasGroupError = hasSlot(this.root, 'group-error');
    this.hasGroupHelp = hasSlot(this.root, 'group-help');
    this.hasGroupLabelInfo = hasSlot(this.root, 'group-label-info');
  }

  async componentWillLoad(): Promise<void> {
    this.getI18nValue = await buildI18nForComponent(
      this.root,
      componentResources as ILocalizedComponentResources
    );

    this.hasGroupError = hasSlot(this.root, 'group-error');
    this.hasGroupHelp = hasSlot(this.root, 'group-help');
    this.hasGroupLabelInfo = hasSlot(this.root, 'group-label-info');

    this.setLabel();
    this.setDisabledCheckboxes();

    trackComponent(this.root);
  }

  componentDidLoad(): void {
    setParentCheckboxElementCheckedState(
      this.root,
      this.root.querySelector(
        'gux-form-field-checkbox[slot="group-checkbox"] input'
      )
    );
  }

  disconnectedCallback(): void {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }

  private getGroupCheckboxElement(): HTMLInputElement {
    return this.root.querySelector(
      'gux-form-field-checkbox[slot="group-checkbox"] input'
    );
  }

  private setDisabledCheckboxes(): void {
    const checkboxSlots = this.root.querySelectorAll('gux-form-field-checkbox');
    if (checkboxSlots) {
      checkboxSlots.forEach(item => {
        item.hasGroupDisabled = this.disabled;
      });
    }
  }

  private onMainCheckboxChange(): void {
    const groupCheckbox: HTMLInputElement = this.getGroupCheckboxElement();
    setAllCheckboxInputs(this.root, groupCheckbox.checked);
    forceUpdate(this.root);
  }

  private setupNestedCheckboxes(): void {
    this.warnMultipleGroupCheckbox();
    this.warnGroupCheckboxNameAttr();

    const groupCheckbox: HTMLInputElement = this.getGroupCheckboxElement();
    if (groupCheckbox) {
      this.root.classList.add('gux-group-checkbox');
    } else {
      this.root.classList.remove('gux-group-checkbox');
    }
    groupCheckbox?.addEventListener('change', () => {
      this.onMainCheckboxChange();
    });
    this.initialSetNestedCheckboxes(groupCheckbox?.checked);
  }

  private initialSetNestedCheckboxes(groupCheckboxChecked): void {
    const checkboxSlots: HTMLInputElement[] = Array.from(
      this.root.querySelectorAll(
        'gux-form-field-checkbox input:not(gux-form-field-checkbox[slot="group-checkbox"] input)'
      )
    );
    if (checkboxSlots?.length) {
      checkboxSlots.forEach(item => {
        item.addEventListener('change', () => {
          this.updateMainCheckbox();
        });
        if (groupCheckboxChecked && !item.disabled) {
          item.checked = true;
        }
      });
    }
  }

  private warnMultipleGroupCheckbox(): void {
    const groupCheckboxList = this.root.querySelectorAll(
      'gux-form-field-checkbox[slot="group-checkbox"] input'
    );
    if (groupCheckboxList?.length > 1) {
      logWarn(this.root, 'Can only have one group checkbox');
    }
  }

  private warnGroupCheckboxNameAttr(): void {
    const groupCheckbox: HTMLInputElement = this.getGroupCheckboxElement();
    if (groupCheckbox?.hasAttribute('name')) {
      logWarn(this.root, 'Group checkbox should not have a name attribute');
    }
  }

  private updateMainCheckbox(): void {
    setParentCheckboxElementCheckedState(
      this.root,
      this.root.querySelector(
        'gux-form-field-checkbox[slot="group-checkbox"] input'
      )
    );
    forceUpdate(this.root);
  }

  private renderText(text: string, condition: boolean = false): string {
    if (condition) {
      return ' ' + text;
    }
  }

  render(): JSX.Element {
    return (
      <GuxFormFieldFieldsetContainer labelPosition="above">
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
        <slot
          onSlotchange={() => this.setupNestedCheckboxes()}
          name="group-checkbox"
        />
        <slot onSlotchange={() => this.updateMainCheckbox()} />
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
