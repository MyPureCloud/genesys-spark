import { JSX } from '../../../../../stencil-public-runtime';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 * @part input-section - Style input container
 */
export declare class GuxFormFieldNumber {
  private getI18nValue;
  private input;
  private label;
  private disabledObserver;
  private requiredObserver;
  private root;
  clearable: boolean;
  labelPosition: GuxFormFieldLabelPosition;
  private computedLabelPosition;
  private disabled;
  private required;
  private hasContent;
  private hasError;
  private hasHelp;
  onMutation(): void;
  guxForceUpdate(): Promise<void>;
  componentWillLoad(): Promise<void>;
  disconnectedCallback(): void;
  render(): JSX.Element;
  private get variant();
  private setInput;
  private setLabel;
  private renderStepButtons;
  private stepDown;
  private stepUp;
  private simulateNativeInputAndChangeEvents;
}
