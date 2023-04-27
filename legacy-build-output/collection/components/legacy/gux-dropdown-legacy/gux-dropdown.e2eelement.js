export class E2EGuxDropdown {
  constructor(page, selector) {
    this.page = page;
    this.selector = selector;
  }
  get element() {
    return this.page.find(this.selector);
  }
  get textField() {
    return this.element.then(el => el.find('input'));
  }
  get options() {
    return this.element.then(el => el.findAll('gux-option-legacy'));
  }
  get currentValue() {
    return this.textField.then(el => el.getAttribute('value'));
  }
  async optionWithValue(value) {
    return (await this.options).find(el => el.textContent.includes(value));
  }
  async select(value) {
    await (await this.element).click();
    const option = await this.optionWithValue(value);
    await option.click();
  }
}
