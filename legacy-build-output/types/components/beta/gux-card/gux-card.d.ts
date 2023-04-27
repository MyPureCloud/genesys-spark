import { JSX } from '../../../stencil-public-runtime';
import { GuxCardAccent } from './gux-card.types';
/**
 * @slot - Content of card.
 */
export declare class GuxCard {
  root: HTMLElement;
  /**
   * Card Accent.
   */
  accent: GuxCardAccent;
  componentWillLoad(): void;
  render(): JSX.Element;
}
