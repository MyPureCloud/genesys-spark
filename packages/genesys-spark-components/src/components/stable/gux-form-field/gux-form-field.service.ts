import { randomHTMLId } from '../../../utils/dom/random-html-id';
import { logError } from '../../../utils/error/log-error';
import setInputValue from '../../../utils/dom/set-input-value';
import { hasSlot } from '@utils/dom/has-slot';

import { GuxFormFieldLabelPosition } from './gux-form-field.types';

export function clearInput(input: HTMLInputElement): void {
  setInputValue(input, '', true);
}

export function hasContent(
  input: HTMLInputElement | HTMLTextAreaElement
): boolean {
  return Boolean(input?.value);
}

export function getComputedLabelPosition(
  label: HTMLElement,
  labelPosition: GuxFormFieldLabelPosition
): GuxFormFieldLabelPosition {
  if (label) {
    if (['above', 'beside', 'screenreader'].includes(labelPosition)) {
      return labelPosition;
    } else if (label.offsetWidth > 1 && label.offsetWidth < 40) {
      return 'beside';
    } else {
      return 'above';
    }
  }
}

export function validateFormIds(
  root: HTMLElement,
  input:
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLGuxTimePickerBetaElement
    | HTMLGuxPhoneInputBetaElement
): void {
  if (hasLabelSlot(root)) {
    const label: HTMLLabelElement = root.querySelector('label[slot="label"]');
    const inputHasId = Boolean(input.hasAttribute('id'));
    const labelHasFor = Boolean(label.hasAttribute('for'));

    if (!inputHasId && labelHasFor) {
      logError(
        root,
        'A "for" attribute has been provided on the label but there is no corresponding id on the input. Either provide an id on the input or omit the "for" attribute from the label. If there is no input id and no "for" attribute provided, the component will automatically generate an id and link it to the "for" attribute.'
      );
    } else if (!inputHasId) {
      const defaultInputId = randomHTMLId('gux-form-field-input');
      input.setAttribute('id', defaultInputId);
      label.setAttribute('for', defaultInputId);
    } else if (inputHasId && !labelHasFor) {
      const forId = input.getAttribute('id');
      label.setAttribute('for', forId);
    } else if (
      inputHasId &&
      labelHasFor &&
      input.getAttribute('id') !== label.getAttribute('for')
    ) {
      logError(root, 'The input id and label for attribute should match.');
    }
  } else {
    logError(
      root,
      'A label is required for this component. If a visual label is not needed for this use case, please add localized text for a screenreader and set the label-position attribute to "screenreader" to visually hide the label.'
    );
  }

  if (hasSlot(root, 'error')) {
    const error = root.querySelector('[slot="error"]');
    const errorId = randomHTMLId('gux-form-field-error');
    const describedByIds =
      input
        .getAttribute('aria-describedby')
        ?.split(' ')
        .filter(id => !id.startsWith(`gux-form-field-error`)) || [];

    error.setAttribute('id', errorId);
    describedByIds.push(errorId);

    describedByIds &&
      input.setAttribute('aria-describedby', describedByIds.join(' '));
  } else if (input.getAttribute('aria-describedby')) {
    const describedByIds =
      input
        .getAttribute('aria-describedby')
        ?.split(' ')
        .filter(id => !id.startsWith(`gux-form-field-error`)) || [];
    input.setAttribute('aria-describedby', describedByIds.join(' '));
  }

  if (hasSlot(root, 'help')) {
    const help = root.querySelector('[slot="help"]');
    const helpId = randomHTMLId('gux-form-field-help');
    const describedByIds =
      input
        .getAttribute('aria-describedby')
        ?.split(' ')
        .filter(id => !id.startsWith(`gux-form-field-help`)) || [];

    help.setAttribute('id', helpId);
    describedByIds.push(helpId);

    describedByIds &&
      input.setAttribute('aria-describedby', describedByIds.join(' '));
  } else if (input.getAttribute('aria-describedby')) {
    const describedByIds =
      input
        .getAttribute('aria-describedby')
        ?.split(' ')
        .filter(id => !id.startsWith(`gux-form-field-help`)) || [];
    input.setAttribute('aria-describedby', describedByIds.join(' '));
  }
}

export function setSlotAriaAttribute(
  root: HTMLElement,
  attribute: 'aria-labelledby' | 'aria-describedby',
  input:
    | HTMLGuxListboxElement
    | HTMLGuxListboxMultiElement
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLGuxListboxElement
    | HTMLGuxListboxMultiElement,
  slotName: string
) {
  if (hasSlot(root, slotName)) {
    const slottedElement = root.querySelector(`[slot=${slotName}]`);
    const randomId = randomHTMLId(`gux-${slotName}`);
    const ariaAttributeIds =
      input
        .getAttribute(attribute)
        ?.split(' ')
        .filter(id => !id.startsWith(`gux-${slotName}`)) || [];
    slottedElement.setAttribute('id', randomId);
    ariaAttributeIds?.push(randomId);

    ariaAttributeIds &&
      input.setAttribute(attribute, ariaAttributeIds.join(' '));
  }
}
export function setSlotAriaLabelledby(
  root: HTMLElement,
  input: HTMLGuxListboxElement | HTMLGuxListboxMultiElement,
  slotName: string
) {
  setSlotAriaAttribute(root, 'aria-labelledby', input, slotName);
}

export function setSlotAriaDescribedby(
  root: HTMLElement,
  input:
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLGuxListboxElement
    | HTMLGuxListboxMultiElement,
  slotName: string
) {
  setSlotAriaAttribute(root, 'aria-describedby', input, slotName);
}

export function getSlottedInput(
  root: HTMLElement,
  inputSelector: string
): HTMLInputElement {
  const inputElement: HTMLInputElement = root.querySelector(inputSelector);

  if (!inputElement) {
    logError(
      root,
      `This component requires an input element that matches the following selector: ${inputSelector}`
    );
  }
  return inputElement;
}

function hasLabelSlot(root: HTMLElement): boolean {
  return Boolean(root.querySelector('label[slot="label"]'));
}
