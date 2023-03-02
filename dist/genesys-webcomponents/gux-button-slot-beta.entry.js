import { r as registerInstance, h, j as Host, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { l as logError } from './log-error-3d08c2b1.js';

const guxButtonSlotCss = ":host{display:inline-block;min-width:32px;pointer-events:none}::slotted(input[type='button']),::slotted(input[type='submit']),::slotted(button){width:100%;height:32px;padding:0 16px;overflow:hidden;color:#2e394c;text-overflow:ellipsis;white-space:nowrap;pointer-events:auto;cursor:pointer;background-color:#e2e6ee;border:none;border-radius:4px;font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700}::slotted(input[type='button'][disabled]),::slotted(input[type='submit'][disabled]),::slotted(button[disabled]){color:rgba(46, 57, 76, 0.5);cursor:default;background-color:rgba(226, 230, 238, 0.5)}::slotted(input[type='button']:focus),::slotted(input[type='submit']:focus),::slotted(button:focus){outline:none}::slotted(input[type='button']:focus:enabled),::slotted(input[type='submit']:focus:enabled),::slotted(button:focus:enabled){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}::slotted(input[type='button']:hover:enabled),::slotted(input[type='submit']:hover:enabled),::slotted(button:hover:enabled){background-color:#d7dce5}::slotted(input[type='button']:active:enabled),::slotted(input[type='submit']:active:enabled),::slotted(button:active:enabled){background-color:#c8cfda}:host([accent='primary']) ::slotted(input[type='button']),:host([accent='primary']) ::slotted(input[type='submit']),:host([accent='primary']) ::slotted(button){color:#fdfdfd;background-color:#2a60c8}:host([accent='primary']) ::slotted(input[type='button'][disabled]),:host([accent='primary']) ::slotted(input[type='submit'][disabled]),:host([accent='primary']) ::slotted(button[disabled]){color:rgba(253, 253, 253, 0.5);background-color:rgba(42, 96, 200, 0.5)}:host([accent='primary']) ::slotted(input[type='button']:hover:enabled),:host([accent='primary']) ::slotted(input[type='submit']:hover:enabled),:host([accent='primary']) ::slotted(button:hover:enabled){background-color:#2754ac}:host([accent='primary']) ::slotted(input[type='button']:active:enabled),:host([accent='primary']) ::slotted(input[type='submit']:active:enabled),:host([accent='primary']) ::slotted(button:active:enabled){background-color:#23478f}:host([accent='tertiary']) ::slotted(input[type='button']),:host([accent='tertiary']) ::slotted(input[type='submit']),:host([accent='tertiary']) ::slotted(button){color:#2a60c8;background-color:#fdfdfd;border:1px solid #2a60c8}:host([accent='tertiary']) ::slotted(input[type='button']),:host([accent='tertiary']) ::slotted(input[type='submit']),:host([accent='tertiary']) ::slotted(button){color:#2a60c8;background-color:#fdfdfd;border:1px solid #2a60c8}:host([accent='tertiary']) ::slotted(input[type='button'][disabled]),:host([accent='tertiary']) ::slotted(input[type='submit'][disabled]),:host([accent='tertiary']) ::slotted(button[disabled]){color:rgba(42, 96, 200, 0.5);background-color:rgba(253, 253, 253, 0.5);border-color:rgba(42, 96, 200, 0.5)}:host([accent='tertiary']) ::slotted(input[type='button']:hover:enabled),:host([accent='tertiary']) ::slotted(input[type='submit']:hover:enabled),:host([accent='tertiary']) ::slotted(button:hover:enabled){color:#fdfdfd;background-color:#2754ac}:host([accent='tertiary']) ::slotted(input[type='button']:active:enabled),:host([accent='tertiary']) ::slotted(input[type='submit']:active:enabled),:host([accent='tertiary']) ::slotted(button:active:enabled){color:#fdfdfd;background-color:#23478f}:host([accent='ghost']) ::slotted(input[type='button']),:host([accent='ghost']) ::slotted(input[type='submit']),:host([accent='ghost']) ::slotted(button){color:#2a60c8;background:none;border:none}:host([accent='ghost']) ::slotted(input[type='button'][disabled]),:host([accent='ghost']) ::slotted(input[type='submit'][disabled]),:host([accent='ghost']) ::slotted(button[disabled]){color:rgba(42, 96, 200, 0.5)}:host([accent='ghost']) ::slotted(input[type='button']:hover:enabled),:host([accent='ghost']) ::slotted(input[type='submit']:hover:enabled),:host([accent='ghost']) ::slotted(button:hover:enabled){color:#2754ac;background-color:rgba(222, 234, 255, 0.33)}:host([accent='ghost']) ::slotted(input[type='button']:active:enabled),:host([accent='ghost']) ::slotted(input[type='submit']:active:enabled),:host([accent='ghost']) ::slotted(button:active:enabled){color:#2754ac;background-color:#deeaff}:host([accent='danger']) ::slotted(input[type='button']),:host([accent='danger']) ::slotted(input[type='submit']),:host([accent='danger']) ::slotted(button){color:#fdfdfd;background-color:#ea0b0b}:host([accent='danger']) ::slotted(input[type='button'][disabled]),:host([accent='danger']) ::slotted(input[type='submit'][disabled]),:host([accent='danger']) ::slotted(button[disabled]){color:rgba(253, 253, 253, 0.5);background-color:rgba(234, 11, 11, 0.5)}:host([accent='danger']) ::slotted(input[type='button']:hover:enabled),:host([accent='danger']) ::slotted(input[type='submit']:hover:enabled),:host([accent='danger']) ::slotted(button:hover:enabled){background-color:#cc0a0a}:host([accent='danger']) ::slotted(input[type='button']:active:enabled),:host([accent='danger']) ::slotted(input[type='submit']:active:enabled),:host([accent='danger']) ::slotted(button:active:enabled){background-color:#ad0808}:host([accent='inline']){min-width:initial}:host([accent='inline']) ::slotted(input[type='button']),:host([accent='inline']) ::slotted(input[type='submit']),:host([accent='inline']) ::slotted(button){height:initial;padding:0 0;color:#2a60c8;background:none;border:none;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px;text-decoration:underline}:host([accent='inline']) ::slotted(input[type='button'][disabled]),:host([accent='inline']) ::slotted(input[type='submit'][disabled]),:host([accent='inline']) ::slotted(button[disabled]){color:rgba(42, 96, 200, 0.5)}:host([accent='inline']) ::slotted(input[type='button']:hover:enabled),:host([accent='inline']) ::slotted(input[type='submit']:hover:enabled),:host([accent='inline']) ::slotted(button:hover:enabled){color:#2754ac;background-color:rgba(222, 234, 255, 0.33)}:host([accent='inline']) ::slotted(input[type='button']:active:enabled),:host([accent='inline']) ::slotted(input[type='submit']:active:enabled),:host([accent='inline']) ::slotted(button:active:enabled){color:#2754ac;background-color:#deeaff}";

const GuxButtonSlot = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.accent = 'secondary';
  }
  validateSlotContent() {
    let slottedElement = this.root.children[0];
    let slottedTagName = slottedElement.tagName;
    if (slottedTagName === 'SLOT') {
      slottedElement = slottedElement.assignedNodes()[0];
      slottedTagName = slottedElement.tagName;
    }
    if (slottedTagName === 'BUTTON') {
      return;
    }
    else if (slottedTagName === 'INPUT') {
      const slottedType = slottedElement.getAttribute('type');
      if (slottedType === 'button' || slottedType === 'submit') {
        return;
      }
    }
    logError('gux-button-slot', 'You must slot a button, input[type="button"] or input[type="submit"] element.');
  }
  componentWillLoad() {
    trackComponent(this.root);
    this.validateSlotContent();
  }
  render() {
    return (h(Host, { accent: this.accent }, h("slot", null)));
  }
  get root() { return getElement(this); }
};
GuxButtonSlot.style = guxButtonSlotCss;

export { GuxButtonSlot as gux_button_slot_beta };
