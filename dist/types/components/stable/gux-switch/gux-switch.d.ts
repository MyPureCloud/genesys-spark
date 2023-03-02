import { JSX } from '../../../stencil-public-runtime';
import { GuxSwitchAllowedLayouts } from './gux-switch.types';
/**
 * @slot - list of gux-switch-item elements
 */
export declare class GuxSwitch {
  root: HTMLElement;
  value: string;
  layout: GuxSwitchAllowedLayouts;
  switchItems: HTMLGuxSwitchItemElement[];
  onClick(e: MouseEvent): void;
  private slotChanged;
  componentWillLoad(): void;
  componentWillRender(): void;
  render(): JSX.Element;
}
