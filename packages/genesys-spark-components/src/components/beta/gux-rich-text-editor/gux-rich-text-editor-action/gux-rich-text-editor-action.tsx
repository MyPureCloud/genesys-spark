import {
  Component,
  Element,
  Method,
  Prop,
  h,
  State,
  forceUpdate,
  Watch
} from '@stencil/core';
import { GuxRichTextEditorActionTypes } from './gux-rich-text-editor-action.types';
import { trackComponent } from '@utils/tracking/usage';
import { Editor } from '@tiptap/core';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import translationResources from './i18n/en.json';

@Component({
  tag: 'gux-rich-text-editor-action',
  styleUrl: 'gux-rich-text-editor-action.scss',
  shadow: true
})
export class GuxRichTextEditorAction {
  private i18n: GetI18nValue;

  private actionMap = {
    bold: {
      action: () => this.editor.chain().focus().toggleBold().run(),
      icon: 'fa/bold-regular'
    },
    italic: {
      action: () => this.editor.chain().focus().toggleItalic().run(),
      icon: 'fa/italic-regular'
    }
  };

  @Element()
  root: HTMLElement;

  @Prop()
  action: GuxRichTextEditorActionTypes;

  @State()
  private editor: Editor; // Store the editor instance

  @Watch('editor')
  onEditorInstance() {
    this.applyTipTapEventListeners();
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.action });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  // Set the editor instance to the gux-rich-text-editor-action.
  @Method()
  async setEditor(editor: Editor) {
    this.editor = editor; // Assign the editor instance
  }

  private handleActionClick(): void {
    const actionHandler = this.actionMap[this.action].action;
    if (actionHandler) {
      actionHandler();
    } else {
      console.warn('Unsupported action', this.action);
    }
  }

  private returnActionTypeIcon(action: GuxRichTextEditorActionTypes): string {
    return this.actionMap[action]?.icon || 'fa/bold-regular';
  }

  private renderTooltip(): JSX.Element {
    return (
      <gux-tooltip>
        <div slot="content">{this.i18n(this.action)}</div>
      </gux-tooltip>
    ) as JSX.Element;
  }

  private applyTipTapEventListeners(): void {
    // This is needed to notify stencil that the state of the text-editor has changed.
    this.editor.on('selectionUpdate', () => {
      // The selection has changed.
      forceUpdate(this.root);
    });

    this.editor.on('transaction', () => {
      // The editor state has changed.
      forceUpdate(this.root);
    });
  }

  private renderActionButton(): JSX.Element {
    if (this.editor) {
      return (
        <gux-button-slot accent="ghost" icon-only>
          <button
            class={this.editor.isActive(this.action) ? 'gux-is-active' : ''}
            type="button"
            onClick={() => this.handleActionClick()}
          >
            <gux-icon
              icon-name={this.returnActionTypeIcon(this.action)}
              decorative
            ></gux-icon>
          </button>
          {this.renderTooltip()}
        </gux-button-slot>
      );
    }
  }

  render(): JSX.Element {
    return this.renderActionButton();
  }
}
