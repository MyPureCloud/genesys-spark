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

/**
 * Extracts an attribute from a action and adds it to the actions array.
 */
function addAction(actions: string[], element: Element, attribute: string) {
  const value = (element as HTMLElement).getAttribute(attribute);
  if (value) {
    actions.push(value);
  }
}

/**
 * This function is used for lists eg rich-style and highlight.
 * Extracts a list of values from child elements and adds them to the actions array with a prefix. eg(rich-style and highlight).
 */
function addListActions(
  actions: string[],
  parent: Element,
  selector: string,
  prefix: string,
  attribute: string = ''
) {
  Array.from(parent.querySelectorAll(selector)).forEach(item => {
    const value = attribute
      ? (item as HTMLElement).getAttribute(attribute)
      : (item as HTMLElement).innerHTML;
    if (value) {
      actions.push(`${prefix}-${value}`);
    }
  });
}

export function getActionsFromGroup(
  root: HTMLElement,
  selector: string,
  hiddenClass: string
): string[] {
  const actionGroup = root.querySelector(selector);
  if (!actionGroup || !actionGroup.classList.contains(hiddenClass)) {
    return [];
  }

  return Array.from(actionGroup.children).reduce<string[]>((actions, child) => {
    const tagName = child.tagName;

    if (tagName === 'GUX-RICH-TEXT-EDITOR-ACTION') {
      addAction(actions, child, 'action');
    } else if (tagName === 'GUX-RICH-TEXT-EDITOR-ACTION-RICH-STYLE') {
      addListActions(actions, child, 'gux-rich-style-list-item', 'rich-style');
    } else if (tagName === 'GUX-RICH-TEXT-EDITOR-ACTION-TEXT-HIGHLIGHT') {
      addListActions(
        actions,
        child,
        'gux-rich-highlight-list-item',
        'highlight',
        'highlight'
      );
    }
    return actions;
  }, []);
}
