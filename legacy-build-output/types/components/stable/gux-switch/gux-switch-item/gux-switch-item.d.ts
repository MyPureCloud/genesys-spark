import { JSX } from '../../../../stencil-public-runtime';
/**
 * @slot - text
 */
export declare class GuxSwitchItem {
  value: string;
  selected: boolean;
  disabled: boolean;
  onClick(e: MouseEvent): void;
  render(): JSX.Element;
}
