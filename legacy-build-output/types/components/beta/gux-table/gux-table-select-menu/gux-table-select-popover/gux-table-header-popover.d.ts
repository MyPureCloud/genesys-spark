import { EventEmitter, JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot - popover content
 */
export declare class GuxTableSelectPopover {
  private popperInstance;
  private hiddenObserver;
  private popupElement;
  private root;
  /**
   * Indicates the id of the element the popover should anchor to
   */
  for: string;
  /**
   * Close popover when the user clicks outside of its bounds
   */
  closeOnClickOutside: boolean;
  /**
   * Fired when a user dismisses the popover
   */
  guxdismiss: EventEmitter<void>;
  hidden: boolean;
  hiddenHandler(hidden: boolean): void;
  checkForClickOutside(event: MouseEvent): void;
  private runPopper;
  private destroyPopper;
  private dismiss;
  connectedCallback(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
}
