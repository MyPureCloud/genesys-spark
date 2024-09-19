import { Component, h, Prop } from '@stencil/core';

/**
 * @slot actions - Slot for a group of gux-rich-text-editor-actions
 */

@Component({
  tag: 'gux-rich-text-editor-action-group',
  styleUrl: 'gux-rich-text-editor-action-group.scss',
  shadow: true
})
export class GuxRichTextEditorActionGroup {
  @Prop()
  hideActionDivider: boolean = false;

  private actionGroupDivider(): JSX.Element {
    if (!this.hideActionDivider) {
      return (
        <div class="gux-action-group-divider">
          <div class="gux-divider"></div>
        </div>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <div class="gux-action-group-container">
        <slot name="actions"></slot>
        {this.actionGroupDivider()}
      </div>
    ) as JSX.Element;
  }
}
