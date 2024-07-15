import { Component, h, Element, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxSideSheetSize } from './gux-side-sheet.types';

@Component({
  tag: 'gux-side-sheet-beta',
  styleUrl: 'gux-side-sheet.scss',
  shadow: true
})
export class GuxSideSheet {
  @Element()
  private root: HTMLElement;

  @Prop()
  size: GuxSideSheetSize = 'small';

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div class={`gux-side-sheet gux-side-sheet-${this.size}`}>
        <header>
          <div class="gux-side-sheet-icon">
            <slot name="icon" />
          </div>
          <slot name="heading" />
          <gux-dismiss-button />
        </header>
        <div class="gux-side-sheet-content">
          <slot name="content" />
        </div>
        <footer>
          <slot name="footer" />
        </footer>
      </div>
    ) as JSX.Element;
  }
}
