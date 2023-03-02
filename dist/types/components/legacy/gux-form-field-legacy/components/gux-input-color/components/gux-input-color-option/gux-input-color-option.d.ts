import { JSX } from '../../../../../../../stencil-public-runtime';
export declare class GuxInputColorOption {
  /**
   * Indicate if the tile is active
   */
  active: boolean;
  /**
   * Indicate the color of the tile, if undefined, tile will be blank and be disabled
   */
  value: string;
  /**
   * Triggers when a color is selected
   */
  private colorSelect;
  render(): JSX.Element;
  private onColorOptionClickHandler;
}
