import { JSX } from '../../../stencil-public-runtime';
import { GuxTextHighlightStrategy } from './gux-text-highlight.types';
export declare class GuxTextHighlight {
  private root;
  /**
   * The value to display.
   */
  text: string;
  /**
   * The text to highlight.
   */
  highlight: string;
  /**
   * The way the text should be highlighted.
   */
  strategy: GuxTextHighlightStrategy;
  componentWillLoad(): void;
  render(): JSX.Element;
  private renderStartsWith;
  private renderContains;
  private renderFuzzy;
}
