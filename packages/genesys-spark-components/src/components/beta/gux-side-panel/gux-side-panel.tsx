import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Element,
  Prop
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxSidePanelSize } from './gux-side-panel.types';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * @slot heading - Required slot for the heading
 * @slot description - Optional slot for the description
 * @slot content - Required slot for the content
 * @slot footer - Optional slot for the footer
 */

@Component({
  tag: 'gux-side-panel-beta',
  styleUrl: 'gux-side-panel.scss',
  shadow: true
})
export class GuxSidePanel {
  @Element()
  private root: HTMLElement;

  @Prop()
  size: GuxSidePanelSize = 'small';

  @Event()
  sidePanelDismiss: EventEmitter<void>;

  private onDismissHandler(): void {
    this.sidePanelDismiss.emit();
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.size });
  }

  private renderDescription(): JSX.Element {
    if (hasSlot(this.root, 'description')) {
      return (
        <div class="gux-side-panel-description">
          <slot name="description" />
        </div>
      );
    }

    return null;
  }

  render(): JSX.Element {
    return (
      <Host role="complementary">
        <div
          class={{
            'gux-side-panel': true,
            [`gux-side-panel-${this.size}`]: true
          }}
        >
          <header>
            <gux-dismiss-button
              position="inherit"
              onClick={this.onDismissHandler.bind(this)}
            />
            <slot name="heading" />
          </header>
          {this.renderDescription()}
          <div class="gux-side-panel-content">
            <slot name="content" />
          </div>
          <footer>
            <slot name="footer" />
          </footer>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
