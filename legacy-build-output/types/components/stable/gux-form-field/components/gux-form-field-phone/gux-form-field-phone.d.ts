import { EventEmitter, JSX } from '../../../../../stencil-public-runtime';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
/**
 * @slot - Required slot for gux-phone-input-beta tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
export declare class GuxFormFieldPhone {
  private getI18nValue;
  private phoneInputElement;
  private label;
  private disabledObserver;
  private requiredObserver;
  private root;
  labelPosition: GuxFormFieldLabelPosition;
  private computedLabelPosition;
  private disabled;
  private required;
  private hasError;
  private hasInternalError;
  private hasHelp;
  phonevalidationerror: EventEmitter<boolean>;
  listenForInternalError(event: CustomEvent): void;
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
