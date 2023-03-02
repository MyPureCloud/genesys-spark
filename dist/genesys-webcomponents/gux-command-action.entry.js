import { r as registerInstance, e as createEvent } from './index-f583fcde.js';

const GuxCommandAction = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.press = createEvent(this, "press", 7);
    this.text = '';
    this.details = '';
    this.common = false;
    this.recent = false;
    this.shortcut = '';
  }
  /**
   * @internal
   * Invokes the pressed action on this component.
   */
  async invokePress() {
    this.press.emit();
  }
  render() {
    return '';
  }
};

export { GuxCommandAction as gux_command_action };
