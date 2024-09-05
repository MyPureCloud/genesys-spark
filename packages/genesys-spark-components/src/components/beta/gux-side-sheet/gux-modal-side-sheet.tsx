import {
  Component,
  Element,
  h,
  Listen,
  Method,
  Prop,
  Watch
} from '@stencil/core';
import { GuxSideSheetSize } from './gux-side-sheet.types';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { hasSlot } from '@utils/dom/has-slot';
import { trackComponent } from '@utils/tracking/usage';

@Component({
  tag: 'gux-modal-side-sheet-beta',
  styleUrl: './gux-modal-side-sheet.scss',
  shadow: true
})
export class GuxSideSheetHeading {
  private dialogElement: HTMLDialogElement;

  @Element()
  private root: HTMLElement;

  @Prop({ mutable: true })
  open: boolean = false;

  @Prop()
  size: GuxSideSheetSize = 'medium';

  @Watch('open')
  private syncOpenState() {
    if (this.open) {
      this.dialogElement.showModal();
    } else {
      this.dialogElement.close();
    }
  }

  @Listen('sideSheetDismiss')
  sidesheetdismissHandler(): void {
    this.open = false;
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.sidesheetdismissHandler();
        return;
    }
  }

  @Method()
  showModal(): void {
    this.open = true;
  }

  @Method()
  close(): void {
    this.open = false;
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    this.syncOpenState();
  }

  render(): JSX.Element {
    const titleID: string = randomHTMLId();
    return (
      <dialog ref={el => (this.dialogElement = el)} aria-labelledby={titleID}>
        <gux-side-sheet-beta size={this.size}>
          <div slot="heading" id={titleID}>
            <slot name="heading" />
          </div>
          {hasSlot(this.root, 'description') && (
            <div slot="description">
              <slot name="description" />
            </div>
          )}
          <div slot="content">
            <slot name="content" />
          </div>
          <div slot="footer">
            <slot name="footer" />
          </div>
        </gux-side-sheet-beta>
      </dialog>
    ) as JSX.Element;
  }
}
