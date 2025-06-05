import {
  Component,
  Event,
  EventEmitter,
  h,
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

  private renderHeader(): JSX.Element {
    if (hasSlot(this.root, 'header')) {
      return <slot name="header" />;
    }

    return null;
  }

  private renderTabs(): JSX.Element {
    if (hasSlot(this.root, 'tabs')) {
      return (
        <div class="gux-side-panel-tabs">
          <slot name="tabs" />
        </div>
      );
    }

    return null;
  }

  private renderContent(): JSX.Element {
    if (hasSlot(this.root, 'content')) {
      return (
        <div class="gux-side-panel-content">
          <slot name="content" />
        </div>
      );
    }

    return null;
  }

  private renderFooter(): JSX.Element {
    if (hasSlot(this.root, 'footer')) {
      return <slot name="footer" />;
    }

    return null;
  }

  render(): JSX.Element {
    return (
      <section
        class={{
          'gux-side-panel': true,
          [`gux-side-panel-${this.size}`]: true
        }}
      >
        {this.renderHeader()}
        <gux-dismiss-button
          onClick={this.onDismissHandler.bind(this)}
        ></gux-dismiss-button>
        <div class="gux-side-panel-content-wrapper">
          {this.renderTabs()}
          {this.renderContent()}
        </div>
        {this.renderFooter()}
      </section>
    ) as JSX.Element;
  }
}
