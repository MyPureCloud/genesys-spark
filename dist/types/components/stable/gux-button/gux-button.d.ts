import { JSX } from '../../../stencil-public-runtime';
import { GuxButtonAccent, GuxButtonType } from './gux-button.types';
/**
 * @slot - content
 */
export declare class GuxButton {
  private root;
  /**
   * The component button type
   */
  type: GuxButtonType;
  /**
   * The component title
   */
  guxTitle: string;
  /**
   * Indicate if the button is disabled or not
   */
  disabled: boolean;
  accent: GuxButtonAccent;
  componentWillLoad(): void;
  render(): JSX.Element;
  private makeSlotContentDisableable;
}
