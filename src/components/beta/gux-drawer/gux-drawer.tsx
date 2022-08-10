import { Component, JSX, h, Element, Prop, Method } from '@stencil/core';

@Component({
  styleUrl: 'gux-drawer.less',
  tag: 'gux-drawer-beta',
  shadow: true
})
export class GuxDrawer {
  @Element()
  root: HTMLElement;

  @Method()
  show(): void {
    const dialog = this.root.shadowRoot.querySelector('dialog');
    // dialog.showModal();
    dialog.setAttribute('open', '');
    dialog.setAttribute('testing', '');
  }

  render(): JSX.Element {
    return (
      <dialog class="gux-drawer">
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
    ) as JSX.Element;
  }
}
