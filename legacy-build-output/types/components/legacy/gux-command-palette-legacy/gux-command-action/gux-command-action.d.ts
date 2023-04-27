import { EventEmitter } from '../../../../stencil-public-runtime';
export declare class GuxCommandAction {
  /**
   * The textual value of the command.
   */
  text: string;
  /**
   * Details about the command. This acts as extra contextual information about the command.
   */
  details: string;
  /**
   * If the command is a common command. Common commands are choosen defaults a user might want to use.
   */
  common: boolean;
  /**
   * If the command is a recent command. Recent commands are commands that the user has recently issued.
   */
  recent: boolean;
  /**
   * The shortcut for the command. Textual representation of a shortcut associated with this command, if it exists.
   */
  shortcut: string;
  /**
   * Emits when the list item is clicked, or enter/space is pressed.
   */
  press: EventEmitter<void>;
  /**
   * @internal
   * Invokes the pressed action on this component.
   */
  invokePress(): Promise<void>;
  render(): string;
}
