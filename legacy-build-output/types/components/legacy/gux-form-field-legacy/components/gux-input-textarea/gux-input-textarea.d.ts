import { JSX } from '../../../../../stencil-public-runtime';
import { GuxInputTextAreaResize } from './gux-input-textarea.types';
/**
 * @slot input - Required slot for textarea
 */
export declare class GuxInputTextArea {
  private input;
  private containerElement;
  private root;
  resize: GuxInputTextAreaResize;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private updateHeight;
  render(): JSX.Element;
}
