import { r as registerInstance, h, H as Host, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { D as DateTimeFormatter } from './DateTimeFormatter-482bccfa.js';
import { g as getDesiredLocale } from './index-fbebbbd0.js';
import './get-closest-element-1597503c.js';

const GuxDateTime = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.datetime = new Date().toISOString();
    this.format = 'short';
  }
  componentWillLoad() {
    trackComponent(this.root);
    this.formatter = new DateTimeFormatter(getDesiredLocale(this.root));
  }
  render() {
    return (h(Host, null, this.formatter.formatDateTime(new Date(this.datetime), this.format)));
  }
  get root() { return getElement(this); }
};

export { GuxDateTime as gux_date_time_beta };
