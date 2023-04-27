'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');

const GuxCommandAction = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.press = index.createEvent(this, "press", 7);
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

exports.gux_command_action = GuxCommandAction;
