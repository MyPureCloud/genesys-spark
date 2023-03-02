import { JSX } from '../../../stencil-public-runtime';
/**
 * @slot header - slot for header content
 * @slot body - slot for body content
 * @slot footer - slot for footer content
 */
export declare class GuxPanelFrame {
  root: HTMLElement;
  componentWillLoad(): void;
  private renderOptionalSlot;
  render(): JSX.Element;
}
