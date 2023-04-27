import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';

function getSectionByName(slotName, sections) {
  return sections.find(section => section.slotName === slotName);
}
function getPreviousSection(slot, sections) {
  const currentIndex = sections.findIndex(section => section.slotName === slot);
  if (currentIndex <= 0) {
    return sections[sections.length - 1].ref;
  }
  return sections[currentIndex - 1].ref;
}
function getNextSection(slot, sections) {
  const currentIndex = sections.findIndex(section => section.slotName === slot);
  if (currentIndex >= sections.length - 1) {
    return sections[0].ref;
  }
  return sections[currentIndex + 1].ref;
}
function getFirstSection(sections) {
  return sections[0].ref;
}
function getLastSection(sections) {
  return sections[this.sections.length - 1].ref;
}
function getToggleButton(section) {
  return section.querySelector('.gux-header-button');
}
function getSections(root) {
  const children = Array.from(root.children);
  const sections = [];
  children.forEach(element => {
    const slotName = element.getAttribute('slot');
    element.hidden = !Boolean(slotName);
    if (slotName) {
      sections.push({
        slotName,
        ref: null
      });
    }
  });
  return sections;
}
function modifyClassList(slotName, modification, sections) {
  const section = getSectionByName(slotName, sections);
  section === null || section === void 0 ? void 0 : section.ref.classList[modification]('gux-opened');
}
function onKeyboardNavigation(event, slotName, sections) {
  let newSection;
  switch (event.key) {
    case 'ArrowUp':
      newSection = getPreviousSection(slotName, sections);
      break;
    case 'ArrowDown':
      newSection = getNextSection(slotName, sections);
      break;
    case 'End':
      newSection = getLastSection(sections);
      break;
    case 'Home':
      newSection = getFirstSection(sections);
      break;
  }
  if (newSection) {
    getToggleButton(newSection).focus();
  }
}

const guxAccordionCss = "gux-accordion-legacy .gux-accordion{padding:0;margin:0;background-color:#fdfdfd}gux-accordion-legacy .gux-accordion .gux-section{color:#2e394c}gux-accordion-legacy .gux-accordion .gux-section .gux-header{box-sizing:border-box;height:40px;border-top:1px solid #e2e6ee}gux-accordion-legacy .gux-accordion .gux-section .gux-header .gux-header-button{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:center;align-items:center;justify-content:flex-start;width:100%;height:100%;padding:0 16px;margin:0;color:#2e394c;cursor:pointer;background:none;border:none}gux-accordion-legacy .gux-accordion .gux-section .gux-header .gux-header-button .gux-text{flex:0 1 auto;align-self:auto;padding-right:8px;font-family:inherit;font-size:inherit;font-weight:bold;text-align:left}gux-accordion-legacy .gux-accordion .gux-section .gux-header .gux-header-button .gux-spacer{flex:1 1 auto;align-self:auto}gux-accordion-legacy .gux-accordion .gux-section .gux-header .gux-header-button .gux-toggle-arrow{flex:0 1 auto;align-items:center;align-self:auto;color:#6b7585;transition:transform 0.5s ease;transform-origin:center}gux-accordion-legacy .gux-accordion .gux-section .gux-header .gux-header-button .gux-toggle-arrow gux-icon{width:20px;height:20px}gux-accordion-legacy .gux-accordion .gux-section .gux-header:hover .gux-toggle-arrow{color:#2e394c}gux-accordion-legacy .gux-accordion .gux-section .gux-content{box-sizing:border-box;display:none;padding:16px}gux-accordion-legacy .gux-accordion .gux-section.gux-opened .gux-header{border-bottom:1px solid #e2e6ee}gux-accordion-legacy .gux-accordion .gux-section.gux-opened .gux-header .gux-toggle-arrow{transform:rotate(-180deg)}gux-accordion-legacy .gux-accordion .gux-section.gux-opened .gux-content{display:block}gux-accordion-legacy .gux-accordion .gux-section:last-of-type .gux-header{border-bottom:1px solid #e2e6ee}gux-accordion-legacy .gux-accordion .gux-section:last-of-type .gux-content{border-bottom:1px solid #e2e6ee}";

const GuxAccordionLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.sections = [];
    this.headingLevel = null;
    this.arrowPosition = 'default';
  }
  /**
   * Opens a section.
   * @param slotName The slot name
   */
  async open(slotName) {
    modifyClassList(slotName, 'add', this.sections);
  }
  /**
   * Closes a section.
   * @param slotName The slot name
   */
  async close(slotName) {
    modifyClassList(slotName, 'remove', this.sections);
  }
  /**
   * Toggles a section.
   * @param slotName The slot name
   */
  async toggle(slotName) {
    modifyClassList(slotName, 'toggle', this.sections);
  }
  componentWillLoad() {
    trackComponent(this.root);
    this.sections = getSections(this.root);
  }
  render() {
    return (h("div", { class: "gux-accordion" }, this.sections.map(section => (h("section", { class: "gux-section", onKeyDown: event => onKeyboardNavigation(event, section.slotName, this.sections), ref: el => (section.ref = el) }, h("div", { "aria-role": "heading", "aria-level": this.headingLevel, class: "gux-header" }, h("button", { class: "gux-header-button", type: "button", onClick: () => this.toggle(section.slotName) }, h("div", { class: "gux-text" }, section.slotName), this.arrowPosition === 'beside-text' ? null : (h("div", { class: "gux-spacer" })), h("div", { class: "gux-toggle-arrow" }, h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })))), h("div", { class: "gux-content" }, h("slot", { name: section.slotName })))))));
  }
  get root() { return getElement(this); }
};
GuxAccordionLegacy.style = guxAccordionCss;

export { GuxAccordionLegacy as gux_accordion_legacy };
