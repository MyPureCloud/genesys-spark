import { JSX } from '../../../../stencil-public-runtime';
import { GuxTableToolbarActionAccent } from '../gux-table-toolbar-action-accents.types';
/**
 * @slot text - Slot for action text.
 * @slot icon - Slot for icon.
 */
export declare class GuxTableToolbarCustomAction {
  root: HTMLElement;
  iconOnly: boolean;
  accent: GuxTableToolbarActionAccent;
  disabled: boolean;
  componentWillLoad(): void;
  render(): JSX.Element;
}
