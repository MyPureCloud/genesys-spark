import { Component, h, JSX, Element, Prop } from '@stencil/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

/**
 * @slot typographical-emphasis - Slot for typographical actions
 * @slot text-styling - Slot for text-styling actions
 * @slot lists-indentation - Slot for lists and indentation actions
 * @slot inserting - Slot for inserting actions
 * @slot table-actions - Slot for table actions
 * @slot delete - Slot for delete draft action
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

  private editor: Editor;

  componentDidLoad() {
    this.setupEditor();
    if (this.editor) {
      this.setupActions();
    }
  }

  private setupActions(): void {
    const actions = this.root?.querySelectorAll('gux-rich-text-editor-action');
    actions.forEach(action => {
      action.setEditor(this.editor);
    });
  }

  private setupEditor(): void {
    this.editor = new Editor({
      element: this.root.shadowRoot.querySelector('.gux-rich-text-editor'),
      extensions: [StarterKit, Underline],
      content: 'Start typing here...',
      injectCSS: false,
      editable: !this.disabled
    });
  }
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
          <div class="gux-table-actions-container">
            <slot name="table-actions"></slot>
          </div>
          <div class="gux-delete-container">
            <slot name="delete"></slot>
          </div>
        </div>
        <div class="gux-rich-text-editor"></div>
        <slot name="content"></slot>
      </div>
    ) as JSX.Element;
  }
}
