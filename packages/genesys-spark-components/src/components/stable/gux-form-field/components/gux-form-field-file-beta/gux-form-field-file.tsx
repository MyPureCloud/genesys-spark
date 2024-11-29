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
  onRequiredChange
} from '@utils/dom/on-attribute-change';

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
  dropAndDrag: boolean = false;

  @State()
  private disabled: boolean = false;

  @State()
  private hasError: boolean = false;

  @State()
  private hasHelp: boolean = false;

  @State()
  private required: boolean = false;

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
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
    if (this.requiredObserver) {
      this.requiredObserver.disconnect();
    }
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

          {this.renderFileList()}

          <GuxFormFieldError show={this.hasError}>
            <slot name="error" />
          </GuxFormFieldError>
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

    validateFormIds(this.root, this.input);
  }

  private removeFile(index: number): void {
    const fileList = this.input.files;
    const dt = new DataTransfer();

    for (let i = 0; i < fileList.length; i++) {
      if (index !== i) {
        dt.items.add(fileList[i]);
      }
    }

    this.input.files = dt.files;
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

    for (let i = 0; i < currentFileList.length; i++) {
      dt.items.add(currentFileList[i]);
    }

    for (let i = 0; i < newFileList.length; i++) {
      const item = newFileList[i];

      if (item.kind === 'file' && item.webkitGetAsEntry().isFile) {
        console.log(item, item.webkitGetAsEntry());
        dt.items.add(item.getAsFile());
      }
    }

    this.input.files = dt.files;
    this.dropContainer.classList.remove('gux-drag-over');
    forceUpdate(this.root);
  }

  private onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.disabled) {
      this.dropContainer.classList.add('gux-drag-over');
    }
  }

  private onDragEnter(event: DragEvent): void {
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

  private renderFileDismissButton(index: number): JSX.Element {
    if (this.disabled) {
      return null;
    }

    return (
      <gux-dismiss-button
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => this.removeFile(index)}
        position="inherit"
      ></gux-dismiss-button>
    ) as JSX.Element;
  }

  private renderFileList(): JSX.Element {
    const fileList = this.input.files || new DataTransfer().files;
    const files = Array.from(fileList);

    if (files.length === 0) {
      return null;
    }

    return (
      <div
        class={{
          'gux-file-list': true,
          'gux-disabled': this.disabled
        }}
      >
        {files.map((file, index) => {
          return (
            <div class="gux-file-list-item">
              <gux-truncate>
                <span class="gux-file-name">{file.name}</span>
              </gux-truncate>

              {this.renderFileDismissButton(index)}
            </div>
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
          'gux-drop-zone': this.dropAndDrag,
          'gux-disabled': this.disabled
        }}
        onDrop={event => this.onDrop(event)}
        onDragOver={event => this.onDragOver(event)}
        onDragEnter={event => this.onDragEnter(event)}
        onDragLeave={event => this.onDragLeave(event)}
      >
        {this.dropAndDrag && (
          <div class="gux-drag-and-drop-text">
            {this.getI18nValue('dragAndDropInstructions')}
          </div>
        )}

        <div class="gux-proxy-button">
          <gux-button-slot>
            <button
              tabIndex={-1}
              type="button"
              disabled={this.disabled}
              onClick={e => this.onProxyFileButtonClick(e)}
            >
              <div>{this.getI18nValue('clickToUpload')}</div>
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
