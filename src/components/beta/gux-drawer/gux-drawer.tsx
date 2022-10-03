import { Component, JSX, h, Element, Method, Prop, Host } from '@stencil/core';

/**
 * @slot content - Required slot for the modal content
 * @slot title - Optional slot to set the modal title
 */
@Component({
  styleUrl: 'gux-drawer.less',
  tag: 'gux-drawer-beta',
  shadow: true
})
export class GuxDrawer {
  private modal: HTMLElement;

  @Element()
  root: HTMLElement;

  @Prop()
  open?: boolean = false;

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async showModal(): Promise<void> {
    this.open = true;
  }

  closeModal(): void {
    this.open = false;
  }

  render(): JSX.Element {
    return (
      <div class="gux-drawer">
        <dialog open={this.open} ref={el => (this.modal = el)}>
          <gux-dismiss-button
            onClick={() => this.closeModal()}
          ></gux-dismiss-button>
          <header>
            <slot name="header" />
          </header>
          <slot name="content" />
          <footer>
            <slot name="footer" />
          </footer>
        </dialog>
        <div class="backdrop" hidden={!this.open}></div>
      </div>
    ) as JSX.Element;
  }
}
