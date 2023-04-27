import { JSX } from '../../../stencil-public-runtime';
import { GuxAnnouncePoliteness } from './gux-announce.types';
/**
 * @slot - element
 */
export declare class GuxAnnounce {
  private containerElement;
  root: HTMLElement;
  politeness: GuxAnnouncePoliteness;
  guxAnnounce(text: string): Promise<void>;
  componentWillLoad(): void;
  render(): JSX.Element;
}
