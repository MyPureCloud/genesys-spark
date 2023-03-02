import { JSX } from '../../../stencil-public-runtime';
/**
 * @slot - collection of gux-accordion-section elements
 */
export declare class GuxAccordion {
  root: HTMLElement;
  singleOpenSection: boolean;
  handleInternalsectionopened(event: CustomEvent): void;
  componentWillLoad(): void;
  private getAccordionSections;
  private closeSection;
  render(): JSX.Element;
}
