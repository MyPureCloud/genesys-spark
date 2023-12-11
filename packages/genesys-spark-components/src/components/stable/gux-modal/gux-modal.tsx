import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  Method,
  Watch
} from '@stencil/core';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';

import { GuxModalSize } from './gux-modal.types';

@Component({
  styleUrl: 'gux-modal.scss',
  tag: 'gux-modal',
  shadow: { delegatesFocus: true }
})
export class GuxModal {
  private dialogElement: HTMLDialogElement;

  @Element()
  private root: HTMLElement;

  /**
   * Indicates the size of the modal (small, medium or large)
   */
  @Prop()
  size: GuxModalSize = 'dynamic';

  /**
   * Indicates/sets whether or not the modal is open. On a native dialog, you should not toggle the
   * open attribute, due to the unusual behaviors described [here](https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-dialog-open)
   * In this component, it is safe as this property acts as a proxy for calls to `showModal` and `close`.
   */
  @Prop({ mutable: true })
  open: boolean = false;

  /**
   * Fired when a user dismisses the modal
   */
  @Event()
  guxdismiss: EventEmitter<void>;

  /**
   * "Renders" the open state of the modal
   */
  @Watch('open')
  private syncOpenState() {
    if (this.open) {
      this.dialogElement.showModal();
    } else {
      this.dialogElement.close();
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async showModal(): Promise<void> {
    this.open = true;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async close(): Promise<void> {
    this.open = false;
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: `${this.size}` });
  }

  componentDidLoad(): void {
    this.syncOpenState();
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

          {hasModalTitleSlot && this.renderTitle(titleID)}

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
          {hasFooterButtons && this.renderButtonFooter()}
        </div>
      </dialog>
    ) as JSX.Element;
  }

  private renderTitle(titleID: string): JSX.Element {
    return (
      <h1 class="gux-modal-header" id={titleID}>
        <slot name="title" />
      </h1>
    ) as JSX.Element;
  }

  private renderButtonFooter(): JSX.Element {
    return (
      <div class="gux-button-footer">
        <div class="gux-start-align-buttons">
          <slot name="start-align-buttons" />
        </div>

        <div class="gux-end-align-buttons">
          <slot name="end-align-buttons" />
        </div>
      </div>
    ) as JSX.Element;
  }
  private onCloseHandler(): void {
    this.guxdismiss.emit();
  }

  private onDismissHandler(): void {
    this.dialogElement.close();
  }
}
