import { Component, h, JSX, Element, Prop } from '@stencil/core';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * @slot typographical-emphasis - Slot for typographical actions
 * @slot text-styling - Slot for text-styling actions
 * @slot lists-indentation - Slot for lists and indentation actions
 * @slot inserting - Slot for inserting actions
 * @slot global-actions - Slot for global actions
 * @slot editor - Slot for the editor
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

  private renderSlot(
    slotName: string,
    containerClass: string
  ): JSX.Element | null {
    if (hasSlot(this.root, slotName)) {
      return (
        <div class={containerClass}>
          <slot name={slotName}></slot>
        </div>
      ) as JSX.Element;
    }
    return null;
  }

  private renderTypographicalEmphasis(): JSX.Element | null {
    return this.renderSlot(
      'typographical-emphasis',
      'gux-typographical-emphasis-container'
    );
  }

  private renderTextStyling(): JSX.Element | null {
    return this.renderSlot('text-styling', 'gux-text-styling-container');
  }

  private renderListsIndentation(): JSX.Element | null {
    return this.renderSlot(
      'lists-indentation',
      'gux-lists-indentation-container'
    );
  }

  private renderInserting(): JSX.Element | null {
    return this.renderSlot('inserting', 'gux-inserting-container');
  }

  private renderGlobalActions(): JSX.Element | null {
    return this.renderSlot('global-actions', 'gux-global-actions-container');
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
          {this.renderTypographicalEmphasis()}
          {this.renderTextStyling()}
          {this.renderListsIndentation()}
          {this.renderInserting()}
          {this.renderGlobalActions()}
        </div>
        <slot name="editor"></slot>
      </div>
    ) as JSX.Element;
  }
}
