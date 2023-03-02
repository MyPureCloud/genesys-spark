import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxTagColor } from './gux-tag.types';
/**
 * @slot - content
 */
export declare class GuxTag {
  private i18n;
  root: HTMLElement;
  /**
   * Triggered when click on remove button
   */
  guxdelete: EventEmitter<string>;
  /**
   * Tag background color.
   */
  color: GuxTagColor;
  /**
   * Index for remove tag
   */
  value: string;
  /**
   * Tag is removable.
   */
  disabled: boolean;
  /**
   * Tag is removable.
   */
  removable: boolean;
  label: string;
  onKeyDown(event: KeyboardEvent): void;
  private removeTag;
  private onSlotChange;
  private renderTagTitle;
  private renderSrText;
  private renderRemoveButton;
  componentWillLoad(): void;
  componentWillRender(): Promise<void>;
  render(): JSX.Element;
}
