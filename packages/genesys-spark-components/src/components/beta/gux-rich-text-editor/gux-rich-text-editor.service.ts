import { getClosestElement } from 'genesys-spark-utils/get-closest-element';

export function calculateDisabledState(root: HTMLElement): boolean {
  const getParent = getClosestElement(
    root,
    'gux-rich-text-editor-beta'
  ) as HTMLGuxRichTextEditorBetaElement;
  return getParent?.disabled || this.disabled;
}
