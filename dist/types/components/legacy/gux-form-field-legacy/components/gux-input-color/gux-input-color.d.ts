import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot input - Required slot for input[type="color"]
 */
export declare class GuxInputColor {
  private input;
  private disabledObserver;
  private i18n;
  private requiredId;
  private root;
  guxLabelDescribedby: string;
  guxErrorDescribedby: string;
  guxRequired: boolean;
  private disabled;
  private color;
  private opened;
  private colorOnOpen;
  onClick(e: MouseEvent): void;
  onInput(e: MouseEvent): void;
  componentWillLoad(): Promise<void>;
  disconnectedCallback(): void;
  render(): JSX.Element;
  private setOpened;
  private clickHandler;
}
