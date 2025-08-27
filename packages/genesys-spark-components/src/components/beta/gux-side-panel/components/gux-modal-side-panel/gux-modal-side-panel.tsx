import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  Watch
} from '@stencil/core';
import { GuxSidePanelSize } from '../../gux-side-panel.types';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot header - The header of the side panel
 * @slot description - Optional description of the side panel
 * @slot content - The content of the side panel
 * @slot footer - The footer of the side panel
 */

@Component({
  tag: 'gux-modal-side-panel-beta',
  styleUrl: 'gux-modal-side-panel.scss',
  shadow: true
})
export class GuxModalSidePanel {
  @Element()
  private root: HTMLElement;

  @Prop({ mutable: true })
  open: boolean = false;

  @Prop()
  size: GuxSidePanelSize = 'medium';

  private dialogElement: HTMLDialogElement | null = null;
  @Watch('open')
  syncOpenState() {
    if (this.open) {
      this.dialogElement.showModal();
    } else {
      this.dialogElement.close();
      this.modalSidePanelDismiss.emit();
    }
  }

  @Event()
  modalSidePanelDismiss: EventEmitter<void>;

  @Listen('sidePanelDismiss')
  sidepaneldismissHandler(): void {
    this.open = false;
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.open = false;
        return;
    }
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async showModal(): Promise<void> {
    this.open = true;
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async close(): Promise<void> {
    this.open = false;
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.size });
  }

  componentDidLoad(): void {
    if (this.open) {
      this.dialogElement.showModal();
    }
  }

  render(): JSX.Element {
    const titleID: string = randomHTMLId();
    return (
      <dialog
        ref={el => (this.dialogElement = el as HTMLDialogElement)}
        aria-labelledby={titleID}
        class={{ 'gux-open': this.open }}
      >
        <gux-side-panel-beta size={this.size}>
          <div slot="header" id={titleID}>
            <slot name="header" />
          </div>
          <div slot="content">
            <slot name="content" />
          </div>
          <div slot="footer">
            <slot name="footer" />
          </div>
        </gux-side-panel-beta>
      </dialog>
    ) as JSX.Element;
  }
}
