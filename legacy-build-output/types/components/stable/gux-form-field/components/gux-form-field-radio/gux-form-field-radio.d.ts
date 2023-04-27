import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
export declare class GuxFormFieldRadio {
  private input;
  private disabledObserver;
  private root;
  private disabled;
  private hasError;
  private hasHelp;
  onMutation(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
  private setInput;
}
