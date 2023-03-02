import { JSX } from '../../../../../stencil-public-runtime';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import { GuxFormFieldTextAreaResize } from './gux-form-field-textarea.types';
/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
export declare class GuxFormFieldTextarea {
  private input;
  private label;
  private disabledObserver;
  private requiredObserver;
  private textareaContainerElement;
  private root;
  resize: GuxFormFieldTextAreaResize;
  labelPosition: GuxFormFieldLabelPosition;
  private computedLabelPosition;
  private disabled;
  private required;
  private hasError;
  private hasHelp;
  onMutation(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
  private get variant();
  private setInput;
  private setLabel;
  private updateHeight;
}
