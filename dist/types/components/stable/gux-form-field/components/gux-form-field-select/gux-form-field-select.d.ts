import { JSX } from '../../../../../stencil-public-runtime';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
export declare class GuxFormFieldSelect {
  private input;
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
  onMutation(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
  private get variant();
  private setInput;
  private setLabel;
}
