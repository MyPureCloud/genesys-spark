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
   * Indicates if the modal is initially shown
   */
  @Prop()
  isOpen: boolean = false;

  /**
   * Indicates the size of the modal (small, medium or large)
   */
  // not yet implemented
  @Prop()
  size: GuxModalSize = 'dynamic';

  /**
   * Query selector for the element to initially focus when the modal opens
   * Defaults to the first tabbable element
   */
  // not yet implemented
  @Prop()
  initialFocus?: string | undefined;

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
    // this.guxdismiss.emit();
    this.dialogElement.close();
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: `${this.size}` });
  }

  componentDidLoad(): void {
    if (this.isOpen) {
      this.dialogElement.showModal();
    }
  }

  render(): JSX.Element {
    return (
      <dialog
        onClose={this.onCloseHandler.bind(this)}
        ref={el => (this.dialogElement = el)}
      >
        <div class={`gux-modal-container gux-${this.size}`}>
          <gux-dismiss-button
            onClick={this.onDismissHandler.bind(this)}
          ></gux-dismiss-button>
          <h1 class="gux-modal-header">
            <slot name="title" />
          </h1>
          <slot name="content" />
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
