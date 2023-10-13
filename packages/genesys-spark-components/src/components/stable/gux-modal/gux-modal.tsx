import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  Method
} from '@stencil/core';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';

import { GuxModalSize } from './gux-modal.types';

@Component({
  styleUrl: 'gux-modal.scss',
  tag: 'gux-modal',
  shadow: true
})
export class GuxModal {
  private dialogElement: HTMLDialogElement;

  @Element()
  private root: HTMLElement;

  /**
   * Indicates the size of the modal (small, medium or large)
   */
  // not yet implemented
  @Prop()
  size: GuxModalSize = 'dynamic';

  /**
   * Fired when a user dismisses the modal
   */
  @Event()
  guxdismiss: EventEmitter<void>;

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async showModal(): Promise<void> {
    this.dialogElement.showModal();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async hideModal(): Promise<void> {
    this.dialogElement.close();
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: `${this.size}` });
  }

  private hasModalTitleSlot(): boolean {
    return Boolean(this.root.querySelector('[slot="title"]'));
  }

  private hasFooterButtons(): boolean {
    return (
      Boolean(this.root.querySelector('[slot="start-align-buttons"]')) ||
      Boolean(this.root.querySelector('[slot="end-align-buttons"]'))
    );
  }

  render(): JSX.Element {
    const hasModalTitleSlot = this.hasModalTitleSlot();
    const hasFooterButtons = this.hasFooterButtons();
    const titleID: string = randomHTMLId();

    return (
      <dialog
        onClose={this.onCloseHandler.bind(this)}
        ref={el => (this.dialogElement = el)}
        aria-labelledby={hasModalTitleSlot ? titleID : null}
      >
        <div class={`gux-modal-container gux-${this.size}`}>
          <gux-dismiss-button
            onClick={this.onDismissHandler.bind(this)}
          ></gux-dismiss-button>

          {hasModalTitleSlot && (
            <h1 class="gux-modal-header" id={titleID}>
              <slot name="title" />
            </h1>
          )}

          <div
            class={{
              'gux-modal-content': true,
              'gux-no-buttons': !hasFooterButtons
            }}
          >
            <p>
              <slot name="content" />
            </p>
          </div>
          <div class="gux-button-footer">
            <div class="gux-start-align-buttons">
              <slot name="start-align-buttons" />
            </div>

            <div class="gux-end-align-buttons">
              <slot name="end-align-buttons" />
            </div>
          </div>
        </div>
      </dialog>
    ) as JSX.Element;
  }

  private onCloseHandler(): void {
    this.guxdismiss.emit();
  }

  private onDismissHandler(): void {
    this.dialogElement.close();
  }
}
