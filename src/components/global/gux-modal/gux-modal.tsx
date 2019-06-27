import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-modal.less',
  tag: 'gux-modal'
})
export class GuxModal {
  /**
   * Triggered when any of the the cancel buttons get clicked
   */
  @Event()
  close: EventEmitter;

  /**
   * Indicates the size of the modal (small, medium or large)
   */
  @Prop()
  size: 'small' | 'medium' | 'large';

  /**
   * Indicates the title/header for the modal
   */
  @Prop()
  modalTitle: string = 'Modal Header';

  closeModal() {
    this.close.emit();
  }

  render() {
    return (
      <div class="modal">
        <div class={`modal-container ${this.size}`}>
          <button
            class="cancel-button genesys-icon-close"
            title="Cancel"
            onClick={this.closeModal.bind(this)}
          />
          <h1 class="modal-header large-title">{this.modalTitle}</h1>
          <div class="modal-content">
            <slot name="modal-content" />
          </div>
          <div class="button-footer">
            <gux-button
              title="Cancel"
              text="Cancel"
              accent="secondary"
              onClick={this.closeModal.bind(this)}
            />
            <div class="additional-buttons">
              <slot name="additional-buttons" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
