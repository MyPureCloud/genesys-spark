import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot input - Required slot for input[type="text" | type="email" | type="password"]
 */
export declare class GuxInputTextLike {
  private input;
  private getI18nValue;
  private disabledObserver;
  private root;
  clearable: boolean;
  private hasContent;
  private disabled;
  private clearInput;
  private setHasContent;
  private renderClearButton;
  componentWillLoad(): Promise<void>;
  disconnectedCallback(): void;
  render(): JSX.Element;
}
