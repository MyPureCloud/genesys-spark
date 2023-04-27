'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
const usage = require('./usage-da9572bf.js');
require('./get-closest-element-ab4b2eee.js');

const tag = "tag with label: {label}";
const tagResources = {
	tag: tag,
	"tag-disabled": "disabled tag with label: {label}",
	"remove-tag": "Remove tag with label: {label}"
};

const guxTagCss = ":host{display:inline-block}.gux-tag{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;padding:2px 8px;font-size:12px;font-weight:bold;color:#fdfdfd;background-color:#2e394c;border-radius:4px}.gux-tag gux-tooltip-title{white-space:nowrap;cursor:default}.gux-tag gux-tooltip-title ::slotted(gux-icon){height:20px;font-size:16px}.gux-tag .gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-tag .gux-tag-remove-button{all:unset;display:flex;align-content:center;align-items:center;justify-content:center;margin-left:8px}.gux-tag .gux-tag-remove-button:not(:disabled):hover{cursor:pointer}.gux-tag .gux-tag-remove-button .gux-tag-remove-icon{width:16px;height:16px;border-radius:25%}.gux-tag .gux-tag-remove-button:focus-within .gux-tag-remove-icon{outline:2px solid #aac9ff;outline-offset:0}.gux-tag.gux-disabled{background-color:rgba(46, 57, 76, 0.5)}.gux-tag.gux-default{background-color:#2e394c}.gux-tag.gux-default.gux-disabled{background-color:rgba(46, 57, 76, 0.5)}.gux-tag.gux-default-subtle{color:#2e394c;background-color:#e2e6ee}.gux-tag.gux-default-subtle.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(226, 230, 238, 0.5)}.gux-tag.gux-navy{background-color:#203b73}.gux-tag.gux-navy.gux-disabled{background-color:rgba(32, 59, 115, 0.5)}.gux-tag.gux-blue{color:#2e394c;background-color:#75a8ff}.gux-tag.gux-blue.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(117, 168, 255, 0.5)}.gux-tag.gux-electric-purple{background-color:#8452cf}.gux-tag.gux-electric-purple.gux-disabled{background-color:rgba(132, 82, 207, 0.5)}.gux-tag.gux-aqua-green{color:#202937;background-color:#1da8b3}.gux-tag.gux-aqua-green.gux-disabled{color:rgba(32, 41, 55, 0.5);background-color:rgba(29, 168, 179, 0.5)}.gux-tag.gux-fuscha{color:#000000;background-color:#cc3ebe}.gux-tag.gux-fuscha.gux-disabled{color:rgba(0, 0, 0, 0.5);background-color:rgba(204, 62, 190, 0.5)}.gux-tag.gux-fuchsia{color:#000000;background-color:#cc3ebe}.gux-tag.gux-fuchsia.gux-disabled{color:rgba(0, 0, 0, 0.5);background-color:rgba(204, 62, 190, 0.5)}.gux-tag.gux-dark-purple{background-color:#5e5782}.gux-tag.gux-dark-purple.gux-disabled{background-color:rgba(94, 87, 130, 0.5)}.gux-tag.gux-bubblegum-pink{color:#2e394c;background-color:#ff8fdd}.gux-tag.gux-bubblegum-pink.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(255, 143, 221, 0.5)}.gux-tag.gux-olive-green{color:#151d28;background-color:#868c1e}.gux-tag.gux-olive-green.gux-disabled{color:rgba(21, 29, 40, 0.5);background-color:rgba(134, 140, 30, 0.5)}.gux-tag.gux-lilac{color:#2e394c;background-color:#b5b5eb}.gux-tag.gux-lilac.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(181, 181, 235, 0.5)}.gux-tag.gux-alert-yellow-green{color:#2e394c;background-color:#ddd933}.gux-tag.gux-alert-yellow-green.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(221, 217, 51, 0.5)}.gux-tag.gux-blue-10{background-color:#172b52}.gux-tag.gux-blue-10.gux-disabled{background-color:rgba(23, 43, 82, 0.5)}.gux-tag.gux-blue-20{background-color:#1c3363}.gux-tag.gux-blue-20.gux-disabled{background-color:rgba(28, 51, 99, 0.5)}.gux-tag.gux-blue-30{background-color:#203b73}.gux-tag.gux-blue-30.gux-disabled{background-color:rgba(32, 59, 115, 0.5)}.gux-tag.gux-blue-40{background-color:#23478f}.gux-tag.gux-blue-40.gux-disabled{background-color:rgba(35, 71, 143, 0.5)}.gux-tag.gux-blue-50{background-color:#2754ac}.gux-tag.gux-blue-50.gux-disabled{background-color:rgba(39, 84, 172, 0.5)}.gux-tag.gux-blue-60{background-color:#2a60c8}.gux-tag.gux-blue-60.gux-disabled{background-color:rgba(42, 96, 200, 0.5)}.gux-tag.gux-blue-70{color:#151d28;background-color:#5084e3}.gux-tag.gux-blue-70.gux-disabled{color:rgba(21, 29, 40, 0.5);background-color:rgba(80, 132, 227, 0.5)}.gux-tag.gux-blue-80{color:#2e394c;background-color:#75a8ff}.gux-tag.gux-blue-80.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(117, 168, 255, 0.5)}.gux-tag.gux-blue-90{color:#2e394c;background-color:#aac9ff}.gux-tag.gux-blue-90.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(170, 201, 255, 0.5)}.gux-tag.gux-blue-100{color:#2e394c;background-color:#deeaff}.gux-tag.gux-blue-100.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(222, 234, 255, 0.5)}.gux-tag.gux-alert-red-10{background-color:#520404}.gux-tag.gux-alert-red-10.gux-disabled{background-color:rgba(82, 4, 4, 0.5)}.gux-tag.gux-alert-red-20{background-color:#700505}.gux-tag.gux-alert-red-20.gux-disabled{background-color:rgba(112, 5, 5, 0.5)}.gux-tag.gux-alert-red-30{background-color:#8f0707}.gux-tag.gux-alert-red-30.gux-disabled{background-color:rgba(143, 7, 7, 0.5)}.gux-tag.gux-alert-red-40{background-color:#ad0808}.gux-tag.gux-alert-red-40.gux-disabled{background-color:rgba(173, 8, 8, 0.5)}.gux-tag.gux-alert-red-50{background-color:#cc0a0a}.gux-tag.gux-alert-red-50.gux-disabled{background-color:rgba(204, 10, 10, 0.5)}.gux-tag.gux-alert-red-60{background-color:#ea0b0b}.gux-tag.gux-alert-red-60.gux-disabled{background-color:rgba(234, 11, 11, 0.5)}.gux-tag.gux-alert-red-70{color:#000000;background-color:#ef4343}.gux-tag.gux-alert-red-70.gux-disabled{color:rgba(0, 0, 0, 0.5);background-color:rgba(239, 67, 67, 0.5)}.gux-tag.gux-alert-red-80{color:#283243;background-color:#f37a7a}.gux-tag.gux-alert-red-80.gux-disabled{color:rgba(40, 50, 67, 0.5);background-color:rgba(243, 122, 122, 0.5)}.gux-tag.gux-alert-red-90{color:#2e394c;background-color:#f8b2b2}.gux-tag.gux-alert-red-90.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(248, 178, 178, 0.5)}.gux-tag.gux-alert-red-100{color:#2e394c;background-color:#fceaea}.gux-tag.gux-alert-red-100.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(252, 234, 234, 0.5)}.gux-tag.gux-alert-green-10{background-color:#0d3d00}.gux-tag.gux-alert-green-10.gux-disabled{background-color:rgba(13, 61, 0, 0.5)}.gux-tag.gux-alert-green-20{background-color:#164b08}.gux-tag.gux-alert-green-20.gux-disabled{background-color:rgba(22, 75, 8, 0.5)}.gux-tag.gux-alert-green-30{background-color:#205a10}.gux-tag.gux-alert-green-30.gux-disabled{background-color:rgba(32, 90, 16, 0.5)}.gux-tag.gux-alert-green-40{background-color:#296817}.gux-tag.gux-alert-green-40.gux-disabled{background-color:rgba(41, 104, 23, 0.5)}.gux-tag.gux-alert-green-50{background-color:#33771f}.gux-tag.gux-alert-green-50.gux-disabled{background-color:rgba(51, 119, 31, 0.5)}.gux-tag.gux-alert-green-60{background-color:#3c8527}.gux-tag.gux-alert-green-60.gux-disabled{background-color:rgba(60, 133, 39, 0.5)}.gux-tag.gux-alert-green-70{color:#202937;background-color:#69a358}.gux-tag.gux-alert-green-70.gux-disabled{color:rgba(32, 41, 55, 0.5);background-color:rgba(105, 163, 88, 0.5)}.gux-tag.gux-alert-green-80{color:#2e394c;background-color:#95c189}.gux-tag.gux-alert-green-80.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(149, 193, 137, 0.5)}.gux-tag.gux-alert-green-90{color:#2e394c;background-color:#c2deb9}.gux-tag.gux-alert-green-90.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(194, 222, 185, 0.5)}.gux-tag.gux-alert-green-100{color:#2e394c;background-color:#eefcea}.gux-tag.gux-alert-green-100.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(238, 252, 234, 0.5)}.gux-tag.gux-alert-yellow-10{background-color:#523800}.gux-tag.gux-alert-yellow-10.gux-disabled{background-color:rgba(82, 56, 0, 0.5)}.gux-tag.gux-alert-yellow-20{background-color:#755000}.gux-tag.gux-alert-yellow-20.gux-disabled{background-color:rgba(117, 80, 0, 0.5)}.gux-tag.gux-alert-yellow-30{background-color:#976700}.gux-tag.gux-alert-yellow-30.gux-disabled{background-color:rgba(151, 103, 0, 0.5)}.gux-tag.gux-alert-yellow-40{color:#151d28;background-color:#ba7f00}.gux-tag.gux-alert-yellow-40.gux-disabled{color:rgba(21, 29, 40, 0.5);background-color:rgba(186, 127, 0, 0.5)}.gux-tag.gux-alert-yellow-50{color:#2e394c;background-color:#dc9600}.gux-tag.gux-alert-yellow-50.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(220, 150, 0, 0.5)}.gux-tag.gux-alert-yellow-60{color:#2e394c;background-color:#ffae00}.gux-tag.gux-alert-yellow-60.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(255, 174, 0, 0.5)}.gux-tag.gux-alert-yellow-70{color:#2e394c;background-color:#fbbe3b}.gux-tag.gux-alert-yellow-70.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(251, 190, 59, 0.5)}.gux-tag.gux-alert-yellow-80{color:#2e394c;background-color:#fcd276}.gux-tag.gux-alert-yellow-80.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(252, 210, 118, 0.5)}.gux-tag.gux-alert-yellow-90{color:#2e394c;background-color:#fce5b1}.gux-tag.gux-alert-yellow-90.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(252, 229, 177, 0.5)}.gux-tag.gux-alert-yellow-100{color:#2e394c;background-color:#fdf8ec}.gux-tag.gux-alert-yellow-100.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(253, 248, 236, 0.5)}.gux-tag.gux-brand-orange{color:#151d28;background-color:#ff4f1f}.gux-tag.gux-brand-orange.gux-disabled{color:rgba(21, 29, 40, 0.5);background-color:rgba(255, 79, 31, 0.5)}.gux-tag.gux-brand-teal{color:#283243;background-color:#00ae9e}.gux-tag.gux-brand-teal.gux-disabled{color:rgba(40, 50, 67, 0.5);background-color:rgba(0, 174, 158, 0.5)}.gux-tag.gux-brand-navy{background-color:#23395d}.gux-tag.gux-brand-navy.gux-disabled{background-color:rgba(35, 57, 93, 0.5)}.gux-tag.gux-brand-light-blue{color:#151d28;background-color:#3b90aa}.gux-tag.gux-brand-light-blue.gux-disabled{color:rgba(21, 29, 40, 0.5);background-color:rgba(59, 144, 170, 0.5)}.gux-tag.gux-brand-yellow{color:#2e394c;background-color:#ff8f14}.gux-tag.gux-brand-yellow.gux-disabled{color:rgba(46, 57, 76, 0.5);background-color:rgba(255, 143, 20, 0.5)}";

