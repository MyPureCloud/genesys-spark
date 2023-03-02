import { InternalOrderChange, InternalHighlightResults, GuxOrder } from './gux-column-manager.types';
export declare function getNewOrder(root: HTMLElement, { oldIndex, newIndex }: InternalOrderChange): GuxOrder;
export declare function setKeyboardReorderPositionIndicator(root: HTMLElement, { oldIndex, newIndex }: InternalOrderChange): void;
export declare function getNewKeyboardOrderChange(root: HTMLElement, currentKeyboardOrderChange: InternalOrderChange, delta: number): InternalOrderChange;
export declare function getEmptyKeyboardOrderChange(): InternalOrderChange;
export declare function getIndexInParent(target: HTMLElement): number;
export declare function setAllCheckboxInputs(root: HTMLElement, checked: boolean): void;
export declare function setMainCheckboxElementCheckedState(root: HTMLElement, mainCheckboxElement: HTMLInputElement): void;
export declare function getSelectedColumnCount(root: HTMLElement): {
  count: number;
  total: number;
};
export declare function setHighlights(root: HTMLElement, searchElement: HTMLInputElement, currentMatch?: number): InternalHighlightResults;
