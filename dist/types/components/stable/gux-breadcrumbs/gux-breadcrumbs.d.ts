import { JSX } from '../../../stencil-public-runtime';
import { GuxBreadcrumbAccent } from './gux-breadcrumbs.types';
/**
 * @slot - collection of gux-breadcrumb-item elements
 */
export declare class GuxBreadcrumbs {
  private i18n;
  private root;
  accent: GuxBreadcrumbAccent;
  componentWillLoad(): void;
  componentWillRender(): Promise<void>;
  private onSlotChange;
  render(): JSX.Element;
}
