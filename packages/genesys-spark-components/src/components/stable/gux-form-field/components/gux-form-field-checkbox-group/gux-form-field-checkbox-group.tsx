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

import {
  setAllCheckboxInputs,
  setMainCheckboxElementCheckedState
} from './gux-form-field-checkbox-group.service';

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
  private disabledObserver: MutationObserver;
  private label: HTMLLabelElement;

  @Element()
  private root: HTMLElement;

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
    this.setDisabledCheckbox();
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
    this.setDisabledCheckbox();
    // this.setupNestedCheckboxes();

    trackComponent(this.root);
  }

  componentDidLoad(): void {
    setMainCheckboxElementCheckedState(
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

  private setDisabledCheckbox(): void {
    const checkboxSlots = this.root.querySelectorAll('gux-form-field-checkbox');
    if (checkboxSlots) {
      checkboxSlots.forEach(item => {
        item.hasGroupDisabled = this.disabled;
      });
    }
  }

  private onMainCheckboxChange(): void {
    const groupCheckbox = this.root.querySelector(
      'gux-form-field-checkbox[slot="group-checkbox"] input'
    );
    // todo fix this
    // eslint-disable-next-line
    setAllCheckboxInputs(this.root, groupCheckbox.checked);
    forceUpdate(this.root);
  }

  private setupNestedCheckboxes(): void {
    const groupCheckbox = this.root.querySelector(
      'gux-form-field-checkbox[slot="group-checkbox"] input'
    );
    if (groupCheckbox) {
      this.root.classList.add('gux-group-checkbox');
    } else {
      this.root.classList.remove('gux-group-checkbox');
    }
    groupCheckbox?.addEventListener('change', () => {
      this.onMainCheckboxChange();
    });
    // TODO if length of group checkbox is more than one throw error
    const checkboxSlots = Array.from(
      this.root.querySelectorAll('gux-form-field-checkbox input')
    );
    if (checkboxSlots?.length) {
      checkboxSlots.forEach(item => {
        item.addEventListener('change', () => {
          this.updateMainCheckbox();
        });
        if (groupCheckbox?.checked) {
          item.checked = true;
        }
      });
    }
  }

  private updateMainCheckbox(): void {
    setMainCheckboxElementCheckedState(
      this.root,
      this.root.querySelector(
        'gux-form-field-checkbox[slot="group-checkbox"] input'
      )
    );
    forceUpdate(this.root);
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
