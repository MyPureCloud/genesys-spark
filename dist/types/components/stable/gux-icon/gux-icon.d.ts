import { JSX } from '../../../stencil-public-runtime';
import { GuxIconIconName } from './gux-icon.types';
export declare class GuxIcon {
  private baseSvgHtml;
  private root;
  /**
   * Indicate which icon to display
   */
  iconName: string | GuxIconIconName;
  /**
   * Indicate whether the icon should be ignored by accessibility tools or not
   */
  decorative: boolean;
  /**
   * Localized text describing the intent of this icon (not required if `decorative=true`)
   */
  screenreaderText: string;
  private svgHtml;
  prepIcon(iconName: string): Promise<void>;
  watchDecorative(decorative: boolean): void;
  watchScreenreaderText(screenreaderText: string): void;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  private validateProps;
  private getSvgWithAriaAttributes;
  render(): JSX.Element;
}
