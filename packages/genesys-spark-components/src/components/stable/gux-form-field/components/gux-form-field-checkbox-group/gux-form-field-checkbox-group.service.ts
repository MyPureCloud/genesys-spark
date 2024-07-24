import simulateNativeEvent from '@utils/dom/simulate-native-event';

export function setAllCheckboxInputs(
  root: HTMLElement,
  checked: boolean
): void {
  getNestedCheckboxInputs(root).forEach(checkboxInput => {
    if (checkboxInput.checked !== checked && !checkboxInput.disabled) {
      checkboxInput.checked = checked;
      simulateNativeEvent(checkboxInput, 'input');
      simulateNativeEvent(checkboxInput, 'change');
    }
  });
}

export function setParentCheckboxElementCheckedState(
  root: HTMLElement,
  mainCheckboxElement: HTMLInputElement
): void {
  if (mainCheckboxElement) {
    const { checkedCheckboxes, totalCheckboxes } = getSelectedColumnCount(root);
    if (checkedCheckboxes === 0) {
      mainCheckboxElement.indeterminate = false;
      mainCheckboxElement.checked = false;
    } else if (checkedCheckboxes === totalCheckboxes) {
      mainCheckboxElement.indeterminate = false;
      mainCheckboxElement.checked = true;
    } else {
      mainCheckboxElement.indeterminate = true;
    }
  }
}

export function getSelectedColumnCount(root: HTMLElement): {
  checkedCheckboxes: number;
  totalCheckboxes: number;
} {
  const totalCheckboxes = getNestedCheckboxInputs(root).length;
  const checkedCheckboxes = getCheckedCheckboxInputs(root).length;

  return { checkedCheckboxes, totalCheckboxes };
}

function getNestedCheckboxInputs(root: HTMLElement): HTMLInputElement[] {
  return Array.from(
    root.querySelectorAll(
      'gux-form-field-checkbox input:not(gux-form-field-checkbox[slot="group-checkbox"] input'
    )
  );
}

function getCheckedCheckboxInputs(root: HTMLElement): HTMLInputElement[] {
  const checkboxInputs = getNestedCheckboxInputs(root);

  return checkboxInputs.filter(x => x.checked);
}
