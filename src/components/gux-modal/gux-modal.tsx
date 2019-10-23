import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop
} from '@stencil/core';

import { ButtonAccents } from '../../common-enums';
import { buildI18nForComponent } from '../i18n';

import modalComponentResources from './gux-modal.i18n.json';

@Component({
  styleUrl: 'gux-modal.less',
  tag: 'gux-modal'
})
export class GuxModal {
  i18n: (resourceKey: string, context?: any) => string;

  @Element() element: HTMLElement;

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

  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(
      this.element,
      modalComponentResources
    );
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
              title={this.i18n('cancel')}
              accent={ButtonAccents.Secondary}
              onClick={this.closeModal.bind(this)}
            >
              <span>{this.i18n('cancel')}</span>
            </gux-button>
            <div class="additional-buttons">
              <slot name="additional-buttons" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
