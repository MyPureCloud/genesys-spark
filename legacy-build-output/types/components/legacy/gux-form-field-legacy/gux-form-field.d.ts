import { JSX } from '../../../stencil-public-runtime';
import { GuxInputTextAreaResize } from './components/gux-input-textarea/gux-input-textarea.types';
import { GuxFormFieldLabelPosition } from './gux-form-field.types';
/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 */
export declare class GuxFormFieldLegacy {
  private input;
  private label;
  private requiredObserver;
  private errorId;
  private labelId;
  private defaultInputId;
  private root;
  clearable: boolean;
  resize: GuxInputTextAreaResize;
  displayUnits: string;
  valueInTooltip: boolean;
  labelPosition: GuxFormFieldLabelPosition;
  private slottedElementType;
  private computedLabelPosition;
  private required;
  private hasError;
  onMutation(): void;
  componentWillLoad(): void;
  componentWillRender(): void;
  disconnectedCallback(): void;
  private renderInputCheckbox;
  private renderInputRadio;
  private renderInputColor;
  private renderInputRange;
  private renderInputNumber;
  private renderInputSelect;
  private renderInputTextLike;
  private renderInputSearch;
  private renderInputTextArea;
  render(): JSX.Element;
  private validateFormIds;
  private getComputedLabelPosition;
  private hasErrorSlot;
  private renderLabel;
  private renderError;
}
