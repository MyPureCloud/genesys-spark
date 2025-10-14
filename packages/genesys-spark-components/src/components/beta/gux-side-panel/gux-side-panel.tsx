import { Component, h, Element, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxSidePanelSize } from './gux-side-panel.types';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * @slot header - Required slot for the header
 * @slot content - Required slot for the content
 * @slot tabs - Optional slot for the tabs
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

  @Prop({ reflect: true })
  size: GuxSidePanelSize = 'small';

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.size });
  }

  componentDidRender(): void {
    this.validateDescriptionSlotUsage();
  }

  //Remove this check for V5
  private validateDescriptionSlotUsage(): void {
    const descriptionSlots = this.root.querySelectorAll('[slot="description"]');
    const hasDirectDescriptionSlot = Array.from(descriptionSlots).some(
      slot => slot.parentElement === this.root
    );

    if (hasDirectDescriptionSlot) {
      console.warn(
        'gux-side-panel-beta: The description slot has been moved to gux-side-panel-header component. ' +
          'Please move your description content inside the header slot like this: ' +
          '<gux-side-panel-header slot="header"><div slot="description">Your description</div></gux-side-panel-header>'
      );
    }
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
        <div class="gux-side-panel-content-wrapper">
          {this.renderTabs()}
          {this.renderContent()}
        </div>
        {this.renderFooter()}
      </section>
    ) as JSX.Element;
  }
}
