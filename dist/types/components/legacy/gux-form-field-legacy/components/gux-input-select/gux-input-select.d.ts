import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot input - Required slot for select element
 */
export declare class GuxInputSelect {
  private input;
  private disabledObserver;
  private root;
  private disabled;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
}
