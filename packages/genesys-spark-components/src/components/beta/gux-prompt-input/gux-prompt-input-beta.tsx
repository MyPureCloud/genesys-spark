import {
  Component,
  Element,
  h,
  JSX,
  State,
  Host,
  Event,
  EventEmitter,
  Prop,
  Listen
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';

/**
 * @slot caution-message - slot for caution message text
 */
@Component({
  styleUrl: 'gux-prompt-input-beta.scss',
  tag: 'gux-prompt-input-beta',
  shadow: { delegatesFocus: true }
})
export class GuxPromptInputBeta {
  @Element()
  private root: HTMLElement;

  @Prop()
  placeholder: string;

  @State()
  isGenerating: boolean = false;

  @State()
  hasInputText: boolean = false;

  private inputElement: HTMLInputElement;
  private i18n: GetI18nValue;

  /**
   * Triggers when the generate button is clicked to either initiate or stop Copilot text generation.
   */
  @Event()
  onpromptinputgenerate: EventEmitter<{
    inputText: string;
    isGenerating: boolean;
  }>;

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    if (!this.inputElement.value) {
      return;
    }

    switch (event.key) {
      case 'Enter':
        this.submit();
        break;
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  private submit(): void {
    this.onpromptinputgenerate.emit({
      inputText: this.inputElement.value,
      isGenerating: true
    });
    this.isGenerating = true;
  }

  private stopGeneration(): void {
    this.onpromptinputgenerate.emit({
      inputText: this.inputElement.value,
      isGenerating: false
    });
    this.isGenerating = false;
  }

  private keyUp(): void {
    this.hasInputText = this.inputElement.value?.length > 0;
  }

  private renderSubmitButton(): JSX.Element {
    return (
      <gux-button-slot accent="primary">
        <button
          type="button"
          class={`gux-generate${this.hasInputText ? '-active' : ''}`}
          onClick={() => this.submit()}
          disabled={!this.hasInputText}
          title={this.i18n('generateGenesysAIText')}
          data-testid="generate-button"
        >
          <gux-icon
            icon-name="fa/arrow-up-regular"
            size="small"
            decorative
          ></gux-icon>
        </button>
      </gux-button-slot>
    );
  }

  private renderStopButton(): JSX.Element {
    return (
      <gux-button-slot accent="danger">
        <button
          type="button"
          class="gux-generate-cancel"
          onClick={() => this.stopGeneration()}
          data-testid="stop-generation"
        >
          <gux-icon
            icon-name="fa/square-regular"
            size="small"
            decorative
          ></gux-icon>
        </button>
      </gux-button-slot>
    );
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class="gux-input-container">
          <input
            class="gux-input"
            ref={el => (this.inputElement = el)}
            placeholder={this.placeholder || this.i18n('inputPlaceholder')}
            onKeyUp={this.keyUp.bind(this)}
            data-testid="prompt-input"
          ></input>

          {this.isGenerating
            ? this.renderStopButton()
            : this.renderSubmitButton()}
        </div>
        <div class="caution-message">
          <slot name="caution-message" />
        </div>
      </Host>
    ) as JSX.Element;
  }
}
