import { r as registerInstance, e as createEvent, h, j as Host } from './index-f583fcde.js';

const guxActionItemCss = ":host{outline:none}.gux-action-item{display:flex;width:100%;height:max-content;padding:0 16px;font-family:inherit;font-size:inherit;line-height:32px;text-align:left;word-wrap:break-word;cursor:pointer;background-color:inherit;border:none}.gux-action-item:focus-within:not([disabled]),.gux-action-item:active:not([disabled]),.gux-action-item:hover:not([disabled]){color:#fdfdfd;background:#2a60c8;outline:none}.gux-action-item .gux-text{width:100%}.gux-action-item.gux-disabled{pointer-events:none;cursor:default}";

const GuxActionItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.press = createEvent(this, "press", 7);
    this.text = undefined;
    this.value = undefined;
    this.disabled = false;
  }
  handleClick() {
    this.onItemClicked();
  }
  onKeydown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.onItemClicked();
        return;
    }
  }
  onKeyup(event) {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        this.onItemClicked();
        return;
    }
  }
  onItemClicked() {
    if (!this.disabled) {
      this.press.emit(this.value);
    }
  }
  render() {
    return (h(Host, { role: "listitem" }, h("button", { disabled: this.disabled, onClick: () => this.onItemClicked(), class: {
        'gux-action-item': true,
        'gux-disabled': this.disabled
      } }, this.text, h("slot", null))));
  }
};
GuxActionItem.style = guxActionItemCss;

export { GuxActionItem as gux_action_item };
