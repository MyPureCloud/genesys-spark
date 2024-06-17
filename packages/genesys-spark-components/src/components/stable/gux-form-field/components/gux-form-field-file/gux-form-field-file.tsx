import { Component, State, Element, JSX, Prop, h } from '@stencil/core';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import { ILocalizedComponentResources } from '../../../../../i18n/fetchResources';
import { OnMutation } from '@utils/decorator/on-mutation';
import { hasSlot } from '@utils/dom/has-slot';
import { trackComponent } from '@utils/tracking/usage';
import {
  GuxFormFieldError,
  GuxFormFieldFieldsetContainer,
  GuxFormFieldHelp,
  GuxFormFieldLegendLabel
} from '../../functional-components/functional-components';
import {
  GuxFormFieldLabelPosition,
  GuxFormFieldIndicatorMark
} from '../../gux-form-field.types';
import {
  getComputedLabelPosition,
  getSlottedInput,
  validateFormIds
} from '../../gux-form-field.service';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';
import componentResources from './i18n/en.json';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import { onRequiredChange } from '@utils/dom/on-attribute-change';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */

@Component({
  styleUrl: 'gux-form-field-file.scss',
  tag: 'gux-form-field-file',
  shadow: true
})
export class GuxFormFieldFile {
  private getI18nValue: GetI18nValue;
  private fileInputElement: HTMLInputElement;
  private label: HTMLLabelElement;
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
  private hasError: boolean = false;

  @State()
  private hasHelp: boolean = false;

  @State()
  private required: boolean = false;

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
    if (this.requiredObserver) {
      this.requiredObserver.disconnect();
    }
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

  private setLabel(): void {
    this.label = this.root.querySelector('label[slot="label"]');

    this.computedLabelPosition = getComputedLabelPosition(
      this.label,
      this.labelPosition
    );
  }

  private setInput(): void {
    this.fileInputElement = getSlottedInput(
      this.root,
      'input[type="file"][slot="input"]'
    );

    preventBrowserValidationStyling(this.fileInputElement);
    this.required = this.fileInputElement.required;

    this.requiredObserver = onRequiredChange(
      this.fileInputElement,
      (required: boolean) => {
        this.required = required;
      }
    );

    validateFormIds(this.root, this.fileInputElement);
  }

  private get variant(): string {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';

    const type = 'fileInput';

    return `${type}-${labelPositionVariant}`;
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
          {this.renderScreenReaderText(
            getSlotTextContent(this.root, 'help'),
            this.hasHelp
          )}
        </GuxFormFieldLegendLabel>
        <slot name="input" onSlotchange={() => this.setInput()} />
        <GuxFormFieldError show={this.hasError}>
          <slot name="error" />
        </GuxFormFieldError>
        <GuxFormFieldHelp show={!this.hasError && this.hasHelp}>
          <slot name="help" />
        </GuxFormFieldHelp>
      </GuxFormFieldFieldsetContainer>
    ) as JSX.Element;
  }
}
