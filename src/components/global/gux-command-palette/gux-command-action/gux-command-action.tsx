import { Component, Event, EventEmitter, Method, Prop } from '@stencil/core';

@Component({ tag: 'gux-command-action' })
export class GuxCommandAction {
  /**
   * The textual value of the command.
   */
  @Prop()
  text: string;

  /**
   * Details about the command.
   */
  @Prop()
  details: string;

  /**
   * If the command is a common command.
   */
  @Prop()
  common: boolean;

  /**
   * If the command is a recent command.
   */
  @Prop()
  recent: boolean;

  /**
   * The shortcut for the command.
   */
  @Prop()
  shortcut: string;

  /**
   * Emits when the list item is clicked, or enter/space is pressed.
   */
  @Event()
  action: EventEmitter<void>;

  @Method()
  async invokeAction() {
    this.action.emit();
  }

  render() {
    return '';
  }
}
