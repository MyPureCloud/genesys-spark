import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  Method,
  Watch,
  Listen
} from '@stencil/core';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';
import { hasSlot } from '@utils/dom/has-slot';

import { GuxModalSize } from './gux-modal.types';

@Component({
  styleUrl: 'gux-modal.scss',
  tag: 'gux-modal',
  shadow: { delegatesFocus: true }
})
export class GuxModal {
  private dismissButton: HTMLGuxDismissButtonElement;
  private dialogElement: HTMLDialogElement;

  @Element()
  private root: HTMLElement;

  /**
   * Indicates the size of the modal (small, medium or large)
   */
  @Prop()
  size: GuxModalSize = 'dynamic';

  /**
   * Indicates/sets whether or not the modal is open. On a native dialog, you should not toggle the
   * open attribute, due to the unusual behaviors described [here](https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-dialog-open)
   * In this component, it is safe as this property acts as a proxy for calls to `showModal` and `close`.
   */
  @Prop({ mutable: true })
  open: boolean = false;

  /**
   * This property is for teams who have a UX issue becasue they are displaying a modal in their iframe.
   * This will "trap" tab stops in the modal ignoring all the parts of the app outside the clients iframe
   * that are not inert and should be accessible. This is obviously an accessibility violation and bad UX but
   * by adding this property that can be addresses seperatly to a move to v4.
   */
  @Prop()
  inaccessibleTabTrap: boolean = false;

  /**
   * Fired when a user dismisses the modal
   */
  @Event()
  guxdismiss: EventEmitter<void>;

  /**
   * "Renders" the open state of the modal
   */
  @Watch('open')
  private syncOpenState() {
    if (this.open) {
      this.dialogElement.showModal();
    } else {
      this.dialogElement.close();
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

  /*
   * This serves as a workaround for a specific issue found in Safari and Firefox browsers.
   * In full-screen mode, pressing the "Escape" key would not only close the native HTML dialog but also minimize the browser window.
   * By preventing the default behavior of the "Escape" key event and explicitly closing the dialog, this workaround ensures
   * that the browser window remains unaffected when closing the dialog in full-screen mode.
   * More info can be found here: https://discussions.apple.com/thread/251785881?answerId=253426808022&sortBy=best#253426808022
   */

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.onDismissHandler();
        return;
    }
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: `${this.size}` });
  }

  componentDidLoad(): void {
    this.syncOpenState();
  }

  private hasModalTitleSlot(): boolean {
    return Boolean(this.root.querySelector('[slot="title"]'));
  }

  private hasFooterButtons(): boolean {
    const startAlignButtonsSlot = this.root.querySelector(
      '[slot="start-align-buttons"]'
    );
    const endAlignButtonsSlot = this.root.querySelector(
      '[slot="end-align-buttons"]'
    );

    return (
      Boolean(startAlignButtonsSlot?.textContent?.trim()) ||
      Boolean(endAlignButtonsSlot?.textContent?.trim())
    );
  }

  private renderFooter(): JSX.Element {
    if (hasSlot(this.root, 'footer')) {
      return (
        <footer>
          <slot name="footer" />
        </footer>
      ) as JSX.Element;
    } else {
      return this.renderButtonFooter();
    }
  }

  render(): JSX.Element {
    const hasModalTitleSlot = this.hasModalTitleSlot();
    const titleID: string = randomHTMLId();

    return (
      <dialog
        onClose={this.onCloseHandler.bind(this)}
        ref={el => (this.dialogElement = el)}
        aria-labelledby={hasModalTitleSlot ? titleID : null}
      >
        <div class={`gux-modal-container gux-${this.size}`}>
          {this.renderTabTrapEl(this.inaccessibleTabTrap, this.dismissButton)}
          <gux-dismiss-button
            onClick={this.onDismissHandler.bind(this)}
            ref={el => (this.dismissButton = el)}
          ></gux-dismiss-button>

          {hasModalTitleSlot && this.renderTitle(titleID)}

          <div class="gux-modal-content">
            <p>
              <slot name="content" />
            </p>
          </div>
          {this.renderFooter()}
          {this.renderTabTrapEl(this.inaccessibleTabTrap, this.dismissButton)}
        </div>
      </dialog>
    ) as JSX.Element;
  }

  private renderTitle(titleID: string): JSX.Element {
    return (
      <h1 class="gux-modal-header" id={titleID}>
        <slot name="title" />
      </h1>
    ) as JSX.Element;
  }

  private renderButtonFooter(): JSX.Element {
    const hasFooterButtons = this.hasFooterButtons();
    return (
      <div
        class={{
          'gux-button-footer': true,
          'gux-no-buttons': !hasFooterButtons
        }}
      >
        <div class="gux-start-align-buttons">
          <slot name="start-align-buttons" />
        </div>

        <div class="gux-end-align-buttons">
          <slot name="end-align-buttons" />
        </div>
      </div>
    ) as JSX.Element;
  }
  private onCloseHandler(): void {
    this.guxdismiss.emit();
  }

  private onDismissHandler(): void {
    this.open = false;
  }

  // When trap-focus is enabled, focusing this element
  // will immediately redirect focus back to the dismiss button at the top of the modal.
  private renderTabTrapEl(tabTrap: boolean, target: HTMLElement): JSX.Element {
    if (tabTrap) {
      return (
        <span onFocus={() => target.focus()} tabindex="0"></span>
      ) as JSX.Element;
    }
  }
}
