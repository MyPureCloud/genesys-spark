import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot input - Required slot for input[type="radio"]
 */
export declare class GuxInputNumber {
  private input;
  private getI18nValue;
  private disabledObserver;
  private root;
  clearable: boolean;
  private hasContent;
  private disabled;
  private clearInput;
  private setHasContent;
  private simulateNativeInputAndChangeEvents;
  private stepUp;
  private stepDown;
  private renderClearButton;
  private renderStepButtons;
  componentWillLoad(): Promise<void>;
  disconnectedCallback(): void;
  render(): JSX.Element;
}
