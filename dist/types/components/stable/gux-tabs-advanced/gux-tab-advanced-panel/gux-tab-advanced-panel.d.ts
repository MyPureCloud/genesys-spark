import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
/**
 * @slot - content
 */
export declare class GuxTabAdvancedPanel {
  tabId: string;
  active: boolean;
  guxSetActive(active: boolean): Promise<void>;
  guxactivepanelchange: EventEmitter<string>;
  watchActivePanel(): void;
  render(): JSX.Element;
}