const GuxTag = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxdelete = index.createEvent(this, "guxdelete", 7);
    this.color = 'default';
    this.value = undefined;
    this.disabled = false;
    this.removable = false;
    this.label = undefined;
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        this.removeTag();
    }
  }
  removeTag() {
    if (this.disabled || !this.removable) {
      return;
    }
    this.guxdelete.emit(this.value);
  }
  onSlotChange(event) {
    const slotAssignedNodes = event.composedPath()[0].assignedNodes();
    this.label = slotAssignedNodes
      .map(nodeItem => nodeItem.textContent)
      .join('');
  }
  renderTagTitle() {
    return (index.h("gux-tooltip-title", null, index.h("span", null, index.h("slot", { "aria-hidden": "true", onSlotchange: this.onSlotChange.bind(this) }))));
  }
  renderSrText() {
    return (index.h("div", { class: "gux-sr-only" }, this.disabled
      ? this.i18n('tag-disabled', { label: this.label })
      : this.i18n('tag', { label: this.label })));
  }
  renderRemoveButton() {
    if (this.removable) {
      return (index.h("button", { class: "gux-tag-remove-button", onClick: this.removeTag.bind(this), type: "button", disabled: this.disabled }, index.h("gux-icon", { class: "gux-tag-remove-icon", "icon-name": "close", "screenreader-text": this.i18n('remove-tag', {
          label: this.label
        }) })));
    }
  }
  componentWillLoad() {
    usage.trackComponent(this.root, {
      variant: this.removable ? 'removable' : 'permenant'
    });
  }
  async componentWillRender() {
    this.i18n = await index$1.buildI18nForComponent(this.root, tagResources);
  }
  render() {
    return (index.h("div", { class: {
        'gux-tag': true,
        [`gux-${this.color}`]: true,
        'gux-disabled': this.disabled
      }, "aria-disabled": this.disabled.toString() }, this.renderTagTitle(), this.renderSrText(), this.renderRemoveButton()));
  }
  get root() { return index.getElement(this); }
};
GuxTag.style = guxTagCss;

exports.gux_tag_beta = GuxTag;
