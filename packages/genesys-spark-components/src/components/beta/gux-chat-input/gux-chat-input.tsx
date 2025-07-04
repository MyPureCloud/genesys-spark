import { Component, Element, h, JSX, State, Host } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

@Component({
  styleUrl: 'gux-chat-input.scss',
  tag: 'gux-chat-input',
  shadow: { delegatesFocus: true }
})
export class GuxChatInput {
  // private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  private inputElement: HTMLInputElement;

  @State()
  isProcessing: boolean = false;

  @State()
  inputText: string;

  // /**
  //  * Specifies the caution messaging that will be displayed below the chat input
  //  */
  // @Prop()
  // cautionMessage: string;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
  }

  // connectedCallback() {
  //   this.slotChanged();
  // }

  submit(): void {
    this.isProcessing = true;
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
          ></input>

          {this.renderCTA()}
        </div>
        <span class="caution-message">
          <slot name="caution-message" />
        </span>
      </Host>
    ) as JSX.Element;
  }
}
