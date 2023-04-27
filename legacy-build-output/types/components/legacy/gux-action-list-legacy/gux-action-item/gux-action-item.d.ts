import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
export declare class GuxActionItem {
  text: string;
  value: unknown;
  disabled: boolean;
  press: EventEmitter<unknown>;
  handleClick(): void;
  onKeydown(event: KeyboardEvent): void;
  onKeyup(event: KeyboardEvent): void;
  private onItemClicked;
  render(): JSX.Element;
}
