import { JSX } from '../../../stencil-public-runtime';
import { GuxDismissButtonPosition } from './gux-dismiss-button.types';
export declare class GuxDismissButton {
  private i18n;
  private root;
  position: GuxDismissButtonPosition;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}
