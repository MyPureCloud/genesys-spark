import { JSX } from '../../../stencil-public-runtime';
export declare class GuxSidePanel {
  private root;
  /**
   * Open or close the content
   */
  isOpen: boolean;
  /**
   * The position of the side panel
   */
  position: 'left' | 'right';
  get containerClass(): string;
  get contentClass(): string;
  componentWillLoad(): void;
  render(): JSX.Element;
}
