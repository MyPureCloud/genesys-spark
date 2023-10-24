import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop
} from '@stencil/core';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';

import { GuxModalSize } from './gux-modal-legacy.types';

/**
 * @slot content - Required slot for the modal content
 * @slot left-align-buttons - Optional slot to set gux-buttons aligned to the left of the modal
 * @slot right-align-buttons - Optional slot to set gux-buttons aligned to the left of the modal
 * @slot title - Optional slot to set the modal title
 */
@Component({
  styleUrl: 'gux-modal-legacy.scss',
  tag: 'gux-modal-legacy',
  shadow: true
})
export class GuxModalLegacy {
  private dismissButton: HTMLGuxDismissButtonElement;
  private triggerElement: HTMLElement;

  @Element()
  private root: HTMLElement;

  /**
   * Indicates the size of the modal (small, medium or large)
   */
  @Prop()
  size: GuxModalSize = 'dynamic';

  @Prop()
  trapFocus: boolean = true;

  /**
   * Query selector for the element to initially focus when the modal opens
   * Defaults to the first tabbable element
   */
  @Prop()
  initialFocus?: string | undefined;

  /**
   * Fired when a user dismisses the modal (The default behaviour is to remove the component from the DOM)
   */
  @Event()
  guxdismiss: EventEmitter<void>;

  @Listen('keydown')
  protected handleKeyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onDismissHandler(event);
    }
  }

  connectedCallback(): void {
    this.triggerElement = document.activeElement as HTMLElement;
  }

  componentWillLoad(): void {
    const trapFocusVariant = this.trapFocus ? 'trapfocuson' : 'trapfocusoff';
    const componentVariant = `${this.size}-${trapFocusVariant}`;
    trackComponent(this.root, { variant: componentVariant });
  }

  componentDidLoad(): void {
    const initialFocusElement = this.getInitialFocusElement();
    if (initialFocusElement) {
      // using .focus?.() instead of .focus() as a workaround for a Stencil bug in unit tests
      // https://github.com/ionic-team/stencil/issues/1964
      initialFocusElement.focus?.();
    } else if (this.dismissButton) {
      this.dismissButton.focus?.();
    }
  }

  render(): JSX.Element {
    const hasModalTitleSlot = this.hasModalTitleSlot();
    const hasFooterButtons = this.hasFooterButtons();
    const titleID: string = randomHTMLId();

    return (
      <div
        class="gux-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasModalTitleSlot ? titleID : null}
      >
        <div class={`gux-modal-container gux-${this.size}`}>
          {this.renderModalTrapFocusEl()}

          {hasModalTitleSlot && (
            <h1 class="gux-modal-header" id={titleID}>
              <slot name="title" />
            </h1>
          )}
          <gux-dismiss-button
            onClick={this.onDismissHandler.bind(this)}
            ref={el => (this.dismissButton = el)}
          ></gux-dismiss-button>
          <div
            class={{
              'gux-modal-content': true,
              'gux-no-buttons': !hasFooterButtons
            }}
          >
            <p>
              <slot name="content" />
            </p>
          </div>

          {hasFooterButtons && (
            <div class="gux-button-footer">
              <div class="gux-left-align-buttons">
                <slot name="left-align-buttons" />
              </div>

              <div class="gux-right-align-buttons">
                <slot name="right-align-buttons" />
              </div>
            </div>
          )}
          {this.renderModalTrapFocusEl()}
        </div>
      </div>
    ) as JSX.Element;
  }

  // When trap-focus is enabled, focusing this element
  // will immediately redirect focus back to the dismiss button at the top of the modal.
  private renderModalTrapFocusEl(): JSX.Element {
    if (this.trapFocus) {
      return (
        <span onFocus={() => this.dismissButton.focus()} tabindex="0"></span>
      ) as JSX.Element;
    }
  }

  private getInitialFocusElement(): HTMLElement | SVGElement | undefined {
    return this.initialFocus
      ? this.root.querySelector<HTMLElement | SVGElement>(this.initialFocus)
      : undefined;
  }

  private hasModalTitleSlot(): boolean {
    return Boolean(this.root.querySelector('[slot="title"]'));
  }

  private hasFooterButtons(): boolean {
    return (
      Boolean(this.root.querySelector('[slot="left-align-buttons"]')) ||
      Boolean(this.root.querySelector('[slot="right-align-buttons"]'))
    );
  }

  private onDismissHandler(event: Event): void {
    event.stopPropagation();

    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.remove();
      this.triggerElement?.focus();
    }
  }
}
