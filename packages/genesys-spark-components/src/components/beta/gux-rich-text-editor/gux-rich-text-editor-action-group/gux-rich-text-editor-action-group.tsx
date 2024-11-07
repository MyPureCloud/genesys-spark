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

  private shouldHideDivider(): boolean {
    return this.hideActionDivider || this.isGlobalActionsSlot();
  }

  private isGlobalActionsSlot(): boolean {
    return this.root.getAttribute('slot') === 'global-actions';
  }

  private renderActionGroupDivider(): JSX.Element {
    if (!this.shouldHideDivider()) {
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
