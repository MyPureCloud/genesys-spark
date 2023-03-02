import { r as registerInstance, e as createEvent, h, j as Host } from './index-f583fcde.js';

const guxListItemCss = ":host:focus .gux-list-item,:host:active .gux-list-item,:host:hover:not([disabled]) .gux-list-item{color:#fdfdfd;background:#2a60c8}:host(:focus) .gux-list-item,:host(:active) .gux-list-item,:host(:hover:not([disabled])) .gux-list-item{color:#fdfdfd;background:#2a60c8}:host([disabled]) .gux-list-item{pointer-events:none;cursor:default;opacity:0.5}.gux-list-item{display:flex;height:max-content;padding:0 16px;line-height:32px;word-wrap:break-word;cursor:pointer}.gux-list-item .gux-text{width:100%}";

const GuxListItemLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.press = createEvent(this, "press", 7);
    this.text = undefined;
    this.value = undefined;
    this.strategy = undefined;
  }
  handleClick() {
    this.onItemClicked();
  }
  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onItemClicked();
    }
  }
  render() {
    return (h(Host, { role: "listitem" }, h("span", { class: "gux-list-item" }, this.text && (h("gux-text-highlight", { class: "gux-text", text: this.text, strategy: this.strategy })), h("slot", null))));
  }
  onItemClicked() {
    this.emitPress();
  }
  emitPress() {
    this.press.emit(this.value);
  }
};
GuxListItemLegacy.style = guxListItemCss;

export { GuxListItemLegacy as gux_list_item_legacy };
