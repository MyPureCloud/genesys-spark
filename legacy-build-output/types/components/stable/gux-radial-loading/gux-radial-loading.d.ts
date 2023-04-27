import { JSX } from '../../../stencil-public-runtime';
import { GuxRadialLoadingContext } from './gux-radial-loading.types';
export declare class GuxRadialLoading {
  private getI18nValue;
  private root;
  /**
   * The display context the component is in.
   */
  context: GuxRadialLoadingContext;
  /**
   * Localized text to provide an accessible label for the component.
   * If no screenreader text is provided, the localized string "Loading" will be used by default.
   */
  screenreaderText: string;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}
