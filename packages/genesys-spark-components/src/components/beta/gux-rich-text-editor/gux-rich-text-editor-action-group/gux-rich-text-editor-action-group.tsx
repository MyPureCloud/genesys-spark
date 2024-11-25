import { Component, h, Prop, Element, Host } from '@stencil/core';

/**
 * @slot actions - Slot for gux-rich-text-editor-actions
 */

@Component({
  tag: 'gux-rich-text-editor-action-group',
  styleUrl: 'gux-rich-text-editor-action-group.scss',
  shadow: true
})
export class GuxRichTextEditorActionGroup {
  @Element()
  root: HTMLElement;

  @Prop()
  hideActionDivider: boolean = false;

  private renderActionGroupDivider(): JSX.Element {
    if (!this.hideActionDivider) {
      return (<div class="gux-divider"></div>) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class="gux-action-group-container">
          <slot></slot>
        </div>
        {this.renderActionGroupDivider()}
      </Host>
    ) as JSX.Element;
  }
}
