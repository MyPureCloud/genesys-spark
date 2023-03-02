import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
export declare class GuxCreateOption {
  private i18n;
  root: HTMLElement;
  value: string;
  active: boolean;
  hidden: boolean;
  filtered: boolean;
  hovered: boolean;
  onmouseenter(): void;
  onMouseleave(): void;
  internalcreatenewoption: EventEmitter<string>;
  guxEmitInternalCreateNewOption(): Promise<void>;
  handleClick(): void;
  componentWillLoad(): Promise<void>;
  renderCustomOptionInstructions(): JSX.Element;
  render(): JSX.Element;
}
