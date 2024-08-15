import {
  Component,
  Event,
  EventEmitter,
  h,
  Element,
  Prop
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxSideSheetSize } from './gux-side-sheet.types';
import { hasSlot } from '@utils/dom/has-slot';

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

  @Event()
  sidesheetdismiss: EventEmitter<void>;

  private onDismissHandler(): void {
    this.sidesheetdismiss.emit();
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div class={`gux-side-sheet gux-side-sheet-${this.size}`}>
        <header>
          <slot name="heading" />
          <gux-dismiss-button onClick={this.onDismissHandler.bind(this)} />
        </header>
        {hasSlot(this.root, 'description') && (
          <div class="gux-side-sheet-description">
            <slot name="description" />
          </div>
        )}
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
