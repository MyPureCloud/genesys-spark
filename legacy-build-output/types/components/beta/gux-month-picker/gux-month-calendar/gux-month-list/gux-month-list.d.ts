import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot - month name
 */
export declare class GuxMonthList {
  root: HTMLElement;
  onKeyDown(event: KeyboardEvent): void;
  guxFocusFirstItem(): Promise<void>;
  private renderFocusTarget;
  render(): JSX.Element;
}
