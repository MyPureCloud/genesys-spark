import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxDisclosureButtonPosition } from './gux-disclosure-button.types';
/**
 * @slot panel-content - Slot for content of panel
 */
export declare class GuxDisclosureButton {
  private i18n;
  private panelId;
  private root;
  /**
   * Indicates the position of the button panel
   */
  position: GuxDisclosureButtonPosition;
  /**
   * Indicates the label for the disclosure button
   */
  label: string;
  /**
   * Used to open or close the disclosure panel
   */
  isOpen: boolean;
  /**
   * Indicated image used by button
   */
  icon: string;
  /**
   * Return the state of the components panel on state change
   * @return the panel state
   */
  active: EventEmitter<boolean>;
  watchIsOpen(): void;
  changeState(): void;
  togglePanel(): void;
  updateIcon(): void;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}
