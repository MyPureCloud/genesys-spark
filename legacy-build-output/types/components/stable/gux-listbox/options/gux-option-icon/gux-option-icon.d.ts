import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot - text
 */
export declare class GuxOptionIcon {
  root: HTMLElement;
  value: string;
  iconName: string;
  iconSrText: string;
  iconColor: string;
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
