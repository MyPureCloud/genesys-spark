import {
  Component,
  State,
  Element,
  JSX,
  Prop,
  h,
  Listen,
  forceUpdate
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';
import { ILocalizedComponentResources } from '../../../../../i18n/fetchResources';

import { OnMutation } from '@utils/decorator/on-mutation';
import { hasSlot } from '@utils/dom/has-slot';
import { trackComponent } from '@utils/tracking/usage';
import {
  GuxFormFieldError,
  GuxFormFieldContainer,
  GuxFormFieldHelp,
  GuxFormFieldLabel
} from '../../functional-components/functional-components';
import { GuxFormFieldIndicatorMark } from '../../gux-form-field.types';
import { getSlottedInput, validateFormIds } from '../../gux-form-field.service';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import {
  onDisabledChange,
  onRequiredChange,
  onMultipleChange
} from '@utils/dom/on-attribute-change';
import simulateNativeEvent from '@utils/dom/simulate-native-event';

import componentResources from './i18n/en.json';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 * @slot label-info - Optional slot for tooltip
 */

@Component({
  styleUrl: 'gux-form-field-file.scss',
  tag: 'gux-form-field-file-beta',
  shadow: true
})
export class GuxFormFieldFileBeta {
  private getI18nValue: GetI18nValue;
  private dropContainer: HTMLDivElement;
  private input: HTMLInputElement;
  private labelInfo: HTMLGuxLabelInfoBetaElement;
  private disabledObserver: MutationObserver;
  private requiredObserver: MutationObserver;
  private multipleObserver: MutationObserver;
  private hideLabelInfoTimeout: ReturnType<typeof setTimeout>;

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
  dragAndDrop: boolean = false;

  @State()
  private disabled: boolean = false;

  @State()
  private hasError: boolean = false;

  @State()
  private hasHelp: boolean = false;

  @State()
  private required: boolean = false;

  @State()
  private multiple: boolean = false;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.labelInfo = this.root.querySelector('[slot=label-info]');
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab': {
        if (this.input.matches(':focus-visible')) {
          void this.labelInfo?.showTooltip();
          this.hideLabelInfoTimeout = setTimeout(() => {
            void this.labelInfo?.hideTooltip();
          }, 6000);
        }
        break;
      }
      case 'Shift': {
        break;
      }
      default: {
        if (this.input.matches(':focus-visible')) {
          void this.labelInfo?.hideTooltip();
          clearTimeout(this.hideLabelInfoTimeout);
        }
        break;
      }
    }
  }

  @Listen('focusout')
  onFocusout(): void {
    void this.labelInfo?.hideTooltip();
    clearTimeout(this.hideLabelInfoTimeout);
  }

  @Listen('guxremovefile')
  onGuxRemoveFile(event: CustomEvent): void {
    this.removeFile(event.detail);
  }

  async componentWillLoad(): Promise<void> {
    this.getI18nValue = await buildI18nForComponent(
      this.root,
      componentResources as ILocalizedComponentResources
    );

    this.setInput();

    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
    this.labelInfo = this.root.querySelector('[slot=label-info]');

    trackComponent(this.root);
  }

  disconnectedCallback(): void {
    this.disabledObserver?.disconnect();
    this.requiredObserver?.disconnect();
    this.multipleObserver?.disconnect();
  }

  render(): JSX.Element {
    return (
      <GuxFormFieldContainer labelPosition="above">
        <GuxFormFieldLabel position="above" required={this.required}>
          <slot name="label" />
          <gux-form-field-label-indicator
            variant={this.indicatorMark}
            required={this.required}
          />
          <slot name="label-info" />
        </GuxFormFieldLabel>
        <div class="gux-input-and-error-container">
          <GuxFormFieldHelp show={this.hasHelp}>
            <slot name="help" />
          </GuxFormFieldHelp>

          {this.renderInputSlot()}

          <GuxFormFieldError show={this.hasError}>
            <slot name="error" />
          </GuxFormFieldError>

          {this.renderFileList()}
        </div>
      </GuxFormFieldContainer>
    ) as JSX.Element;
  }

  private setInput(): void {
    this.input = getSlottedInput(this.root, 'input[type="file"][slot="input"]');

    this.input.addEventListener('input', () => {
      forceUpdate(this.root);
    });

    preventBrowserValidationStyling(this.input);
    this.disabled = this.input.disabled;
    this.required = this.input.required;
    this.multiple = this.input.multiple;

    this.disabledObserver = onDisabledChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );
    this.requiredObserver = onRequiredChange(
      this.input,
      (required: boolean) => {
        this.required = required;
      }
    );
    this.multipleObserver = onMultipleChange(
      this.input,
      (multiple: boolean) => {
        this.multiple = multiple;
      }
    );

    validateFormIds(this.root, this.input);
  }

  private getDropZoneText(): string {
    if (this.multiple) {
      return this.getI18nValue('dragAndDropFilesInstructions');
    } else {
      return this.getI18nValue('dragAndDropFileInstructions');
    }
  }

  private getProxyButtonText(): string {
    if (this.dragAndDrop) {
      return this.getI18nValue('clickToUpload');
    } else if (this.multiple) {
      if (this.input?.files?.length > 0) {
        return this.getI18nValue('changeFiles');
      }

      return this.getI18nValue('uploadFiles');
    } else {
      if (this.input?.files?.length > 0) {
        return this.getI18nValue('changeFile');
      }
      return this.getI18nValue('uploadFile');
    }
  }

  private removeFile(index: number): void {
    const fileList = this.input.files;
    const dt = new DataTransfer();

    for (let i = 0; i < fileList.length; i++) {
      if (index !== i) {
        dt.items.add(fileList[i]);
      }
    }

    this.modifyInputFiles(dt.files);
  }

  private modifyInputFiles(files: FileList): void {
    this.input.files = files;
    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
    forceUpdate(this.root);
  }

  private onProxyFileButtonClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.input.focus();
    this.input.click();
  }

  private onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled) {
      return;
    }

    const currentFileList = this.input.files;
    const newFileList = event.dataTransfer.items;

    const dt = new DataTransfer();

    if (this.multiple) {
      for (let i = 0; i < currentFileList.length; i++) {
        dt.items.add(currentFileList[i]);
      }
    }

    for (let i = 0; i < newFileList.length; i++) {
      const item = newFileList[i];

      if (item.kind === 'file' && item.webkitGetAsEntry().isFile) {
        dt.items.add(item.getAsFile());

        if (!this.multiple) {
          break;
        }
      }
    }

    this.dropContainer.classList.remove('gux-drag-over');

    this.modifyInputFiles(dt.files);
  }

  private onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.disabled) {
      this.dropContainer.classList.add('gux-drag-over');
    }
  }

  private onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.dropContainer.classList.remove('gux-drag-over');
  }

  private renderFileList(): JSX.Element {
    const files = Array.from(this.input.files || new DataTransfer().files);

    if (files.length === 0) {
      return null;
    }

    return (
      <div class="gux-file-list">
        {files.map((file, index) => {
          return (
            <slot name={`file-${index}`}>
              <gux-file-list-item
                name={file.name}
                index={index}
                disabled={this.disabled}
              ></gux-file-list-item>
            </slot>
          ) as JSX.Element;
        })}
      </div>
    ) as JSX.Element;
  }

  private renderInputSlot(): JSX.Element {
    return (
      <div
        ref={el => (this.dropContainer = el)}
        class={{
          'gux-drop-container': true,
          'gux-drop-zone': this.dragAndDrop,
          'gux-disabled': this.disabled
        }}
        aria-disabled={this.disabled ? 'true' : 'false'}
        onDrop={event => this.onDrop(event)}
        onDragOver={event => this.onDragOver(event)}
        onDragEnter={event => this.onDragOver(event)}
        onDragLeave={event => this.onDragLeave(event)}
      >
        {this.dragAndDrop && (
          <div class="gux-drag-and-drop-text">{this.getDropZoneText()}</div>
        )}

        <div class="gux-proxy-button">
          <gux-button-slot accent="tertiary">
            <button
              tabIndex={-1}
              type="button"
              disabled={this.disabled}
              onClick={e => this.onProxyFileButtonClick(e)}
            >
              <div>{this.getProxyButtonText()}</div>
            </button>
          </gux-button-slot>

          <div class="gux-offscreen">
            <slot name="input" onSlotchange={() => this.setInput()} />
          </div>
        </div>
      </div>
    ) as JSX.Element;
  }
}
