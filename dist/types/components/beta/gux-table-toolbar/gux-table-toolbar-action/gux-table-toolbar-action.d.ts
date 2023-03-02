import { JSX } from '../../../../stencil-public-runtime';
import { GuxTableToolbarActionTypes } from './gux-table-toolbar-action.types';
import { GuxTableToolbarActionAccent } from '../gux-table-toolbar-action-accents.types';
export declare class GuxTableToolbarAction {
  private i18n;
  root: HTMLElement;
  action: GuxTableToolbarActionTypes;
  accent: GuxTableToolbarActionAccent;
  iconOnly: boolean;
  disabled: boolean;
  private returnActionLocale;
  private returnActionTypeIcon;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}
