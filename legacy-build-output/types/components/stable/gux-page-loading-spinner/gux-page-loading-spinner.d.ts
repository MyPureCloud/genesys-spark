import { JSX } from '../../../stencil-public-runtime';
export declare class GuxPageLoadingSpinner {
  private root;
  /**
   * Localized text to provide an accessible label for the component.
   * If no screenreader text is provided, the localized string "Loading" will be used by default
   */
  screenreaderText: string;
  componentWillLoad(): void;
  render(): JSX.Element;
}
