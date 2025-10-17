import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * @slot icon - Icon component displayed on the left side of the header
 * @slot - Text content for the mini header
 */
@Component({
  tag: 'gux-side-panel-header-mini',
  styleUrl: 'gux-side-panel-header-mini.scss',
  shadow: true
})
export class GuxSidePanelHeaderMini {
  private internals: ElementInternals;

  @Element()
  private root: HTMLElement;

  @Prop()
  expand: boolean = false;

  @Event()
  sidePanelDismiss: EventEmitter<void>;

  private onDismissHandler(): void {
    this.sidePanelDismiss.emit();
  }

  @Event()
  sidePanelExpand: EventEmitter<void>;

  private onExpandHandler(): void {
    this.sidePanelExpand.emit();
  }

  private renderIcon(): JSX.Element | null {
    if (hasSlot(this.root, 'icon')) {
      return (
        <div class="gux-side-panel-header-mini-icon">
          <slot name="icon" />
        </div>
      );
    }
    return null;
  }

  private renderExpandButton(): JSX.Element {
    return (
      <gux-button accent="ghost" onClick={this.onExpandHandler.bind(this)}>
        <gux-icon decorative size="small" icon-name="expand"></gux-icon>
      </gux-button>
    );
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  connectedCallback() {
    this.internals = this.root.attachInternals();
    this.internals.role = 'banner';

    const sidePanel = this.root.parentElement as HTMLGuxSidePanelBetaElement;
    sidePanel.hideDismissButton();
  }

  render(): JSX.Element {
    return (
      <div class="gux-side-panel-header-mini">
        <div class="gux-side-panel-header-mini-title">
          {this.renderIcon()}
          <slot />
        </div>
        <div class="gux-side-panel-header-mini-actions">
          {this.renderExpandButton()}
          <gux-dismiss-button
            position="inherit"
            size="small"
            onClick={this.onDismissHandler.bind(this)}
          ></gux-dismiss-button>
        </div>
      </div>
    ) as JSX.Element;
  }
}
