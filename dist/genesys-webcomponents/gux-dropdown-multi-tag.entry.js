import { r as registerInstance, e as createEvent, h, g as getElement } from './index-f583fcde.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import './get-closest-element-1597503c.js';

const clearSelection = "Clear {numberSelected} selected items";
const translationResources = {
	clearSelection: clearSelection
};

const guxDropdownMultiTagCss = ":host{display:inline-block}.gux-tag{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;padding:2px 4px 2px 8px;font-size:12px;font-weight:bold;color:#2e394c;background-color:#e2e6ee;border-radius:4px}.gux-tag .gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-tag .gux-tag-remove-button{all:unset;display:flex;align-content:center;align-items:center;justify-content:center;margin-left:7px}.gux-tag .gux-tag-remove-button:not(:disabled):hover{cursor:pointer}.gux-tag .gux-tag-remove-button .gux-tag-remove-icon{width:16px;height:16px;border-radius:25%}.gux-tag .gux-tag-remove-button:focus-within .gux-tag-remove-icon{outline:2px solid #aac9ff;outline-offset:0}.gux-tag.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(226, 230, 238, 0.5)}";

const GuxDropdownMultiTag = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internalclearselected = createEvent(this, "internalclearselected", 7);
    this.disabled = false;
    this.numberSelected = 0;
    this.label = '';
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        this.removeTag();
    }
  }
  removeTag() {
    if (this.disabled) {
      return;
    }
    this.internalclearselected.emit();
  }
  renderRemoveButton() {
    return (h("button", { class: "gux-tag-remove-button", onClick: this.removeTag.bind(this), type: "button", disabled: this.disabled }, h("gux-icon", { class: "gux-tag-remove-icon", "icon-name": "close", "screenreader-text": this.i18n('clearSelection', {
        numberSelected: this.numberSelected.toString()
      }) })));
  }
  async componentWillRender() {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("div", { class: {
        'gux-tag': true,
        'gux-disabled': this.disabled
      }, "aria-disabled": this.disabled.toString() }, this.numberSelected.toString(), this.renderRemoveButton()));
  }
  get root() { return getElement(this); }
};
GuxDropdownMultiTag.style = guxDropdownMultiTagCss;

export { GuxDropdownMultiTag as gux_dropdown_multi_tag };
