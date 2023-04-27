import { r as registerInstance, h, H as Host, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { b as afterNextRender } from './after-next-render-ed0f7dcd.js';

const guxAnnounceCss = ":host{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxAnnounce = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.politeness = 'polite';
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxAnnounce(text) {
    this.containerElement.innerText = '';
    afterNextRender(() => {
      this.containerElement.innerText = text;
    });
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h(Host, { "aria-live": this.politeness }, h("slot", null), h("div", { ref: el => (this.containerElement = el) })));
  }
  get root() { return getElement(this); }
};
GuxAnnounce.style = guxAnnounceCss;

export { GuxAnnounce as gux_announce_beta };
