import { getClosestElement } from 'genesys-spark-utils/get-closest-element';
import { GuxRichTextEditorActionTypes } from './gux-rich-text-editor-action/gux-rich-text-editor-action.types';

export function hasDisabledParent(root: HTMLElement): boolean {
  const getParent = getClosestElement(
    root,
    'gux-rich-text-editor-beta'
  ) as HTMLGuxRichTextEditorBetaElement;

  return getParent?.disabled;
}

export function returnActionTypeIcon(
  action: GuxRichTextEditorActionTypes
): string {
  switch (action) {
    case 'bold':
      return 'fa/bold-regular';
    case 'italic':
      return 'fa/italic-regular';
    case 'underline':
      return 'fa/underline-regular';
    case 'strike':
      return 'fa/strikethrough-regular';
    case 'codeblock':
      return 'fa/code-regular';
    case 'blockQuote':
      return 'fa/quote-right-regular';
    case 'orderedList':
      return 'fa/list-ol-regular';
    case 'bulletList':
      return 'fa/list-ul-regular';
    case 'clearFormatting':
      return 'fa/eraser-regular';
    case 'undo':
      return 'custom/undo-regular';
    case 'redo':
      return 'custom/redo-regular';
    case 'delete':
      return 'fa/trash-regular';
    default:
      return 'fa/bold-regular';
  }
}
