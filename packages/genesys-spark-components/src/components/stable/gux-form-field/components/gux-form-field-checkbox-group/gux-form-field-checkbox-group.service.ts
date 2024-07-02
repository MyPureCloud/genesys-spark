import simulateNativeEvent from '@utils/dom/simulate-native-event';

export function setAllCheckboxInputs(
  root: HTMLElement,
  checked: boolean
): void {
  getCheckboxInputs(root).forEach(checkboxInput => {
    if (checkboxInput.checked !== checked && !checkboxInput.disabled) {
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
  if (mainCheckboxElement) {
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
}

export function getSelectedColumnCount(root: HTMLElement): {
  count: number;
  total: number;
} {
  const total = getCheckboxInputs(root).length;
  const count = getCheckedCheckboxInputs(root).length;

  return { count, total };
}

function getCheckboxInputs(root: HTMLElement): HTMLInputElement[] {
  return Array.from(root.querySelectorAll('input[type=checkbox]'));
}

function getCheckedCheckboxInputs(root: HTMLElement): HTMLInputElement[] {
  const checkboxInputs = getCheckboxInputs(root);

  return checkboxInputs.filter(x => x.checked);
}
