import { JSX } from '../../../stencil-public-runtime';
import { GuxAccordionLegacyArrowPosition, IGuxAccordionLegacySection } from './gux-accordion.types';
export declare class GuxAccordionLegacy {
  root: HTMLElement;
  sections: IGuxAccordionLegacySection[];
  /**
   * The heading level within the page the
   * accordion section headers should be set to.
   * heading-level="3" woudl be equivalent to an
   * h3 element.
   */
  headingLevel: number;
  arrowPosition: GuxAccordionLegacyArrowPosition;
  /**
   * Opens a section.
   * @param slotName The slot name
   */
  open(slotName: string): Promise<void>;
  /**
   * Closes a section.
   * @param slotName The slot name
   */
  close(slotName: string): Promise<void>;
  /**
   * Toggles a section.
   * @param slotName The slot name
   */
  toggle(slotName: string): Promise<void>;
  componentWillLoad(): void;
  render(): JSX.Element;
}
