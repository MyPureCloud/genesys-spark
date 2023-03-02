import { GuxFormFieldLabelPosition } from './gux-form-field.types';
export declare function clearInput(input: HTMLInputElement): void;
export declare function hasContent(input: HTMLInputElement | HTMLTextAreaElement): boolean;
export declare function getComputedLabelPosition(label: HTMLElement, labelPosition: GuxFormFieldLabelPosition): GuxFormFieldLabelPosition;
export declare function validateFormIds(root: HTMLElement, input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLGuxListboxElement | HTMLGuxListboxMultiElement | HTMLGuxTimePickerBetaElement | HTMLGuxPhoneInputBetaElement): void;
export declare function setSlotAriaDescribedby(root: HTMLElement, input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, slotName: string): void;
