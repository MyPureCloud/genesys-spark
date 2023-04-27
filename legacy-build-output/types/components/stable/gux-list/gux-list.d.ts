import { JSX } from '../../../stencil-public-runtime';
export declare class GuxList {
  root: HTMLElement;
  componentWillLoad(): void;
  onKeyDown(event: KeyboardEvent): void;
  guxFocusFirstItem(): Promise<void>;
  guxFocusItemById(id: string): Promise<void>;
  guxFocusItemByClosestId(id: string): Promise<void>;
  guxFocusLastItem(): Promise<void>;
  private renderFocusTarget;
  render(): JSX.Element;
}
