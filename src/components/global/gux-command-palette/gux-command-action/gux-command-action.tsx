import { Component, Event, EventEmitter, Method, Prop } from '@stencil/core';

@Component({ tag: 'gux-command-action' })
export class GuxCommandAction {
  /**
   * The textual value of the command.
   */
  @Prop()
  text: string = '';

  /**
   * Details about the command. This acts as extra contextual information about the command.
   */
  @Prop()
  details: string = '';

  /**
   * If the command is a common command. Common commands are choosen defaults a user might want to use.
   */
  @Prop()
  common: boolean = false;

  /**
   * If the command is a recent command. Recent commands are commands that the user has recently issued.
   */
  @Prop()
  recent: boolean = false;

  /**
   * The shortcut for the command. Textual representation of a shortcut associated with this command, if it exists.
   */
  @Prop()
  shortcut: string = '';

  /**
   * Emits when the list item is clicked, or enter/space is pressed.
   */
  @Event()
  press: EventEmitter<void>;

  /**
   * @internal
   * Invokes the pressed action on this component.
   */
  @Method()
  async invokePress() {
    this.press.emit();
  }

  render() {
    return '';
  }
}
