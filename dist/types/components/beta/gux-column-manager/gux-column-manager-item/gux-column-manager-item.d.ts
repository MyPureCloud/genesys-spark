import { JSX } from '../../../../stencil-public-runtime';
/**
 * @slot - slot for gux-form-field-checkbox
 */
export declare class GuxColumnManagerItem {
  private reorderButtonElement;
  private i18n;
  root: HTMLElement;
  orderId: string;
  highlightActive: boolean;
  highlight: string;
  text: string;
  pendingReorder: 'none' | 'above' | 'below';
  isDragging: boolean;
  isReordering: boolean;
  private internal_order_change;
  private internal_keyboard_reorder_start;
  private internal_keyboard_reorder_move;
  private internal_keyboard_reorder_emit;
  private internal_keyboard_reorder_finish;
  guxSetHighlight(highlight?: string, highlightActive?: boolean): Promise<void>;
  guxFocus(): Promise<void>;
  onBlur(): void;
  onDragStart(event: DragEvent): void;
  onDragEnter(event: DragEvent): void;
  onDragOver(event: DragEvent): void;
  onDragLeave(): void;
  onDragEnd(): void;
  onDrop(event: DragEvent): boolean;
  private mouseOnTopHalf;
  private onSlotChange;
  private setReorderMode;
  private toggleReorderMode;
  private keyboardReorder;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}
