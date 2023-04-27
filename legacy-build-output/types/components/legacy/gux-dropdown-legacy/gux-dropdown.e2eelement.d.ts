import { E2EElement, E2EPage } from '@stencil/core/testing';
export declare class E2EGuxDropdown {
  private page;
  private selector;
  constructor(page: E2EPage, selector: string);
  get element(): Promise<E2EElement>;
  get textField(): Promise<E2EElement>;
  get options(): Promise<E2EElement[]>;
  get currentValue(): Promise<string>;
  optionWithValue(value: string): Promise<E2EElement>;
  select(value: string): Promise<void>;
}
