import { Component, h, JSX, Element, Prop } from '@stencil/core';

/**
 * @slot typographical-emphasis - Slot for typographical actions
 * @slot text-styling - Slot for text-styling actions
 * @slot lists-indentation - Slot for lists and indentation actions
 * @slot inserting - Slot for inserting actions
 * @slot global-actions - Slot for global actions
 * @slot content - Optional slot for content
 */

@Component({
  tag: 'gux-rich-text-editor-beta',
  styleUrl: 'gux-rich-text-editor.scss',
  shadow: true
})
export class GuxRichTextEditor {
  @Element()
  root: HTMLElement;

  @Prop()
  disabled: boolean = false;

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-rich-text-editor-container': true,
          'gux-disabled': this.disabled
        }}
      >
        <div class="gux-rich-text-editor-toolbar-container">
          <div class="gux-typographical-emphasis-container">
            <slot name="typographical-emphasis"></slot>
          </div>
          <div class="gux-text-styling-container">
            <slot name="text-styling"></slot>
          </div>
          <div class="gux-lists-indentation-container">
            <slot name="lists-indentation"></slot>
          </div>
          <div class="gux-inserting-container">
            <slot name="inserting"></slot>
          </div>
          <div class="gux-global-actions-container">
            <slot name="global-actions"></slot>
          </div>
        </div>
        <slot name="editor"></slot>
        <slot name="content"></slot>
      </div>
    ) as JSX.Element;
  }
}
