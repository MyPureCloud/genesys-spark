import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
import { GuxAccordionSectionArrowPosition, GuxAccordionSectionContentLayout } from './gux-accordion-section.types';
/**
 * @slot header - Required slot for the heading
 * @slot subheader - Optional slot for a subheader
 * * @slot icon - Optional slot for an icon
 */
export declare class GuxAccordionSection {
  private sectionId;
  private hasIconSlot;
  root: HTMLElement;
  /**
   * Position of the arrow chevron icon. Position can be 'default' or 'before-text'.  'beside-text' is deprecated and will be removed in v4.
   */
  arrowPosition: GuxAccordionSectionArrowPosition;
  /**
   * The content layout used in the accordion section. 'text' layout provides default padding, 'custom' removes default padding.
   */
  contentLayout: GuxAccordionSectionContentLayout;
  open: boolean;
  disabled: boolean;
  reverseHeadings: boolean;
  internalsectionopened: EventEmitter<void>;
  watchOpen(open: boolean): void;
  private toggle;
  private isArrowPositionBeforeText;
  private isArrowPositionedBesideText;
  private handleSlotChange;
  componentWillLoad(): void;
  render(): JSX.Element;
}
