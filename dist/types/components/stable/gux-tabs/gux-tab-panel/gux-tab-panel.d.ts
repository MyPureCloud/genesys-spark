import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
/**
 * @slot - content
 */
export declare class GuxTabPanel {
  /**
   * Tab id of the tab that is associated with the panel
   */
  tabId: string;
  active: boolean;
  guxSetActive(active: boolean): Promise<void>;
  /**
   * Triggers when the active panel changes
   */
  guxactivepanelchange: EventEmitter<string>;
  watchActivePanel(): void;
  render(): JSX.Element;
}
