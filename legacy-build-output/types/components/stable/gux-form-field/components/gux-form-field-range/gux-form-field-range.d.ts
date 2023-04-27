import { JSX } from '../../../../../stencil-public-runtime';
import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
export declare class GuxFormField {
  private input;
  private label;
  private disabledObserver;
  private requiredObserver;
  private progressElement;
  private sliderTooltip;
  private sliderTooltipContainer;
  private root;
  displayUnits: string;
  valueInTooltip: boolean;
  labelPosition: GuxFormFieldLabelPosition;
  private computedLabelPosition;
  private disabled;
  private required;
  private hasError;
  private hasHelp;
  private value;
  private active;
  private valueWatcherId;
  onInput(e: MouseEvent): void;
  onMousedown(): void;
  onMouseup(): void;
  onMutation(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
  private get variant();
  private setInput;
  private setLabel;
  private renderRangeInput;
  private updateValue;
  private updatePosition;
  private getDisplayValue;
}
