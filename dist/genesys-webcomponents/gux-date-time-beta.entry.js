import { r as registerInstance, h, j as Host, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { D as DateTimeFormatter } from './DateTimeFormatter-058f0e70.js';
import { g as getDesiredLocale } from './index-0998c803.js';
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
