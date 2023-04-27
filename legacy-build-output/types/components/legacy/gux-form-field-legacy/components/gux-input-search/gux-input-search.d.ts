import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot default - slot for input[type="search"]
 */
export declare class GuxInputSearch {
  private input;
  private getI18nValue;
  private disabledObserver;
  private root;
  private hasContent;
  private disabled;
  private clearInput;
  private setHasContent;
  private renderSearchIcon;
  private renderClearButton;
  componentWillLoad(): Promise<void>;
  disconnectedCallback(): void;
  render(): JSX.Element;
}
