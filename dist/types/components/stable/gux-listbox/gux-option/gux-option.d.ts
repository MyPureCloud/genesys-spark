import { JSX } from '../../../../stencil-public-runtime';
/**
 * @slot - text
 */
export declare class GuxOption {
  root: HTMLElement;
  value: string;
  active: boolean;
  selected: boolean;
  disabled: boolean;
  filtered: boolean;
  hovered: boolean;
  onmouseenter(): void;
  onMouseleave(): void;
  componentWillLoad(): void;
  private getAriaSelected;
  render(): JSX.Element;
}
