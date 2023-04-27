'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');

const guxSidePanelButtonCss = "gux-side-panel-button button{width:48px;height:48px;color:#2e394c;cursor:pointer;background-color:#fdfdfd;border:none;border-bottom:1px solid #e2e6ee}gux-side-panel-button button.selected{color:#fdfdfd;background-color:#2a60c8}gux-side-panel-button button:hover,gux-side-panel-button button:active,gux-side-panel-button button:focus-visible{color:#2a60c8}gux-side-panel-button button:hover.selected,gux-side-panel-button button:active.selected,gux-side-panel-button button:focus-visible.selected{color:#fdfdfd}gux-side-panel-button button:focus{outline:none}gux-side-panel-button button i{font-size:24px}.gux-side-panel-button-dark-theme button{color:#fdfdfd;background-color:#2e394c;border-color:#202937}.gux-side-panel-button-dark-theme button.selected{background-color:#2a60c8}.gux-side-panel-button-dark-theme button:hover,.gux-side-panel-button-dark-theme button:active,.gux-side-panel-button-dark-theme button:focus-visible{color:#75a8ff}.gux-side-panel-button-dark-theme button:hover.selected,.gux-side-panel-button-dark-theme button:active.selected,.gux-side-panel-button-dark-theme button:focus-visible.selected{color:#fdfdfd}.gux-dark-theme gux-side-panel-button button{color:#fdfdfd;background-color:#2e394c;border-color:#202937}.gux-dark-theme gux-side-panel-button button.selected{background-color:#2a60c8}.gux-dark-theme gux-side-panel-button button:hover,.gux-dark-theme gux-side-panel-button button:active,.gux-dark-theme gux-side-panel-button button:focus-visible{color:#75a8ff}.gux-dark-theme gux-side-panel-button button:hover.selected,.gux-dark-theme gux-side-panel-button button:active.selected,.gux-dark-theme gux-side-panel-button button:focus-visible.selected{color:#fdfdfd}gux-side-panel-button.gux-dark-theme button{color:#fdfdfd;background-color:#2e394c;border-color:#202937}gux-side-panel-button.gux-dark-theme button.selected{background-color:#2a60c8}gux-side-panel-button.gux-dark-theme button:hover,gux-side-panel-button.gux-dark-theme button:active,gux-side-panel-button.gux-dark-theme button:focus-visible{color:#75a8ff}gux-side-panel-button.gux-dark-theme button:hover.selected,gux-side-panel-button.gux-dark-theme button:active.selected,gux-side-panel-button.gux-dark-theme button:focus-visible.selected{color:#fdfdfd}.gux-side-panel-button-light-theme{color:#2e394c}.gux-light-theme gux-side-panel-button{color:#2e394c}gux-side-panel-button.gux-light-theme{color:#2e394c}gux-side-panel-button{color:#2e394c}";

const GuxSidePanelButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.icon = undefined;
    this.altText = undefined;
    this.isSelected = false;
  }
  get buttonClass() {
    return this.isSelected ? 'selected' : '';
  }
  render() {
    return (index.h("button", { "aria-label": this.altText, class: this.buttonClass }, index.h("gux-icon", { decorative: true, "icon-name": this.icon })));
  }
};
GuxSidePanelButton.style = guxSidePanelButtonCss;

exports.gux_side_panel_button = GuxSidePanelButton;
