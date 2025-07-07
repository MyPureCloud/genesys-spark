import {
  Component,
  Element,
  h,
  JSX,
  State,
  Host,
  Event,
  EventEmitter,
  Method
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';

/**
 * @slot caution-message - slot for caution message text
 */
@Component({
  styleUrl: 'gux-chat-input.scss',
  tag: 'gux-chat-input',
  shadow: { delegatesFocus: true }
})
export class GuxChatInput {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  private inputElement: HTMLInputElement;

  @State()
  isProcessing: boolean = false;

  @State()
  inputText: string;

  /**
   * Triggers when the CTA button is clicked to initiate Copilot text processing.
   */
  @Event()
  onchatinputsubmit: EventEmitter;

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxReset(): Promise<void> {
    this.inputText = null;
    this.isProcessing = false;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  submit(): void {
    this.isProcessing = true;
    this.onchatinputsubmit.emit({ inputText: this.inputText });
  }

  onInputChange(inputElement: HTMLInputElement): void {
    this.inputText = inputElement.value;
  }

  hasInputText(): boolean {
    return this.inputText?.length > 0;
  }

  keyUp(): void {
    this.inputText = this.inputElement.value;
  }

  renderCTA(): JSX.Element {
    if (this.isProcessing) {
      return (
        <gux-button-slot accent="danger">
          <button
            type="button"
            class="gux-cta-processing"
            onClick={() => this.submit()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
            >
              <path
                d="M0 2.5C0 1.39688 0.896875 0.5 2 0.5H12C13.1031 0.5 14 1.39688 14 2.5V12.5C14 13.6031 13.1031 14.5 12 14.5H2C0.896875 14.5 0 13.6031 0 12.5V2.5Z"
                fill="white"
              />
            </svg>
          </button>
        </gux-button-slot>
      );
    }

    return (
      <gux-button-slot accent="primary">
        <button
          type="button"
          class={this.hasInputText() ? 'gux-cta-active' : 'gux-cta-disabled'}
          onClick={() => this.submit()}
          disabled={!this.hasInputText()}
        >
          <gux-icon
            icon-name="fa/arrow-up-from-line-regular"
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
            value={this.inputText}
            ref={el => (this.inputElement = el)}
            onKeyUp={this.keyUp.bind(this)}
            placeholder={this.i18n('inputPlaceholder')}
          ></input>

          {this.renderCTA()}
        </div>
        <div class="caution-message">
          <slot name="caution-message" />
        </div>
      </Host>
    ) as JSX.Element;
  }
}
