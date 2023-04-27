import { r as registerInstance, h } from './index-816e34d8.js';

const guxTabDropdownOptionLegacyCss = "gux-tab-dropdown-option-legacy .tab-dropdown-option{display:flex;align-items:center;width:120px;height:36px;padding:0;font-size:12px;cursor:pointer;background:none;border:none;transition:color 0.25s, background-color 0.25s}gux-tab-dropdown-option-legacy .tab-dropdown-option:hover,gux-tab-dropdown-option-legacy .tab-dropdown-option:focus{outline:none}gux-tab-dropdown-option-legacy .tab-dropdown-option gux-icon{width:16px;height:16px;margin:0 10px}.gux-tab-dropdown-option-light-theme .tab-dropdown-option{color:#2e394c}.gux-tab-dropdown-option-light-theme .tab-dropdown-option:hover,.gux-tab-dropdown-option-light-theme .tab-dropdown-option:focus-visible{color:#fdfdfd;background-color:#2a60c8}.gux-light-theme gux-tab-dropdown-option-legacy .tab-dropdown-option{color:#2e394c}.gux-light-theme gux-tab-dropdown-option-legacy .tab-dropdown-option:hover,.gux-light-theme gux-tab-dropdown-option-legacy .tab-dropdown-option:focus-visible{color:#fdfdfd;background-color:#2a60c8}gux-tab-dropdown-option-legacy.gux-light-theme .tab-dropdown-option{color:#2e394c}gux-tab-dropdown-option-legacy.gux-light-theme .tab-dropdown-option:hover,gux-tab-dropdown-option-legacy.gux-light-theme .tab-dropdown-option:focus-visible{color:#fdfdfd;background-color:#2a60c8}gux-tab-dropdown-option-legacy .tab-dropdown-option{color:#2e394c}gux-tab-dropdown-option-legacy .tab-dropdown-option:hover,gux-tab-dropdown-option-legacy .tab-dropdown-option:focus-visible{color:#fdfdfd;background-color:#2a60c8}";

const GuxTabDropdownOptionLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.optionId = undefined;
    this.iconName = undefined;
  }
  render() {
    return (h("button", { class: "tab-dropdown-option" }, h("gux-icon", { "icon-name": this.iconName, decorative: true }), h("span", null, h("slot", null))));
  }
};
GuxTabDropdownOptionLegacy.style = guxTabDropdownOptionLegacyCss;

export { GuxTabDropdownOptionLegacy as gux_tab_dropdown_option_legacy };
