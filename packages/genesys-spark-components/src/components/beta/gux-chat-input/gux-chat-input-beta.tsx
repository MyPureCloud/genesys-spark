import {
  Component,
  Element,
  h,
  JSX,
  State,
  Host,
  Event,
  EventEmitter,
  Method,
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
  styleUrl: 'gux-chat-input-beta.scss',
  tag: 'gux-chat-input-beta',
  shadow: { delegatesFocus: true }
})
export class GuxChatInput {
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
   * Triggers when the CTA button is clicked to initiate Copilot text generating.
   */
  @Event()
  onchatinputsubmit: EventEmitter;

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

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxReset(): Promise<void> {
    this.inputElement.value = null;
    this.isGenerating = false;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  submit(): void {
    this.isGenerating = true;
    this.onchatinputsubmit.emit({ inputText: this.inputElement.value });
  }

  keyUp(): void {
    this.hasInputText = this.inputElement.value ? true : false;
  }

  renderCTA(): JSX.Element {
    if (this.isGenerating) {
      return (
        <gux-button-slot accent="danger">
          <button
            type="button"
            class="gux-cta-generating"
            onClick={() => this.submit()}
          >
            <gux-icon icon-name="fa/square-regular"></gux-icon>
          </button>
        </gux-button-slot>
      );
    }

    return (
      <gux-button-slot accent="primary">
        <button
          type="button"
          class={this.hasInputText ? 'gux-cta-active' : 'gux-cta'}
          onClick={() => this.submit()}
          disabled={!this.hasInputText}
        >
          <gux-icon
            icon-name="fa/arrow-up-from-line-regular"
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
