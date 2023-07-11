import clamp from '@utils/number/clamp';
import simulateNativeEvent from '@utils/dom/simulate-native-event';

import {
  InternalOrderChange,
  InternalHighlightResults,
  GuxOrder
} from './gux-column-manager.types';

export function getNewOrder(
  root: HTMLElement,
  { oldIndex, newIndex }: InternalOrderChange
): GuxOrder {
  const order = (
    Array.from(root.children) as HTMLGuxColumnManagerItemElement[]
  ).map(x => x.orderId);

  const [element] = order.splice(oldIndex, 1);
  order.splice(newIndex, 0, element);

  return order;
}

export function setKeyboardReorderPositionIndicator(
  root: HTMLElement,
  { oldIndex, newIndex }: InternalOrderChange
): void {
  getColumnManagerItems(root).forEach((item, index) => {
    if (index !== newIndex) {
      item.removeAttribute('gs-reorder-indicator');
    } else {
      const position = newIndex < oldIndex ? 'above' : 'below';

      item.setAttribute('gs-reorder-indicator', position);
    }
  });
}

export function getNewKeyboardOrderChange(
  root: HTMLElement,
  currentKeyboardOrderChange: InternalOrderChange,
  delta: number
): InternalOrderChange {
  const newIndex = clamp(
    currentKeyboardOrderChange.newIndex + delta,
    0,
    Array.from(root.children).length - 1
  );

  return Object.assign({}, currentKeyboardOrderChange, { newIndex });
}

export function getEmptyKeyboardOrderChange(): InternalOrderChange {
  return { oldIndex: null, newIndex: null };
}

export function getIndexInParent(target: HTMLElement): number {
  return Array.from(target.parentNode.children).indexOf(target);
}

export function setAllCheckboxInputs(
  root: HTMLElement,
  checked: boolean
): void {
  getCheckboxInputs(root).forEach(checkboxInput => {
    if (checkboxInput.checked !== checked) {
      checkboxInput.checked = checked;
      simulateNativeEvent(checkboxInput, 'input');
      simulateNativeEvent(checkboxInput, 'change');
    }
  });
}

export function setMainCheckboxElementCheckedState(
  root: HTMLElement,
  mainCheckboxElement: HTMLInputElement
): void {
  const { count, total } = getSelectedColumnCount(root);

  if (count === 0) {
    mainCheckboxElement.indeterminate = false;
    mainCheckboxElement.checked = false;
  } else if (count === total) {
    mainCheckboxElement.indeterminate = false;
    mainCheckboxElement.checked = true;
  } else {
    mainCheckboxElement.indeterminate = true;
  }
}

export function getSelectedColumnCount(root: HTMLElement): {
  count: number;
  total: number;
} {
  const total = getCheckboxInputs(root).length;
  const count = getCheckedCheckboxInputs(root).length;

  return { count, total };
}

export function setHighlights(
  root: HTMLElement,
  searchElement: HTMLInputElement,
  currentMatch: number = 1
): InternalHighlightResults {
  return getColumnManagerItems(root).reduce(
    (acc: InternalHighlightResults, item: HTMLGuxColumnManagerItemElement) => {
      const searchString = searchElement.value.toLowerCase();

      if (
        searchString &&
        item.textContent.toLowerCase().includes(searchString)
      ) {
        const matchCount = acc.matchCount + 1;

        void item.guxSetHighlight(
          searchElement.value,
          matchCount === currentMatch
        );

        return { matchCount, currentMatch };
      }

      void item.guxSetHighlight();
      return acc;
    },
    { matchCount: 0, currentMatch: 0 } as InternalHighlightResults
  );
}

function getCheckboxInputs(root: HTMLElement): HTMLInputElement[] {
  return Array.from(root.querySelectorAll('input[type=checkbox]'));
}

function getCheckedCheckboxInputs(root: HTMLElement): HTMLInputElement[] {
  const checkboxInputs = getCheckboxInputs(root);

  return checkboxInputs.filter(x => x.checked);
}

function getColumnManagerItems(
  root: HTMLElement
): HTMLGuxColumnManagerItemElement[] {
  return Array.from(root.querySelectorAll('gux-column-manager-item'));
}
