import { Component, h, Prop, Element } from '@stencil/core';

/**
 * @slot actions - Slot for a group of gux-rich-text-editor-actions
 */

@Component({
  tag: 'gux-rich-text-editor-action-group',
  styleUrl: 'gux-rich-text-editor-action-group.scss',
  shadow: true
})
export class GuxRichTextEditorActionGroup {
  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  hideActionDivider: boolean = false;

  private shouldHideDivider(): boolean {
    return this.hideActionDivider || this.isGlobalActionsSlot();
  }

  private isGlobalActionsSlot(): boolean {
    return this.root.getAttribute('slot') === 'global-actions';
  }

  private renderActionGroupDivider(): JSX.Element {
    if (!this.shouldHideDivider()) {
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
        {this.renderActionGroupDivider()}
      </div>
    ) as JSX.Element;
  }
}
