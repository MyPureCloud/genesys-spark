import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot input - Required slot for input[type="range"]
 */
export declare class GuxInputRange {
  private input;
  private progressElement;
  private disabledObserver;
  private root;
  displayUnits: string;
  private disabled;
  private value;
  private active;
  private valueWatcherId;
  valueInTooltip: boolean;
  sliderTooltip: HTMLElement;
  sliderTooltipContainer: HTMLElement;
  onInput(e: MouseEvent): void;
  onMousedown(): void;
  onMouseup(): void;
  private updateValue;
  private updatePosition;
  private getDisplayValue;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
}
