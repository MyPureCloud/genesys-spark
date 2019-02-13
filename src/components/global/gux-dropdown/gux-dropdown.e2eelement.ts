import { E2EElement, E2EPage } from '@stencil/core/testing';

export class E2EGuxDropdown {
  constructor(private page: E2EPage, private selector: string) {}

  get element(): Promise<E2EElement> {
    return this.page.find(this.selector);
  }

  get textField(): Promise<E2EElement> {
    return this.element.then(el => el.find('input'));
  }

  get listElement() : Promise<E2EElement> {
    return this.element.then(el => el.find('gux-list'));
  }

  get listItems() : Promise<E2EElement[]> {
    return this.element.then(el => el.findAll('li'));
  }

  get currentValue(): Promise<string> {
    return this.textField.then(el => el.getAttribute('value'));
  }

  async itemWithValue(value: string): Promise<E2EElement> {
    return (await this.listItems).find(el => el.textContent.includes(value));
  }

  async select(value: string): Promise<void> {
    (await this.element).click();

    const listItem = await this.itemWithValue(value);
    await listItem.click();
  }
}
