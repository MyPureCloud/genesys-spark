import { JSX } from '../../../stencil-public-runtime';
import { GuxButtonAccent } from '../../stable/gux-button/gux-button.types';
/**
 * @slot - button, input[type="button"] or input[type="submit"] element
 */
export declare class GuxButtonSlot {
  root: HTMLElement;
  accent: GuxButtonAccent;
  private validateSlotContent;
  componentWillLoad(): void;
  render(): JSX.Element;
}
