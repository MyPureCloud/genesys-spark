import { JSX } from '../../../../../stencil-public-runtime';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
/**
 * @slot Required slot for gux-time-picker-beta tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
export declare class GuxFormFieldTimePicker {
  private getI18nValue;
  private timePickerElement;
  private label;
  private disabledObserver;
  private requiredObserver;
  private root;
  labelPosition: GuxFormFieldLabelPosition;
  private computedLabelPosition;
  private disabled;
  private required;
  private hasError;
  private hasHelp;
  watchValue(hasError: boolean): void;
  onMutation(): void;
  componentWillLoad(): Promise<void>;
  disconnectedCallback(): void;
  render(): JSX.Element;
  private renderScreenReaderText;
  private get variant();
  private setInput;
  private setLabel;
}
