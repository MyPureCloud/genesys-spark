import { JSX } from '../../../stencil-public-runtime';
export declare class GuxRating {
  private starContainer;
  root: HTMLElement;
  value: number;
  maxValue: number;
  disabled: boolean;
  readonly: boolean;
  onClick(event: MouseEvent): void;
  onKeyDown(event: KeyboardEvent): void;
  private updateRatingValue;
  private getRatingStarElements;
  private getTabIndex;
  componentWillLoad(): void;
  componentDidLoad(): void;
  render(): JSX.Element;
}
