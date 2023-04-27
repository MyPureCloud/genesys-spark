import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
export declare class GuxDropdownMultiTag {
  private i18n;
  root: HTMLElement;
  /**
   * Triggered when click on remove button
   */
  internalclearselected: EventEmitter<string>;
  /**
   * Tag is removable.
   */
  disabled: boolean;
  numberSelected: number;
  label: string;
  onKeyDown(event: KeyboardEvent): void;
  private removeTag;
  private renderRemoveButton;
  componentWillRender(): Promise<void>;
  render(): JSX.Element;
}
