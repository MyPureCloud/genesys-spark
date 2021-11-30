import { E2EElement, E2EPage } from '@stencil/core/testing';

export class E2EGuxDropdown {
  constructor(private page: E2EPage, private selector: string) {}

  get element(): Promise<E2EElement> {
    return this.page.find(this.selector);
  }

  get textField(): Promise<E2EElement> {
    return this.element.then(el => el.find('input'));
  }

  get options(): Promise<E2EElement[]> {
    return this.element.then(el => el.findAll('gux-option'));
  }

  get currentValue(): Promise<string> {
    return this.textField.then(el => el.getAttribute('value'));
  }

  async optionWithValue(value: string): Promise<E2EElement> {
    return (await this.options).find(el => el.textContent.includes(value));
  }

  async select(value: string): Promise<void> {
    await (await this.element).click();

    const option = await this.optionWithValue(value);
    await option.click();
  }
}
