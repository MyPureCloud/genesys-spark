import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

/**
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

  private renderExpandButton(): JSX.Element {
    return (
      <gux-button accent="ghost">
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
  }

  render(): JSX.Element {
    return (
      <div class="gux-side-panel-header-mini">
        <div class="gux-side-panel-header-mini-title">
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
