import { Component, State, Element, JSX, Prop, h } from '@stencil/core';
import { OnMutation } from '@utils/decorator/on-mutation';
import { hasSlot } from '@utils/dom/has-slot';
import { trackComponent } from '@utils/tracking/usage';
import {
  GuxFormFieldError,
  GuxFormFieldContainer,
  GuxFormFieldHelp,
  GuxFormFieldLabel
} from '../../functional-components/functional-components';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import {
  getComputedLabelPosition,
  getSlottedInput,
  validateFormIds
} from '../../gux-form-field.service';
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
  private fileInputElement: HTMLInputElement;
  private label: HTMLLabelElement;
  private requiredObserver: MutationObserver;

  @Element()
  private root: HTMLElement;

  @Prop()
  labelPosition: GuxFormFieldLabelPosition;

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

  componentWillLoad(): void {
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
      <GuxFormFieldContainer labelPosition={this.computedLabelPosition}>
        <GuxFormFieldLabel
          position={this.computedLabelPosition}
          required={this.required}
        >
          <slot name="label" onSlotchange={() => this.setLabel()} />
        </GuxFormFieldLabel>
        <slot name="input" onSlotchange={() => this.setInput()} />
        <GuxFormFieldError show={this.hasError}>
          <slot name="error" />
        </GuxFormFieldError>
        <GuxFormFieldHelp show={!this.hasError && this.hasHelp}>
          <slot name="help" />
        </GuxFormFieldHelp>
      </GuxFormFieldContainer>
    ) as JSX.Element;
  }
}
