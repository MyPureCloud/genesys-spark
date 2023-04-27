import { JSX } from '../../../../../../../stencil-public-runtime';
/**
 * @slot input - Required slot for input[type="color"]
 */
export declare class GuxColorSelect {
  private input;
  private root;
  private color;
  onColorSelect(event: MouseEvent): void;
  componentWillLoad(): void;
  render(): JSX.Element;
  private renderDefaultTiles;
}
