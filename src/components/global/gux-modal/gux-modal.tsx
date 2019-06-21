import { Component, h, Method, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-modal.less',
  tag: 'gux-modal'
})
export class GuxModal {
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

  /**
   * Indicates if modal is currently displayed
   */
  @Prop({ mutable: true })
  active: boolean = false;

  @Method()
  async closeModal() {
    this.active = false;
  }

  render() {
    const activeClass = this.active ? 'active' : 'hidden';
    return (
      <div class={`modal ${activeClass}`}>
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
