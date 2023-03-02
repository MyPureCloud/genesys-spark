import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
export declare class GuxRowSelect {
  root: HTMLElement;
  private id;
  private i18n;
  selected: boolean;
  disabled: boolean;
  internalrowselectchange: EventEmitter;
  onCheck(event: CustomEvent): void;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}
