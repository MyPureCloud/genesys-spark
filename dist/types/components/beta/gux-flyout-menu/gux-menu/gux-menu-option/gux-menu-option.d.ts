import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot - text
 */
export declare class GuxMenuOption {
  private buttonElement;
  private root;
  /**
   * Focus on the components button element
   */
  guxFocus(): Promise<void>;
  onKeydown(event: KeyboardEvent): void;
  render(): JSX.Element;
}
